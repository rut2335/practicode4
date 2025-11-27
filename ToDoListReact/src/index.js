import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// route שמחזיר את כל ה-Services של החשבון
app.get("/services", async (req, res) => {
  try {
    const response = await fetch("https://api.render.com/v1/services", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.RENDER_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Render API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching services" });
  }
});

app.get("/", (req, res) => {
  res.json({ 
    message: "Render API is running!",
    endpoints: {
      services: "/services"
    }
  });
});

app.listen(port, () => {
  console.log(`Node API running on port ${port}`);
});