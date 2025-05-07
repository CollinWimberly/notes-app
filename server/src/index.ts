import Fastify from "fastify";
import cors from "@fastify/cors";
import { notesRoutes } from "./routes/notes";

const server = Fastify();

server.register(cors, {
  origin: "*", // dev only — allows frontend to hit backend
});

server.register(notesRoutes); // Register our notes route

server.get("/", async () => {
  return { message: "Hello from Fastify!" };
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server is running at ${address}`);
});
