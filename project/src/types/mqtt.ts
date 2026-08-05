import mqtt from "mqtt";

const client = mqtt.connect(
  "wss://be759a0c02204588a1263c7186eab1f7.s1.eu.hivemq.cloud:8884/mqtt",
  {
    username: "technoviz",
    password: "Technoviz@12",
    protocol: "wss",
    clean: true,
    reconnectPeriod: 5000,
    connectTimeout: 10000,
    keepalive: 60,
  }
);

export default client;