import React, { useState } from "react";
import ProjectUpload from "../components/ProjectUpload";
import Results from "../components/Results";

export default function ClientPage(){
  const [results, setResults] = useState(null);
  return (
    <div>
      <ProjectUpload onResults={setResults} />
      <Results data={results} />
    </div>
  );
}
