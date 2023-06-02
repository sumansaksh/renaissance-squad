import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <img
            alt="Flowbite React Logo"
            className="mr-3 h-6 sm:h-9"
            src="https://cdn.leonardo.ai/users/406779c0-9490-4fcd-9894-24392dcd5aa6/generations/bc9054a1-d1b0-4dab-819b-ecf62c542206/DreamShaper_v5_owl_with_a_spects_and_book_blue_theme_transpare_0.jpg"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            English Learning App
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to="/">
            <Navbar.Link>
              <p>Home</p>
            </Navbar.Link>
          </Link>

          <Link to="/login">
            <Navbar.Link>
              <p>Login</p>
            </Navbar.Link>
          </Link>
          <Link to="/repeat">
            <Navbar.Link>
              <p>Test</p>
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;
