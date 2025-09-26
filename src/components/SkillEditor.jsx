import React from "react";

export default function SkillEditor({skills, onChange}){
  // skills: [{ skill, normalized, score, evidence }]
  function update(index, key, value){
    const copy = skills.map(s => ({...s}));
    copy[index][key] = value;
    onChange(copy);
  }
  function remove(index){
    const copy = skills.filter((_,i)=>i!==index);
    onChange(copy);
  }
  function addNew(){
    const copy = [...skills, { skill: "new-skill", normalized: "new-skill", score: 50, evidence: "" }];
    onChange(copy);
  }
  return (
    <div className="space-y-3">
      {skills.map((s, i) => (
        <div key={i} className="p-3 border rounded flex gap-3 items-start">
          <div className="flex-1">
            <input value={s.skill} onChange={e=>update(i,'skill',e.target.value)} className="w-full p-1 border rounded" />
            <input value={s.normalized} onChange={e=>update(i,'normalized',e.target.value)} className="w-full mt-1 p-1 text-sm border rounded" />
            <textarea value={s.evidence} onChange={e=>update(i,'evidence',e.target.value)} placeholder="Evidence snippet" className="w-full mt-1 p-1 text-sm border rounded"></textarea>
          </div>
          <div className="w-36 text-center">
            <label className="text-sm">Score</label>
            <input type="number" value={s.score} onChange={e=>update(i,'score',Number(e.target.value))} min={0} max={100} className="w-full p-1 border rounded mt-1" />
            <button onClick={()=>remove(i)} className="mt-2 text-sm text-red-600">Remove</button>
          </div>
        </div>
      ))}
      <button onClick={addNew} className="px-3 py-1 bg-slate-100 rounded text-sm">+ Add skill</button>
    </div>
  );
}