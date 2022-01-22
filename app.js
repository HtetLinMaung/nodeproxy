require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 7070;

const app = express();

app.use(
  "/startup",
  createProxyMiddleware({
    target: "http://startup:3000",
    changeOrigin: true,
  })
);
app.use(
  "/storage",
  createProxyMiddleware({
    target: "http://storage:80",
    changeOrigin: true,
  })
);
app.use(
  "/juice",
  createProxyMiddleware({
    target: "http://juice:80",
    changeOrigin: true,
  })
);
app.use(
  "/juiceweb",
  createProxyMiddleware({
    target: "http://juiceweb:3000",
    changeOrigin: true,
  })
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `<div style="height: 100vh; display: flex; justify-content: center; align-items: center;">
    <h1>Node Proxy Server Online</h1>
    </div>`
  );
});

app.listen(PORT, () => console.log(`Proxy Server listening on PORT ${PORT}`));
