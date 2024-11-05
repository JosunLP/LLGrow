
import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractTextFromUrl } from './textProcessor';
import { processImage } from './imageProcessor';
import { processAudio } from './audioProcessor';

export async function crawlAndExplore(startUrl: string): Promise<{ text: string[], images: string[], audio: string[] }> {
    const visited = new Set<string>();
    const texts: string[] = [];
    const images: string[] = [];
    const audio: string[] = [];

    async function explore(url: string, depth: number = 0): Promise<void> {
        if (visited.has(url) || depth > 2) return;
        visited.add(url);

        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // Text extraction
            texts.push(...extractTextFromUrl($));

            // Image extraction
            $('img').each((_, elem) => {
                const imgSrc = $(elem).attr('src');
                if (imgSrc && !visited.has(imgSrc)) {
                    images.push(imgSrc);
                }
            });

            // Audio extraction
            $('audio, source').each((_, elem) => {
                const audioSrc = $(elem).attr('src');
                if (audioSrc && !visited.has(audioSrc)) {
                    audio.push(audioSrc);
                }
            });

            // Link extraction for crawling
            const links = $('a[href]')
                .map((_, link) => $(link).attr('href'))
                .get()
                .filter(href => href && !visited.has(href) && href.startsWith('http'));

            for (const link of links) {
                await explore(link, depth + 1);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error during crawling ${url}: ${error.message}`);
            } else {
                console.error(`Error during crawling ${url}: ${String(error)}`);
            }
        }
    }

    await explore(startUrl);
    return { text: texts, images, audio };
}
