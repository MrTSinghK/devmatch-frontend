// src/components/Results.jsx
import React from "react";
import MatchCard from "./MatchCard";

export default function Results({ results, onShowEvidence }) {
  if (!results) return null;
  return (
    <div className="mt-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Results</h3>
          <div className="text-sm text-gray-600">Found {results.matches?.length ?? 0} candidates</div>
        </div>
        <div className="mt-3 space-y-3">
          {results.matches && results.matches.length ? (
            results.matches.map((m) => <MatchCard key={m.dev_id || m.name} data={m} onShowEvidence={onShowEvidence} />)
          ) : (
            <div className="p-4 text-sm text-gray-600">No matches found</div>
          )}
        </div>
      </div>
    </div>
  );
}
