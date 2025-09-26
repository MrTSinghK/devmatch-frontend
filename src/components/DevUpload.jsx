import React, { useState } from "react";
import api from "../api";
import SkillEditor from "./SkillEditor";
import Loading from "./Loading";

export default function DevUpload(){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [file,setFile] = useState(null);
  const [parsedSkills,setParsedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedDev, setSavedDev] = useState(null);

  async function handleUpload(e){
    e.preventDefault();
    if(!file) return alert("Please choose a resume file");
    setLoading(true);
    try{
      const form = new FormData();
      form.append("file", file);
      form.append("name", name);
      form.append("email", email);

      const res = await api.post("/dev/upload", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setParsedSkills(res.data.parsed_skills || []);
      setSavedDev(null);
    }catch(err){
      console.error(err);
      alert("Upload failed — using mock data if backend is offline.");
      // optional: set mocked parsed skills for dev work
    }finally{ setLoading(false); }
  }

  async function saveDeveloper(){
    setLoading(true);
    try{
      const payload = { name, email, parsed_skills: parsedSkills };
      const res = await api.post("/dev/save", payload);
      setSavedDev(res.data);
      alert("Saved!");
    }catch(err){
      console.error(err);
      alert("Save failed — check backend.");
    }finally{ setLoading(false); }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Developer — Upload Resume</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="flex gap-4">
          <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="p-2 border rounded w-1/2"/>
          <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded w-1/2"/>
        </div>
        <input onChange={e=>setFile(e.target.files[0])} type="file" accept=".pdf,.docx,.doc" />
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Parse Resume</button>
        </div>
      </form>

      {loading && <Loading />}

      {parsedSkills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Parsed skills</h3>
          <p className="text-sm text-slate-600 mb-2">Edit scores and add/remove skills before saving.</p>
          <SkillEditor skills={parsedSkills} onChange={setParsedSkills} />
          <div className="mt-4">
            <button onClick={saveDeveloper} className="px-4 py-2 bg-green-600 text-white rounded">Save Developer</button>
          </div>
        </div>
      )}

      {savedDev && <pre className="mt-4 bg-slate-50 p-3 rounded text-sm">{JSON.stringify(savedDev, null, 2)}</pre>}
    </div>
  );
}
