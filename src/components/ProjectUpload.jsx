// src/components/ProjectUpload.jsx
import React from "react";

export default function ProjectUpload({ text, setText, file, setFile, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste project description" rows={5} className="w-full p-3 border rounded-md" />
      <div>
        <input type="file" accept=".txt,.pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Find Developers</button>
        <button type="button" onClick={() => { setText(""); setFile(null); }} className="px-4 py-2 border rounded">Reset</button>
      </div>
    </form>
  );
}
