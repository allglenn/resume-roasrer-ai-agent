import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>React + FastAPI Full Stack App</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default App;
