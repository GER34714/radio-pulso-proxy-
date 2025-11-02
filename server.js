import express from "express";
import request from "request";
import cors from "cors";

const app = express();
app.use(cors());

// 🔊 URL original de tu radio
const RADIO_URL = "http://uk15freenew.listen2myradio.com:7546/;stream.mp3";

// Endpoint principal para retransmitir audio
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "audio/mpeg");
  console.log("🎧 Nueva conexión al stream de Pulso Digital Urbano™");
  request(RADIO_URL)
    .on("error", (err) => {
      console.error("❌ Error en el stream:", err.message);
      res.status(500).send("Error en el stream de audio.");
    })
    .pipe(res);
});

// Página base
app.get("/", (req, res) => {
  res.send("🚀 Proxy activo: Radio Pulso Digital Urbano™");
});

// Puerto de Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor proxy online en puerto ${PORT}`));
