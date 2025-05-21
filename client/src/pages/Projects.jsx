import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const professionalProjects = [
  {
    title: "Portfolio Website",
    description:
      "A modern personal website built with React, Tailwind CSS, and Node.js.",
    link: "",
  },
  {
    title: "Data Dashboard",
    description:
      "Interactive data visualizations using D3.js and Express APIs.",
    link: "https://github.com/yourusername/data-dashboard",
  },
];

const academicProjects = [
  {
    title: "ML-Based Sentiment Analyzer",
    description:
      "Built a sentiment analysis model using Python and Scikit-learn for Twitter data.",
    link: "https://github.com/yourusername/sentiment-analyzer",
  },
  {
    title: "Compiler Design Project",
    description:
      "Developed a mini-compiler in C++ with lexical and syntax analysis.",
    link: "https://github.com/yourusername/compiler-project",
  },
];

export default function Projects() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState([]);
  const [showMobileButton, setShowMobileButton] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((ref, i) => {
        if (ref && !visible[i]) {
          const top = ref.getBoundingClientRect().top;
          if (top < window.innerHeight - 100) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
          }
        }
      });

      const isMobile = window.innerWidth < 768;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setShowMobileButton(isMobile && scrolledToBottom);
    };

    const handleResize = () => {
      const nowDesktop = window.innerWidth >= 768;
      setIsDesktop(nowDesktop);
      if (nowDesktop) {
        setShowMobileButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [visible]);

  const renderCards = (projects, startIndex) =>
    projects.map((project, i) => {
      const index = startIndex + i;
      return (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          className={`transition-all transform duration-700 ${
            visible[index]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } delay-[${
            (i + 1) * 400
          }ms] bg-white/10 dark:bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 dark:border-white/10 hover:shadow-xl`}
        >
          <h3 className="text-2xl font-semibold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-softGray dark:text-gray-300 mb-4">
            {project.description}
          </p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              View Project →
            </a>
          )}
        </div>
      );
    });

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-cover bg-center text-white dark:text-white px-6 pt-20 pb-40"
      style={{ backgroundImage: `url('/Home.jpeg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-darkOverlay/90 via-darkOverlay/60 to-transparent dark:from-black/90 dark:via-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Professional Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {renderCards(professionalProjects, 0)}
        </div>

        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Academic Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {renderCards(academicProjects, professionalProjects.length)}
        </div>
      </div>

      {/* Next Button */}
      <div
        className={`z-10 flex space-x-6 items-center fixed bottom-4 right-1/2 translate-x-1/2 md:right-16 md:translate-x-0 md:absolute md:bottom-14 transition-opacity duration-500 ${
          isDesktop || showMobileButton
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => navigate("/")}
          className="group flex flex-col items-center px-4 py-3 text-sm uppercase font-semibold text-white bg-transparent hover:bg-accent hover:text-white transition rounded-full"
        >
          <span>Back</span>
          <span className="mt-1 rotate-180">→</span>
        </button>

        <button
          onClick={() => navigate("/about")}
          className="group flex flex-col items-center px-4 py-3 text-sm uppercase font-semibold text-white bg-transparent hover:bg-accent hover:text-white transition rounded-full"
        >
          <span>Next</span>
          <span className="mt-1 animate-bounce">→</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-12 text-center text-sm text-softGray dark:text-gray-400 relative z-10">
        Developed by Prathik using React.js, Tailwind CSS, Node.js
      </footer>
    </section>
  );
}
