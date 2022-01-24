require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 7070;

const app = express();

const createProxyOptions = (target) => ({
  target,
  changeOrigin: true,
  proxyTimeout: 1864 * 100000,
});

app.use(
  "/startup",
  createProxyMiddleware(createProxyOptions("http://startup:3000"))
);
app.use(
  "/storage",
  createProxyMiddleware(createProxyOptions("http://storage"))
);
app.use("/juice", createProxyMiddleware(createProxyOptions("http://juice")));
app.use(
  "/juiceweb",
  createProxyMiddleware(createProxyOptions("http://juiceweb:3000"))
);
app.use(
  "/pyopenai",
  createProxyMiddleware(createProxyOptions("http://pyopenai"))
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
