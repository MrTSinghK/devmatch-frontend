// src/api/index.js
const API_BASE = import.meta.env.VITE_API_URL || "";

const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const MOCK = !API_BASE;

// MOCK implementations
async function mockParseResume({ name, email, file }) {
  await wait(550);
  return {
    dev_id: `mock_dev_${Math.floor(Math.random() * 10000)}`,
    name: name || "Alex Johnson",
    email: email || "alex@example.com",
    parsed_skills: [
      { skill: "Python", normalized: "python", score: 92, evidence: "Built microservices using Python and FastAPI" },
      { skill: "FastAPI", normalized: "fastapi", score: 80, evidence: "Used FastAPI for REST APIs" },
      { skill: "Docker", normalized: "docker", score: 72, evidence: "Containerized services using Docker" },
    ],
  };
}

async function mockProjectMatch({ text, file }) {
  await wait(600);
  return {
    project_id: `mock_proj_${Math.floor(Math.random() * 10000)}`,
    required_skills: ["python", "fastapi", "docker"],
    matches: [
      {
        dev_id: "mock_dev_1",
        name: "Alex Johnson",
        overall_score: 87.2,
        matched_skills: [
          { skill: "python", score: 92, evidence: "Experience: Built microservices using Python and FastAPI." },
          { skill: "fastapi", score: 80, evidence: "Built REST APIs with FastAPI and Pydantic." },
        ],
        years_experience: 3,
        location: "Mumbai",
      },
      {
        dev_id: "mock_dev_2",
        name: "Priya Singh",
        overall_score: 76.4,
        matched_skills: [
          { skill: "python", score: 74, evidence: "Used Python for ETL pipelines." },
          { skill: "docker", score: 78, evidence: "Dockerized data services." },
        ],
        years_experience: 2,
        location: "Pune",
      },
    ],
  };
}

// Public API functions
export async function parseResume({ name, email, file }) {
  if (MOCK) return mockParseResume({ name, email, file });
  const fd = new FormData();
  if (file) fd.append("file", file);
  fd.append("name", name || "");
  fd.append("email", email || "");
  const res = await fetch(`${API_BASE}/dev/upload`, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Resume upload failed");
  return res.json();
}

export async function saveDeveloper(payload) {
  if (MOCK) {
    await wait(300);
    return { saved: true, id: `mock_saved_${Math.floor(Math.random() * 10000)}` };
  }
  const res = await fetch(`${API_BASE}/dev/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Save developer failed");
  return res.json();
}

export async function matchProject({ text, file }) {
  if (MOCK) return mockProjectMatch({ text, file });
  const fd = new FormData();
  if (text) fd.append("text", text);
  if (file) fd.append("file", file);
  const res = await fetch(`${API_BASE}/project/upload`, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Project upload failed");
  return res.json();
}
