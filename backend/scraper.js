const mongoose = require('mongoose');
const Knowledge = require('../models/Knowledge');
const { searchWeb, scrapeContent } = require('./controllers/aiController');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

async function updateKnowledge() {
  try {
    // List of common queries or random topics to learn
    const queries = ['latest news', 'technology trends', 'science discoveries', 'free software downloads', 'legal free resources'];

    for (const query of queries) {
      const searchResults = await searchWeb(query);
      let data = 'Based on web search:\n';

      for (const result of searchResults) {
        const content = await scrapeContent(result.url);
        data += `${result.title}: ${content}\n\n`;
      }

      await Knowledge.findOneAndUpdate(
        { query },
        { data, lastUpdated: new Date() },
        { upsert: true }
      );
    }

    console.log('Knowledge updated');
  } catch (error) {
    console.error('Error updating knowledge:', error);
  }
}

// Run every hour
setInterval(updateKnowledge, 60 * 60 * 1000);
updateKnowledge().catch(err => console.error('Initial knowledge update failed:', err));