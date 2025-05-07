import Fastify from "fastify";
import cors from "@fastify/cors";

const server = Fastify();

server.register(cors, {
  origin: "*",
});

server.get("/", async () => {
  return { message: "Hello from Fastify 👋" };
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server listening at ${address}`);
});
