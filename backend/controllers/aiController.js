const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Log = require('../models/Log');
const Knowledge = require('../models/Knowledge');

// Function to search the web using DuckDuckGo
async function searchWeb(query) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });

    const results = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('.result__a').forEach(el => {
        links.push({
          title: el.textContent,
          url: el.href
        });
      });
      return links.slice(0, 5); // Top 5 results
    });

    await browser.close();
    return results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

// Function to scrape content from a URL
async function scrapeContent(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 1000); // First 1000 chars
    return text;
  } catch (error) {
    return 'Unable to fetch content.';
  }
}

exports.chat = async (req, res) => {
  // Placeholder for text to voice
  res.json({ audioUrl: 'Generated audio using local TTS.' });
};

exports.generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    // Placeholder for AI image generation - in real implementation, use a local Stable Diffusion model
    // For now, search for images
    const searchResults = await searchWeb(`AI generated image of ${prompt}`);
    const imageUrls = searchResults.map(r => r.url).filter(u => u.includes('jpg') || u.includes('png'));

    res.json({ images: imageUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.voiceToText = async (req, res) => {
  // Placeholder for voice to text - in real implementation, use a local model
  res.json({ text: 'Voice transcribed using local model.' });
};

exports.textToVoice = async (req, res) => {
  // Placeholder for text to voice
  res.json({ audioUrl: 'Generated audio using local TTS.' });
};