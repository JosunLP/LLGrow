
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as winston from 'winston';

// Logger Konfiguration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'log/combined.log' })
    ]
});

async function extractTextFromUrl(url: string): Promise<string[]> {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const texts: string[] = [];
        $('body').find('*').each((i, elem) => {
            if ($(elem).text().trim() !== '') {
                texts.push($(elem).text().trim());
            }
        });
        return texts;
    } catch (error) {
        logger.error(`Error during extracting text from ${url}: ${(error as Error).message}`);
        throw error;
    }
}

export async function crawlAndExplore(startUrl: string): Promise<string[]> {
    const visited = new Set<string>();
    const texts: string[] = [];

    async function explore(url: string, depth: number = 0): Promise<void> {
        if (visited.has(url) || depth > 2) return; // Limit depth to prevent deep recursion
        visited.add(url);

        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            texts.push(...await extractTextFromUrl(url));

            const links = $('a[href]')
                .map((i, link) => $(link).attr('href'))
                .get()
                .filter(href => href && !visited.has(href) && href.startsWith('http'));

            for (const link of links) {
                await explore(link, depth + 1);
            }
        } catch (error) {
            console.error(`Error during crawling ${url}: ${(error as Error).message}`);
        }
    }

    await explore(startUrl);
    return texts;
}
