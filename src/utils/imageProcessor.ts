
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';

export async function downloadImage(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
}

export async function processImage(url: string): Promise<string> {
    console.log(`Processing image from ${url}`);
    
    // Download the image
    const imageBuffer = await downloadImage(url);
    
    // Create an HTML Image element and load the image data
    const img = new Image();
    const blob = new Blob([imageBuffer]);
    const imageUrl = URL.createObjectURL(blob);
    
    // Return a promise that resolves when the image loads
    await new Promise((resolve) => {
        img.onload = resolve;
        img.src = imageUrl;
    });
    
    // Convert image to tensor
    const imageTensor = tf.browser.fromPixels(img);
    
    // Perform some image processing (e.g., resize, normalize)
    const processedImage = tf.image.resizeBilinear(imageTensor, [224, 224]).div(tf.scalar(255));
    console.log(`Processed image shape: ${processedImage.shape}`);
    
    // Dispose tensors to free memory
    imageTensor.dispose();
    processedImage.dispose();
    
    return `Processed image data for ${url}`;
}