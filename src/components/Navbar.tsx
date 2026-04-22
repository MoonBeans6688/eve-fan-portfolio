import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "WORKS", path: "/" },
  { label: "PLAYGROUND", path: "/playground" },
  { label: "ABOUT", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();

  const isJarDark = location.pathname === "/work/the-jar";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-background/80 backdrop-blur-md ${isJarDark ? "the-jar-dark" : ""}`}>
      <Link
        to="/"
        className="font-mono text-sm font-medium tracking-wide text-foreground clickable hover:text-primary transition-colors duration-200"
      >
        EVE FAN
      </Link>
      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-mono text-xs tracking-widest clickable transition-colors duration-200 ${
              location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <a
          href="https://drive.google.com/file/d/1w6oww6QF6538PTvxRMee5T4YXAtOvx9h/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-widest clickable px-3 py-1.5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 rounded-full"
        >
          RESUME
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
