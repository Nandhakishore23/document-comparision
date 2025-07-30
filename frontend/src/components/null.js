import React, { useState, useRef } from "react";
import axios from "axios";

// Dummy user database for example/demo purposes
const USERS = [
  { username: "admin", password: "frontend123" },
  { username: "recruiter", password: "welcome2024" }
];

const jobDescriptions = [
  {
    title: "Frontend Developer (React)",
    description:
      "Develop and maintain scalable React applications, optimize UI performance, and ensure cross-browser compatibility. Collaborate with UX designers and backend engineers to deliver high-quality user experiences.",
    webhook: "http://localhost:5678/webhook-test/6b46c100-477f-4136-b618-15f672392a23",
  },
  {
    title: "Frontend Developer (Vue.js)",
    description:
      "Design dynamic user interfaces using Vue.js, work closely with design teams to implement responsive layouts, and integrate RESTful APIs for data-driven features.",
    webhook: "http://localhost:5678/webhook/56a9b9c0-6fc0-41c4-b2c9-25d81dd995d7",
  },
  {
    title: "Frontend Engineer (Angular)",
    description:
      "Build large-scale Angular apps with a focus on modularity and maintainability. Implement state management and unit tests for robust feature development.",
    webhook: "http://localhost:5678/webhook/4e979c08-358a-439a-be5a-9b461d7e56a6",
  },
  {
    title: "UI/UX Frontend Specialist",
    description:
      "Focus on enhancing UI/UX, accessibility, and creating pixel-perfect designs using HTML, CSS (SCSS), and JavaScript. Work across product teams to drive design consistency.",
    webhook: "http://localhost:5678/webhook/dfd2e2f2-a604-4d50-8320-af0d44e3d4d8",
  },
  {
    title: "Junior Frontend Web Developer",
    description:
      "Assist in building responsive websites, maintaining CSS/JS codebases, and learning modern frontend frameworks while contributing to team goals.",
    webhook: "http://localhost:5678/webhook/305242c8-e074-4bd0-b6d1-e9024065d616",
  }
];

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setMsg("");
      onLogin(username);
    } else {
      setMsg("Invalid username or password.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #74ebd5 0%, #acb6e5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.2)",
        borderRadius: 16,
        padding: "2.5em 2em",
        width: 340,
        textAlign: "center"
      }}>
        <h2 style={{ color: "#333", marginBottom: 20, fontWeight: 700 }}>Recruitment Portal</h2>
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.8em",
              marginBottom: 10,
              border: "1px solid #cfd8dc",
              borderRadius: 5,
              fontSize: "1em"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.8em",
              border: "1px solid #cfd8dc",
              borderRadius: 5,
              fontSize: "1em"
            }}
          />
        </div>
        {msg && <div style={{ color: "red", marginBottom: 12 }}>{msg}</div>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75em",
            background: "linear-gradient(90deg, #43cea2, #185a9d)",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            fontWeight: 600,
            letterSpacing: 1,
            cursor: "pointer",
            fontSize: "1.1em"
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

function JobDescriptions({ user, onLogout }) {
  const [loading, setLoading] = useState({});
  const [aiResponse, setAiResponse] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const inputRefs = useRef({});

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setSelectedFiles(prev => ({
      ...prev,
      [key]: file,
    }));
  };

  const resetFileInput = key => {
    if (inputRefs.current[key]) {
      inputRefs.current[key].value = "";
    }
  };

  const handleSendToAI = async (job, key) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    setAiResponse(prev => ({ ...prev, [key]: "" }));

    const file = selectedFiles[key];
    if (!file || file.type !== "application/pdf") {
      setAiResponse(prev => ({
        ...prev,
        [key]: "Please upload a PDF resume before submitting.",
      }));
      setLoading(prev => ({ ...prev, [key]: false }));
      return;
    }

    const formData = new FormData();
    formData.append("jobTitle", job.title);
    formData.append("jobDescription", job.description);
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:5678/webhook/test", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAiResponse(prev => ({
        ...prev,
        [key]: response.data,
      }));
      setSelectedFiles(prev => ({
        ...prev,
        [key]: undefined,
      }));
      resetFileInput(key);
    } catch (error) {
      setAiResponse(prev => ({
        ...prev,
        [key]: "Error communicating with the AI agent.",
      }));
    }
    setLoading(prev => ({ ...prev, [key]: false }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        paddingTop: 0,
      }}
    >
      <header style={{
        padding: "1.5em 0 1em 0",
        background: "rgba(255,255,255,0.93)",
        boxShadow: "0 4px 20px 0 rgba(33,150,243,0.06)",
        textAlign: "center"
      }}>
        <h1 style={{
          fontWeight: 800,
          color: "#175780",
          letterSpacing: "1px",
          fontSize: "2.2em",
          margin: 0
        }}>
          Welcome, {user}!
        </h1>
        <button
          onClick={onLogout}
          style={{
            float: "right",
            marginRight: 40,
            marginTop: -40,
            background: "none",
            border: "none",
            color: "#185a9d",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            letterSpacing: 0.5
          }}
        >
          Log Out
        </button>
        <div style={{ clear: "both" }} />
      </header>
      <div
        style={{
          maxWidth: 850,
          margin: "2em auto",
          padding: "2em",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 32px 0 rgba(50,110,180,0.12)",
          fontFamily: "Segoe UI, Arial, sans-serif"
        }}
      >
        <h2 style={{ color: "#185a9d", fontWeight: 700, textAlign: "center" }}>
          Job Descriptions
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {jobDescriptions.map((job) => {
            const key = job.webhook;
            return (
              <li
                key={key}
                style={{
                  margin: "2em 0",
                  padding: "1.5em",
                  border: "1.8px solid #e0e6ed",
                  borderRadius: 14,
                  background:
                    "linear-gradient(120deg, #e9f2fb 0, #ffffff 80%)"
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "start",
                  gap: "2em"
                }}>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <strong style={{ color: "#17619a", fontSize: "1.15em" }}>{job.title}</strong>
                    <p style={{
                      color: "#37474f",
                      fontSize: "1em",
                      margin: "0.7em 0 0 0"
                    }}>
                      {job.description}
                    </p>
                  </div>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <label style={{ fontWeight: 700, color: "#156090" }}>
                      Upload Resume:{" "}
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={e => handleFileChange(e, key)}
                        ref={el => (inputRefs.current[key] = el)}
                        disabled={loading[key]}
                        style={{
                          background: "#fff",
                          outline: "none",
                          border: "1px solid #bcd4e6",
                          borderRadius: 4,
                          marginLeft: 6,
                          fontSize: "1em"
                        }}
                      />
                    </label>
                    <span style={{ marginLeft: "0.6em", color: "#607d8b", fontSize: "0.98em" }}>
                      {selectedFiles[key] ? selectedFiles[key].name : "No file selected"}
                    </span>
                    <br />
                    <button
                      onClick={() => handleSendToAI(job, key)}
                      disabled={loading[key]}
                      style={{
                        marginTop: 14,
                        padding: "0.6em 1.4em",
                        background: "linear-gradient(90deg, #43cea2, #185a9d)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        fontWeight: 600,
                        fontSize: "1.05em",
                        letterSpacing: 0.5,
                        boxShadow: "0 2px 7px 0 rgba(33,150,243,0.09)",
                        cursor: loading[key] ? "wait" : "pointer"
                      }}
                    >
                      {loading[key] ? "Uploading..." : "Send to AI Agent"}
                    </button>
                  </div>
                </div>
                {aiResponse[key] && (
                  <div style={{
                    marginTop: "1.5em",
                    background: "#f5faff",
                    padding: "1em",
                    borderRadius: 7,
                    border: "1px solid #b6d7f1",
                    fontFamily: "monospace",
                    color: "#004d63"
                  }}>
                    <h4 style={{
                      margin: "0 0 0.6em 0",
                      color: "#104a6b",
                      fontWeight: 700
                    }}>
                      AI Agent Response:
                    </h4>
                    <pre
                      style={{
                        background: "none",
                        padding: 0,
                        color: "#17425f",
                        fontSize: "1.06em",
                        lineHeight: "1.5",
                        whiteSpace: "pre-wrap"
                      }}
                    >
                      {aiResponse[key]}
                    </pre>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div style={{ textAlign: "center", color: "#79909c", marginTop: 40, fontSize: "0.96em" }}>
          &copy; {new Date().getFullYear()} Frontend Candidate Assessment Portal
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState("");

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }
  return <JobDescriptions user={user} onLogout={() => setUser("")} />;
}

/*
Instructions:
- Replace job webhook URLs with your actual endpoints.
- Install axios: npm install axios
- Designs use gradients, shadows, rounded corners, and responsive layout for a modern, professional look.
- Demo login credentials: admin / frontend123
- If integrating with a backend for auth, replace the USERS array and login handler appropriately.
*/