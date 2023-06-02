import "./App.css";
import NavigationBar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Speak from "./components/speak";

import Login from "./components/Login";
import { useEffect } from "react";
import LiStenAndRepetChat from "./components/ListenAndRepeate/index.jsx";
import Cookies from "js-cookie";

function App() {
  const userId = Cookies.get("auth_user_id");

  useEffect(() => {
    // Check if userData.id is not null
    if (userId !== null) {
      // Navigate back to the previous page
    }
  }, [userId]);

  if (!userId) {
    // If userData.id is null, render the Login component
    return <Login />;
  }

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Speak />} />
          <Route path="/login" element={<Login />} />
          <Route path="/repeat" element={<LiStenAndRepetChat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
