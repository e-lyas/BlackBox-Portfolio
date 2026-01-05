import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>John Doe | Full Stack Developer & Designer</title>
        <meta
          name="description"
          content="Full Stack Developer & Designer crafting digital experiences with clean code and thoughtful design. View my portfolio and get in touch."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://johndoe.dev" />
      </Helmet>

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
