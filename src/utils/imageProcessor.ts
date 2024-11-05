
import axios from 'axios';
import * as tf from '@tensorflow/tfjs-node';

export async function downloadImage(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
}

export async function processImage(url: string): Promise<string> {
    console.log(`Processing image from ${url}`);
    
    // Download the image
    const imageBuffer = await downloadImage(url);
    
    // Decode the image to a tensor
    const imageTensor = tf.node.decodeImage(imageBuffer);
    
    // Perform some image processing (e.g., resize, normalize)
    const processedImage = tf.image.resizeBilinear(imageTensor, [224, 224]).div(tf.scalar(255));
    
    // Dispose the original image tensor to free memory
    imageTensor.dispose();
    
    // Here you can add more TensorFlow operations to analyze the image
    // For example, you could load a pre-trained model and make predictions
    
    // Return some result based on the processed image
    return `Processed image data for ${url}`;
}