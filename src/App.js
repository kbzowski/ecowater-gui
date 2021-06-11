import './App.css';
import {useEffect, useState} from "react";
import {auth} from "./api";
import {config} from "./config"
import {StatsPanel} from "./Stats";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)

  useEffect(() => {
      const checkAuth = async () => {
          await auth(config.email, config.password)
          setAuthenticated(true);
      }
      checkAuth()
  })

  return (
    <div className="container mx-auto">
      <header>
          {isAuthenticated && <StatsPanel></StatsPanel>}
      </header>
    </div>
  );
}

export default App;
