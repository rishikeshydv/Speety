const { ExpressPeerServer } = require("peer");
const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const PORT = 9000;

// Middleware
app.use(cors());
app.use(express.static("public"));

const server = http.createServer(app)
const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
});

app.use("/myapp", peerServer);

server.listen(PORT, () => {
  console.log(`PeerJS server running on port ${PORT}`);
});