import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import observabilityImg from "../assets/data-observability-app.png";
import pipelinesImg from "../assets/cloud-data-pipelines.png";
import greenitImg from "../assets/greenit-powerbi-dashboard.png";

const professionalProjects = [
  {
    title: "Data Observability Application",
    description:
      "Co-lead and developed a full-stack web application for monitoring organizational data health using React.js, Python over Azure based Data platforms. Enabled analytics aligned with Gartner’s 5 observability pillars, improving data platform efficiency across 12 business units.",
    image: observabilityImg,
  },
  {
    title: "Cloud Data Engineering Pipelines",
    description:
      "Designed and developed 8+ Azure Data Factory pipelines for enterprise-scale data integration and analytics. Led the migration of over 160 legacy pipelines across EMEA and NAFTA, improving data flow efficiency and reliability as part of large-scale digital transformation.",
    image: pipelinesImg,
  },
  {
    title: "GreenIT Power BI Dashboard",
    description:
      "Spearheaded the development of a Power BI dashboard for organizational sustainability efforts. Profiled over 10TB of file usage data to identify and offload cold storage, supporting GreenIT carbon footprint reduction.",
    image: greenitImg,
  },
];

const academicProjects = [
  {
    title: "Federated Continual Learning Research",
    description:
      "Engaged in an ongoing research in federated learning across edge devices with a focus on continual task adaptation, catastrophic forgetting, and privacy-preserving training.",
  },
  {
    title: "Air Quality & Carbon Emission Forecasting",
    description:
      "Built a web-based forecasting tool using clustering and ARIMA to predict air quality from global datasets, with EM used for missing value handling and interactive visualizations.",
  },
  {
    title: "Netflix clone",
    description:
      "Developed a Netflix clone using React.js, Docker, and PostgreSQL, featuring user authentication and video browsing. Emulated core streaming platform UI to demonstrate full-stack development and containerized deployment skills.",
  },
  {
    title: "Machine Learning Approach to Learn and Detect Malware in Android",
    description:
      "Implemented a web-based malware detection system for Android apps using Support Vector Machines and Artificial Neural Networks trained models on pattern evaluation data in a team of 4.",
  },
];

export default function Projects() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState([]);
  const [showMobileButton, setShowMobileButton] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const cardRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      const nowDesktop = window.innerWidth >= 768;
      setIsDesktop(nowDesktop);
      if (nowDesktop) {
        setShowMobileButton(false); // hide mobile button on desktop
      }
    };

    let lastScrollY = window.scrollY;
    let atBottom = false;

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (isMobile) {
        if (scrolledToBottom) {
          setShowMobileButton(true);
          atBottom = true;
        } else if (window.scrollY < lastScrollY && atBottom) {
          // If user scrolls up after reaching bottom, keep showing the button
          setShowMobileButton(true);
        } else {
          setShowMobileButton(false);
          atBottom = false;
        }
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktop]);

  const renderCards = (projects, startIndex = 0) => {
    return projects.map((project, index) => {
      const hasImage = !!project.image;
      return (
        <div
          key={startIndex + index}
          className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:scale-[1.02] transition-transform duration-300"
        >
          {hasImage && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-contain bg-gray-900 rounded-t-xl"
            />
          )}
          <div className={`${hasImage ? "p-5" : "p-6"}`}>
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm">{project.description}</p>
          </div>
        </div>
      );
    });
  };  

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-cover bg-center text-white px-6 py-20 overflow-hidden mt-4"
      style={{ backgroundImage: `url('/Home.jpeg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-darkOverlay/90 via-darkOverlay/60 to-transparent dark:from-black/90 dark:via-black/70" />

      {/* Content Container */}
      <div className="relative z-10 flex-grow max-w-7xl mx-auto">
        {/* Professional Projects */}
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Professional Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {renderCards(professionalProjects, 0)}
        </div>

        {/* Academic Projects */}
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Academic Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {renderCards(academicProjects, professionalProjects.length)}
        </div>

        {/* Arrows ABOVE Footer */}
        <div
          className={`z-10 flex justify-center space-x-6 mt-6 mb-0 transition-opacity duration-500 ${
            isDesktop || showMobileButton
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => navigate("/")}
            className="group flex flex-col items-center px-6 py-4 text-base uppercase font-semibold text-white dark:text-accent bg-transparent hover:text-blue-400 transition rounded-full"
          >
            <span className="mt-0 animate-bounce text-5xl tracking-widest text-white dark:text-accent">
              ‹‹‹
            </span>
          </button>

          <button
            onClick={() => navigate("/about")}
            className="group flex flex-col items-center px-6 py-4 text-base uppercase font-semibold text-white dark:text-accent bg-transparent hover:text-blue-400 transition rounded-full"
          >
            <span className="mt-0 animate-bounce text-5xl tracking-widest text-white dark:text-accent">
              ›››
            </span>
          </button>
        </div>

        {/* Footer */}
        <footer className="pt-6 pb-12 text-center text-sm text-softGray dark:text-gray-400">
          Developed by Prathik using React.js, Tailwind CSS, Node.js
        </footer>
      </div>
    </section>
  );
}
