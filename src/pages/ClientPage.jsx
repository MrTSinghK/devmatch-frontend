// src/pages/ClientPage.jsx
import React, { useState } from "react";
import ProjectUpload from "../components/ProjectUpload";
import { matchProject } from "../api";
import Results from "../components/Results";
import Loading from "../components/Loading";

export default function ClientPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alpha, setAlpha] = useState(0.7);
  const [beta, setBeta] = useState(0.25);
  const [gamma, setGamma] = useState(0.05);
  const [evidenceModal, setEvidenceModal] = useState(null);

  async function handleFind(e) {
    e?.preventDefault();
    if (!text && !file) return alert("Paste text or upload file");
    setLoading(true);
    try {
      const data = await matchProject({ text, file });
      // compute scores client-side using sliders
      const matches = (data.matches || []).map((m) => {
        const skillMatch = m.matched_skills && m.matched_skills.length ? m.matched_skills.reduce((a, b) => a + b.score, 0) / m.matched_skills.length : 0;
        const embedSim = typeof m.embedding_sim !== "undefined" ? m.embedding_sim : 0.5;
        const expBonus = m.years_experience ? Math.min(1, m.years_experience / 10) * 100 : 0;
        const computed_score = alpha * skillMatch + beta * (embedSim * 100) + gamma * expBonus;
        return { ...m, computed_score };
      }).sort((a, b) => b.computed_score - a.computed_score);
      setResults({ ...data, matches });
    } catch (err) {
      console.error(err);
      alert("Match failed");
    } finally {
      setLoading(false);
    }
  }

  function exportCSV() {
    if (!results || !results.matches) return alert("No matches to export");
    const rows = results.matches.map((m) => ({ name: m.name, score: Math.round(m.computed_score), years: m.years_experience, location: m.location || "" }));
    const header = Object.keys(rows[0]).join(",") + "\n";
    const body = rows.map((r) => Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const csv = header + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "matches.csv"; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-semibold">Find Developers</h2>
            <p className="text-sm text-gray-600">Paste project details or upload a file. Tune weights to change result ranking.</p>

            <div className="mt-3">
              <ProjectUpload text={text} setText={setText} file={file} setFile={setFile} onSubmit={handleFind} />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="text-sm">Skill weight (α)</div>
                <div className="text-lg font-semibold">{Math.round(alpha * 100)}%</div>
                <input type="range" min={0} max={1} step={0.01} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} />
              </div>
              <div>
                <div className="text-sm">Semantic (β)</div>
                <div className="text-lg font-semibold">{Math.round(beta * 100)}%</div>
                <input type="range" min={0} max={1} step={0.01} value={beta} onChange={(e) => setBeta(Number(e.target.value))} />
              </div>
              <div>
                <div className="text-sm">Experience (γ)</div>
                <div className="text-lg font-semibold">{Math.round(gamma * 100)}%</div>
                <input type="range" min={0} max={1} step={0.01} value={gamma} onChange={(e) => setGamma(Number(e.target.value))} />
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={handleFind} className="px-4 py-2 bg-indigo-600 text-white rounded">Find</button>
              <button onClick={() => { setText(""); setFile(null); setResults(null); }} className="px-4 py-2 border rounded">Reset</button>
              <button onClick={exportCSV} className="ml-auto px-3 py-2 bg-green-600 text-white rounded">Export CSV</button>
            </div>
          </div>

          <div className="mt-4">{loading ? <div className="bg-white p-4 rounded shadow"><Loading text="Searching..." /></div> : <Results results={results} onShowEvidence={(s) => setEvidenceModal(s)} />}</div>
        </div>

        <div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h4 className="text-lg font-medium">Scoring</h4>
            <ol className="text-sm text-gray-600 mt-2 list-decimal list-inside space-y-1">
              <li>Skill match: per-required-skill score average</li>
              <li>Embedding sim: semantic similarity</li>
              <li>Experience: small boost</li>
            </ol>
            <div className="mt-3 text-sm text-gray-500">Use sliders to show judges tradeoffs live.</div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            <h4 className="text-sm font-semibold">Demo Scenarios</h4>
            <ul className="text-sm text-gray-600 mt-2 space-y-2">
              <li><strong>Exact match:</strong> "Build FastAPI microservice" → FastAPI experts top.</li>
              <li><strong>Semantic:</strong> "Backend service" with higher β surfaces similar candidates.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Evidence modal */}
      {evidenceModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Evidence for {evidenceModal.skill}</h3>
              <button onClick={() => setEvidenceModal(null)} className="text-sm text-gray-500">Close</button>
            </div>
            <pre className="mt-3 p-3 bg-gray-50 rounded text-sm overflow-auto">{evidenceModal.evidence}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
