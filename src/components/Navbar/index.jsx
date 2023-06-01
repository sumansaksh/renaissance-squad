import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            alt="Flowbite React Logo"
            className="mr-3 h-6 sm:h-9"
            src="/favicon.svg"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to="/">
            <Navbar.Link>
              <p>Home</p>
            </Navbar.Link>
          </Link>
          <Link to="/chatbot">
            <Navbar.Link>
              <p>Chatbot</p>
            </Navbar.Link>
          </Link>
          <Link to="/login">
            <Navbar.Link>
              <p>Login</p>
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;
