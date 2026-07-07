// Read Lab — minimal web server for Render
// Serves the static site in /public and exposes a health check for the keep-alive monitor.

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check — this is the endpoint UptimeRobot pings every 5 minutes
// to stop Render's free tier from spinning the service down.
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'read-lab', time: new Date().toISOString() });
});

// Serve the website
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// Anything else falls back to the homepage (single-page site)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Read Lab is live on port ${PORT}`);
});
