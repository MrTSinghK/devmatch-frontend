import React from "react";
import { Link } from "react-router-dom";
export default function Home(){
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-3">DevMatch — Developer Matching Engine</h1>
      <p className="mb-6 text-slate-600">Quick demo: upload resumes and find the best developers for a project in seconds.</p>
      <div className="flex gap-4">
        <Link to="/developer" className="px-4 py-2 bg-slate-800 text-white rounded">Upload Resume</Link>
        <Link to="/client" className="px-4 py-2 bg-blue-600 text-white rounded">Find Developers</Link>
      </div>
    </div>
  );
}
