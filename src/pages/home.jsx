// src/pages/home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold">Find the right developer instantly</h1>
          <p className="text-gray-600 mt-4">Upload resumes; when projects arrive, match automatically using skill extraction + semantic search. Demo-ready UX.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/developer" className="px-4 py-3 bg-indigo-600 text-white rounded-md shadow">Upload Resume</Link>
            <Link to="/client" className="px-4 py-3 border rounded-md">Find Developers</Link>
          </div>
          <div className="mt-6 text-sm text-gray-500">Tip: use weight sliders on the Find Developers page to demonstrate trade-offs to judges.</div>
        </div>
        <div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h4 className="text-lg font-semibold">Why this works</h4>
            <ul className="mt-3 text-gray-600 text-sm space-y-2">
              <li>Precompute heavy ML tasks at ingestion for instant queries.</li>
              <li>Combine exact skill matching with semantic similarity for robust recall.</li>
              <li>Explainable per-skill evidence to increase recruiter trust.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
