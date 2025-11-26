import express from "express";
import RenderAPI from "render-api";

const app = express();
const port = process.env.PORT || 3000;

// ניצור Client של Render API
const client = new RenderAPI({
  apiKey: process.env.RENDER_API_KEY
});

// route שמחזיר את כל ה-Services של החשבון
app.get("/services", async (req, res) => {
  try {
    const services = await client.services.listServices();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching services");
  }
});

app.listen(port, () => {
  console.log(`Node API running on port ${port}`);
});
