import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to get list of services from Render
app.get('/services', async (req, res) => {
  try {
    const apiKey = process.env.RENDER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'RENDER_API_KEY is not configured' 
      });
    }

    const response = await fetch('https://api.render.com/v1/services', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Render API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the services list
    res.json({
      success: true,
      count: data.length,
      services: data
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Render Services API is running',
    endpoints: {
      services: '/services'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("API KEY:", process.env.RENDER_API_KEY);
