import * as cheerio from 'cheerio';

export function extractTextFromUrl($: cheerio.Root): string[] {
  const texts: string[] = [];
  $('body')
    .find('*')
    .each((_, elem) => {
      if ($(elem).text().trim() !== '') {
        texts.push($(elem).text().trim());
      }
    });
  return texts;
}
