// src/components/DevUpload.jsx
import React, { useState } from "react";
import { parseResume, saveDeveloper } from "../api";
import SkillEditor from "./SkillEditor";
import Loading from "./Loading";

export default function DevUpload() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [parsedSkills, setParsedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(null);

  async function handleParse(e) {
    e?.preventDefault();
    if (!file) return alert("Please choose a resume file");
    setLoading(true);
    try {
      const data = await parseResume({ name, email, file });
      setParsedSkills(data.parsed_skills || []);
      setSaved(null);
    } catch (err) {
      console.error(err);
      alert("Parse failed, using fallback (mock or re-try).");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      const res = await saveDeveloper({ name, email, parsed_skills: parsedSkills });
      setSaved(res);
      alert("Saved (mock or API)!");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold">Upload Resume</h2>
          <p className="text-sm text-gray-600">Upload a PDF/DOCX — we extract skills and suggest scores.</p>

          <form onSubmit={handleParse} className="mt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="p-3 border rounded-md w-full" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-3 border rounded-md w-full" />
            </div>

            <div>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow">Parse Resume</button>
              <button type="button" onClick={() => { setParsedSkills([]); setSaved(null); setFile(null); }} className="px-4 py-2 border rounded-md">Reset</button>
            </div>
          </form>

          {loading && <div className="mt-4"><Loading text="Working..." /></div>}

          {parsedSkills.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Parsed skills</h3>
                <div className="text-sm text-gray-500">Edit before saving</div>
              </div>
              <div className="mt-3 space-y-3">
                <SkillEditor skills={parsedSkills} onChange={setParsedSkills} />
              </div>
              <div className="mt-4 flex gap-3">
                <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md shadow">Save Developer</button>
                <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(parsedSkills, null, 2)); alert("Copied JSON"); }} className="px-3 py-2 border rounded">Copy JSON</button>
              </div>
            </div>
          )}

          {saved && <div className="mt-4 p-3 bg-green-50 border rounded text-sm">Saved: {JSON.stringify(saved)}</div>}
        </div>
      </div>

      <div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-lg font-medium">Quick Tips</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-2">
            <li>Use realistic resumes for better demos.</li>
            <li>Adjust per-skill scores to reflect seniority.</li>
            <li>Saved devs show up in Client matches.</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
          <h4 className="text-sm font-semibold">Demo Mode</h4>
          <div className="text-sm text-gray-600">Running in <strong>{!import.meta.env.VITE_API_URL ? "mock" : "api"}</strong> mode</div>
        </div>
      </div>
    </div>
  );
}
