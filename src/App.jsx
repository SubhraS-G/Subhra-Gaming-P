import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Games from "./components/Games.jsx";
import Content from "./components/Content.jsx";
import Stats from "./components/Stats.jsx";
import Setup from "./components/Setup.jsx";
import Collaborate from "./components/Collaborate.jsx";
import MediaKit from "./components/MediaKit.jsx";
import Footer from "./components/Footer.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Games />
        <Content />
        <Stats />
        <Setup />
        <Collaborate />
        <MediaKit />
      </main>
      <Footer />
    </>
  );
}
