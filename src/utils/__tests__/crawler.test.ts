
import { crawlAndExplore } from '../crawler';

jest.mock('axios');

describe('crawlAndExplore', () => {
  it('should return text, images, and audio URLs from the given page', async () => {
    // Mocking axios and page content
    const axios = require('axios');
    axios.get.mockResolvedValue({
      data: '<html><body><p>Test Content</p><img src="test.jpg"/><audio src="test.mp3"></audio></body></html>'
    });

    const result = await crawlAndExplore('https://example.com');

    expect(result.text).toContain('Test Content');
    expect(result.images).toContain('test.jpg');
    expect(result.audio).toContain('test.mp3');
  });
});
