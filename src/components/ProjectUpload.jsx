import React, { useState } from "react";
import api from "../api";
import Loading from "./Loading";

export default function ProjectUpload({onResults}){
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitProject(e){
    e?.preventDefault();
    setLoading(true);
    try{
      const form = new FormData();
      if(file) form.append("file", file);
      form.append("text", text);
      const res = await api.post("/project/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResults(res.data);
    }catch(err){
      console.error(err);
      alert("Project upload failed. Backend may be offline — use mock data.");
    }finally{ setLoading(false); }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Client — Upload Project Requirement</h2>
      <form onSubmit={submitProject} className="space-y-3">
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste project description here (e.g., Build microservice in Python using FastAPI + Docker)" rows={6} className="w-full p-3 border rounded"></textarea>
        <input type="file" accept=".txt,.md,.pdf,.docx" onChange={e=>setFile(e.target.files[0])} />
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Find Developers</button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
}
