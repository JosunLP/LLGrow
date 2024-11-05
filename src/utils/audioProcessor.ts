import * as ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
} else {
  throw new Error('ffmpegPath is null');
}

export async function processAudio(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    new ffmpeg.FfmpegCommand(url)
      .audioFilters('aformat=channel_layouts=mono')
      .on('end', () => {
        console.log('Audio processing finished');
        resolve(`Processed audio data for ${url}`);
      })
      .on('error', (err) => {
        console.error('Error processing audio:', err);
        reject(err);
      })
      .saveToFile('/path/to/output/file.wav');
  });
}
