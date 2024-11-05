import axios from 'axios';
import * as cheerio from 'cheerio';

interface CrawlResult {
  text: string[];
  images: string[];
  audio: string[];
}

interface LinkData {
  url: string;
  score: number;
}

export async function crawlAndExplore(startUrl: string): Promise<CrawlResult> {
  const visited = new Set<string>();
  let linkQueue: LinkData[] = [];
  const texts: string[] = [];
  const images: string[] = [];
  const audio: string[] = [];
  const MAX_QUERY = 100;
  const MAX_ITEMS = 100;

  // Initialize the queue with the start URL and score
  linkQueue.push({ url: startUrl, score: 0 });

  async function explore(): Promise<void> {
    while (linkQueue.length > 0) {
      // Sort the queue based on score (highest score first)
      linkQueue.sort((a, b) => b.score - a.score);
      const currentLinkData = linkQueue.shift();

      // Filter out already visited pages
      linkQueue = linkQueue.filter((linkData) => !visited.has(linkData.url));

      if (!currentLinkData || visited.has(currentLinkData.url)) {
        continue;
      }

      visited.add(currentLinkData.url);

      try {
        const response = await axios.get(currentLinkData.url);
        const $ = cheerio.load(response.data);

        // Text extraction
        $('body')
          .find('*')
          .each((_, elem) => {
            if ($(elem).text().trim() !== '') {
              if (texts.length >= MAX_ITEMS) {
                return;
              }
              texts.push($(elem).text().trim());
            }
          });

        // Image extraction
        $('img').each((_, elem) => {
          const imgSrc = $(elem).attr('src');
          if (imgSrc && !visited.has(imgSrc)) {
            if (images.length >= MAX_ITEMS) {
              return;
            }
            images.push(imgSrc);
          }
        });

        // Audio extraction
        $('audio, source').each((_, elem) => {
          const audioSrc = $(elem).attr('src');
          if (audioSrc && !visited.has(audioSrc)) {
            if (audio.length >= MAX_ITEMS) {
              return;
            }
            audio.push(audioSrc);
          }
        });

        // Link extraction for further crawling
        $('a[href]').each((_, link) => {
          const href = $(link).attr('href');
          if (href && !visited.has(href) && href.startsWith('http')) {
            // Evaluate the link and add it to the queue with a score
            const score = evaluateLink(href, $(link).text());
            if (linkQueue.length >= MAX_QUERY) {
              return;
            }
            linkQueue.push({ url: href, score });
          }
        });
        console.log(`Crawled ${currentLinkData.url}`);
      } catch (error: any) {
        console.error(
          `Error during crawling ${currentLinkData.url}: ${error.message}`,
        );
      }
      console.log(`Visited ${visited.size} links`);
      console.log(`Queue size: ${linkQueue.length}`);
      console.log('-----------------------------------');

      // Filter out already visited pages from the queue
    }
    console.log('Exploration completed');
  }

  // Link scoring function to prioritize links
  function evaluateLink(url: string, anchorText: string): number {
    let score = 0;

    // Example scoring criteria
    const importantKeywords = [
      'AI',
      'Machine Learning',
      'Neural Network',
      'Deep Learning',
    ];
    importantKeywords.forEach((keyword) => {
      if (anchorText.toLowerCase().includes(keyword.toLowerCase())) {
        score += 10; // Assign higher score if the anchor text matches important keywords
      }
    });

    // Additional scoring criteria based on URL pattern (e.g., blog, research)
    if (url.toLowerCase().includes('blog')) {
      score += 5;
    } else if (url.toLowerCase().includes('research')) {
      score += 8;
    }

    return score;
  }

  // Start the exploration
  await explore();
  return { text: texts, images: images, audio: audio };
}
