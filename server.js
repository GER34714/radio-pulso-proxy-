import express from "express";
import request from "request";
import cors from "cors";

const app = express();
app.use(cors());

// ✅ Stream real con el sufijo correcto
const RADIO_URL = "http://uk15freenew.listen2myradio.com:7546/;stream.mp3";

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "audio/mpeg");
  console.log("🎧 Nueva conexión al stream de Pulso Digital Urbano™");

  // 👉 Agregamos User-Agent para que el servidor acepte la conexión
  request({
    url: RADIO_URL,
    headers: {
      "User-Agent": "Winamp/5.6.2",
      "Icy-MetaData": "1"
    }
  })
    .on("error", (err) => {
      console.error("❌ Error en el stream:", err.message);
      res.status(500).send("Error en el stream de audio.");
    })
    .pipe(res);
});

app.get("/", (req, res) => {
  res.send("🚀 Proxy activo: Radio Pulso Digital Urbano™");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Proxy de Pulso Digital Urbano™ activo en puerto ${PORT}`)
);
