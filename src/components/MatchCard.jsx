// src/components/MatchCard.jsx
import React from "react";

export default function MatchCard({ data, onShowEvidence }) {
  const score = Math.round(data.computed_score ?? data.overall_score ?? 0);
  return (
    <div className="p-3 border rounded-md flex items-start gap-4 hover:shadow-sm transition bg-white">
      <div className="w-14 h-14 rounded-md bg-indigo-50 flex items-center justify-center font-semibold text-indigo-700">
        {data.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{data.name}</div>
            <div className="text-sm text-gray-500">{data.location || "—"} • {data.years_experience ?? "—"} yrs</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600">{score}</div>
            <div className="text-xs text-gray-500">match</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {(data.matched_skills || []).map((s, i) => (
            <div key={i} className="p-2 bg-gray-50 border rounded text-sm">
              <div className="font-medium">{s.skill}</div>
              <div className="text-xs text-gray-500">score: {s.score}</div>
              <button onClick={() => onShowEvidence(s)} className="text-xs text-indigo-600 mt-1">view evidence</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
