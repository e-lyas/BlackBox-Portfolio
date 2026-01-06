import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import AudioPlayer from "@/components/AudioPlayer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>E | Front-End Developer</title>
        <meta
          name="description"
          content="Front-End Developer crafting beautiful, responsive web experiences with modern technologies. View my portfolio and get in touch."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://e-portfolio.dev" />
      </Helmet>

      <CustomCursor />
      <AudioPlayer />

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
