import "./App.css";
import NavigationBar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Speak from "./components/speak";
import Chatbot from "./components/chatbot";
import Login from "./components/Login";
import { useUserData } from "./components/Login/Authentication.jsx";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "./components/Login/Cotext";

function App({ history }) {
  const userData = useUserData();
  console.log(userData, "userData");
  useEffect(() => {
    // Check if userData.id is not null
    if (userData.id !== null) {
      // Navigate back to the previous page
      history.goBack();
    }
  }, [userData.id, history]);

  if (userData.id === null) {
    // If userData.id is null, render the Login component
    return <Login />;
  }

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Speak />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
