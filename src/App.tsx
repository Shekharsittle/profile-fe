import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

type Theme = "dark" | "light";

// Matches --bg for each theme; drives the mobile browser chrome colour.
const THEME_COLOR: Record<Theme, string> = {
  dark: "#0b0c0d",
  light: "#f6f5f1",
};

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("sh_theme") as Theme) || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Without this the address bar / status bar keeps the initial colour and
    // clashes with the page after a theme switch.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLOR[theme]);
    try {
      localStorage.setItem("sh_theme", theme);
    } catch {
      // Private browsing can reject writes — the theme just won't persist.
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div className="app-root">
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <div className="shell">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
