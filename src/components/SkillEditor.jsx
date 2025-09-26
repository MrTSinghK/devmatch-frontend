// src/components/SkillEditor.jsx
import React from "react";

export default function SkillEditor({ skills = [], onChange }) {
  function update(i, key, value) {
    const copy = skills.map((s) => ({ ...s }));
    copy[i][key] = value;
    onChange(copy);
  }
  function remove(i) {
    onChange(skills.filter((_, idx) => idx !== i));
  }
  function addNew() {
    onChange([...skills, { skill: "new-skill", normalized: "new-skill", score: 50, evidence: "" }]);
  }
  return (
    <div className="space-y-3">
      {skills.map((s, i) => (
        <div key={i} className="p-3 border rounded-md flex gap-3 items-start">
          <div className="flex-1">
            <input value={s.skill} onChange={(e) => update(i, "skill", e.target.value)} className="w-full font-semibold p-1" />
            <input value={s.normalized} onChange={(e) => update(i, "normalized", e.target.value)} className="w-full mt-1 p-1 text-sm border rounded" />
            <textarea value={s.evidence} onChange={(e) => update(i, "evidence", e.target.value)} className="w-full mt-2 p-2 border rounded text-sm" rows={2} />
          </div>
          <div className="w-28 text-center">
            <div className="text-xs text-gray-500">Score</div>
            <input type="number" min={0} max={100} value={s.score} onChange={(e) => update(i, "score", Number(e.target.value))} className="mt-1 p-2 w-full border rounded text-center" />
            <button onClick={() => remove(i)} className="mt-2 text-sm text-red-600">Remove</button>
          </div>
        </div>
      ))}
      <button onClick={addNew} className="px-3 py-1 bg-slate-100 rounded text-sm">+ Add skill</button>
    </div>
  );
}
