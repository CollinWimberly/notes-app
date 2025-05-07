import { useEffect, useState } from "react";
import api from "./services/api";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get("/notes").then((res) => setNotes(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await api.post("/notes", { title, content });
    setNotes((prev) => [...prev, res.data]);
    setTitle("");
    setContent("");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Note</button>
      </form>

      {notes.map((note) => (
        <div key={note.id} style={{ marginBottom: "1rem" }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>{new Date(note.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
