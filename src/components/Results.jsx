import React from "react";
import MatchCard from "./MatchCard";

export default function Results({data}){
  if(!data) return null;
  const matches = data.matches || [];
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Matching Results</h2>
      <div className="mb-4 text-sm text-slate-600">Required skills: {data.required_skills.join(", ")}</div>
      <div>
        {matches.length === 0 && <div className="p-4 bg-yellow-50 border rounded">No matches found.</div>}
        {matches.map(m => <MatchCard key={m.dev_id} item={m} />)}
      </div>
    </div>
  );
}
