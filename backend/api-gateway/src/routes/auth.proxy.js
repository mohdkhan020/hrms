

import { createProxyMiddleware } from "http-proxy-middleware";

const authProxy = createProxyMiddleware({
  target: "http://localhost:7000/auth",
  changeOrigin: true,
  logger: console,
});

export default authProxy;
