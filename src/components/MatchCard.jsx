import React from "react";

export default function MatchCard({item}){
  // item: {name, overall_score, matched_skills: [{skill,score,evidence}], years_experience}
  return (
    <div className="p-4 border rounded mb-3 flex justify-between items-start">
      <div>
        <div className="flex items-baseline gap-3">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span className="text-sm text-slate-500">({item.years_experience} yrs)</span>
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {item.matched_skills.map((s,i) => (
            <div key={i} className="bg-slate-100 p-2 rounded text-sm">
              <div className="font-medium">{s.skill}</div>
              <div className="text-xs text-slate-600">score: {s.score}</div>
              <div className="text-xs text-slate-500 mt-1">{s.evidence?.slice(0,80)}{s.evidence?.length>80?'...':''}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold">{Math.round(item.overall_score)}</div>
        <div className="text-sm text-slate-600">match score</div>
      </div>
    </div>
  );
}
