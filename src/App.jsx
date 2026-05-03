import { useEffect, useState } from "react";

function App() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/applications")
        .then(res => res.json())
        .then(data => setApplications(data))
        .catch(err => console.error(err));
  }, []);

  return (
      <div style={{ padding: "20px" }}>
        <h1>Applications</h1>

        {applications.map(app => (
            <div key={app.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
              <h3>{app.company}</h3>
              <p>{app.roleTitle}</p>
              <p>{app.location}</p>
              <p>{app.status}</p>
            </div>
        ))}
      </div>
  );
}

export default App;