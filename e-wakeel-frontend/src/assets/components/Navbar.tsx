import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../svgIcons/logo.svg";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setScrolled(window.scrollY >= window.innerHeight);
      } else {
        setScrolled(true);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const navLinks = [
    { path: "/legal-consultation", label: "Legal Consultation" },
    { path: "/court-alerts", label: "Court Alerts" },
    { path: "/document-management", label: "Document Management" },
    { path: "/advocate-services", label: "Advocate Services" },
    { path: "/faqs", label: "FAQs" },
  ];

  return (
    <>
      <nav
        className={`flex justify-between items-center px-4 h-16 font-semibold fixed top-0 left-0 w-full z-50 backdrop-blur ${
          scrolled ? "text-black" : "text-white"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="">
              <img
                src={logo}
                alt="Logo"
                className={`${scrolled && "filter invert"}`}
              />
            </Link>

            <div className="hidden lg:flex space-x-8 h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm relative group overflow-hidden flex justify-center items-center h-10"
                >
                  <span className="bg-[#3498DB] w-full h-1 absolute z-50 -bottom-0 transition ease-in duration-200 -translate-x-[110%] group-hover:translate-x-0 rounded"></span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {location.pathname === "/" ? (
          <div className="hidden lg:flex items-center space-x-4 text-sm">
            <Link to="/login" className="">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#3498DB] hover:bg-[#37a2e9] px-4 py-1 rounded-md"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center justify-center space-x-6 text-sm">
            <Link to="/dashboard" className="">
              Dashboard
            </Link>
            <FaBell className="cursor-pointer" size={20} />
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
              className="size-10 rounded-full cursor-pointer"
            />
          </div>
        )}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className={`w-6 h-6 ${scrolled ? "text-black" : "text-white"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div
          className={`fixed top-16 lg:hidden w-full ${
            scrolled ? "text-black" : "text-white"
          } py-4 z-50 backdrop-blur`}
        >
          <div className="flex flex-col space-y-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm"
                onClick={toggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            {location.pathname === "/" ? (
              <div className="flex justify-center items-center gap-4">
                {" "}
                <Link to="/login" onClick={toggleMobileMenu}>
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMobileMenu}
                  className="bg-[#3498DB] hover:bg-[#37a2e9] px-4 py-1 rounded-md"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 text-sm">
                <Link to="/dashboard">Dashboard</Link>
                <div className="flex justify-center items-center gap-4">
                  {" "}
                  <FaBell className="cursor-pointer" size={20} />
                  <p>Notifications</p>
                </div>
                <div className="flex justify-center items-center gap-4">
                  {" "}
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                    className="size-10 rounded-full cursor-pointer"
                  />{" "}
                  <p>Profile</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
