import OBSWebSocket from "obs-websocket-js";
const obs = new OBSWebSocket();
obs.connect("ws://127.0.0.1:4455");
