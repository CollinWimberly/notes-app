import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function notesRoutes(server: FastifyInstance) {
  // Get all notes
  server.get("/notes", async (request, reply) => {
    try {
      const notes = await prisma.note.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return notes;
    } catch (err) {
      reply.status(500).send({ error: "Failed to fetch notes" });
    }
  });

  // Create a new note
  server.post("/notes", async (request, reply) => {
    const { title, content } = request.body as {
      title: string;
      content: string;
    };

    if (!title || !content) {
      reply.code(400).send({ error: "Title and content are required." });
      return;
    }

    const newNote = await prisma.note.create({
      data: { title, content },
    });

    return newNote;
  });
}
