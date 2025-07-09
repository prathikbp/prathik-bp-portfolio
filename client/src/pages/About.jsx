import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function About() {
  const navigate = useNavigate();
  const [showMobileButton, setShowMobileButton] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const professionalTimeline = [
    {
      title: "Data Analyst & Software Developer, Mercedes-Benz R&D",
      period: "Aug 2023 – Dec 2024",
      description:
        "Led the development of a full-stack data observability platform aligned with Data Content, Flow, Infrastructure, Usage, Cost, moving towards saving data storage costs. Integrated Azure Data Lake, Databricks, and LLMs for scalable analytics and user automation. Built a ReactJS-based frontend and Python REST backend to replace Power BI for better performance.",
    },
    {
      title: "Data Engineer, Mercedes-Benz R&D",
      period: "Aug 2022 – Aug 2023",
      description:
        "Engineered Azure Data Factory pipelines and migrated legacy systems across EMEA and NAFTA. Enabled real-time streaming with Kafka, Event Hubs, and AWS sources. Led agile sprint planning and contributed to major data platform, migrations.",
    },
  ];
  

  const academicTimeline = [
    {
      title: "Master's in Computer Science",
      period: "Jan 2025 – Dec 2026",
      description:
        "Currently pursuing a Master's at Iowa State University, focusing on software systems, cloud platforms, and machine learning-driven data solutions.",
    },
    {
      title: "Bachelor's in Information Science & Engineering",
      period: "Aug 2018 – Jul 2022",
      description:
        "Graduated with an 8.4 CGPA from SJB Institute of Technology, Bengaluru, building a strong base in software engineering, data platforms, and machine learning fundamentals.",
    },
    {
      title: "Schooling",
      period: "Up to 2018",
      description:
        "Completed high school from Bengaluru with a solid foundation in mathematics and computer science.",
    },
  ];
  

  useEffect(() => {
    const reveal = () => {
      const cards = document.querySelectorAll(".timeline-card");
      cards.forEach((card) => {
        const top = card.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
          card.classList.add("animate-reveal");
        }
      });
    };

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

    window.addEventListener("scroll", reveal);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    reveal();
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktop]);

  const renderTimelineSection = (title, items) => (
    <div className="mb-12 relative">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        {title}
      </h2>
      <div className="hidden md:block absolute top-1/2 left-1/2 w-px h-full bg-accent/30 -translate-x-1/2 z-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 relative z-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={`timeline-card opacity-0 transition duration-700 ease-out transform flex flex-col items-center text-center ${
              index % 2 === 0 ? "md:justify-self-end" : "md:justify-self-start"
            }`}
          >
            <div className="relative mb-4">
              <div className="w-5 h-5 bg-accent rounded-full border-4 border-white/30 shadow animate-pulse z-10 relative" />
              <div className="hidden md:block absolute left-1/2 top-full h-8 w-px bg-accent/30 -translate-x-1/2 z-0" />
            </div>
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 dark:border-white/10 w-full max-w-md">
              <h3 className="text-xl font-semibold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-accent mb-2">{item.period}</p>
              <p className="text-softGray dark:text-gray-300 text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="about"
      className="relative min-h-screen bg-cover bg-center text-white px-6 py-20 overflow-hidden mt-4"
      style={{ backgroundImage: `url('/Home.jpeg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-darkOverlay/90 via-darkOverlay/60 to-transparent dark:from-black/90 dark:via-black/70" />
  
      <div className="relative z-10 max-w-6xl mx-auto">
        {renderTimelineSection("Professional Experience", professionalTimeline)}
        {renderTimelineSection("Academic Journey", academicTimeline)}
  
        {/* Arrows ABOVE Footer */}
        <div
          className={`z-10 flex justify-center space-x-6 mt-6 mb-0 transition-opacity duration-500 ${
            isDesktop || showMobileButton
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => navigate("/projects")}
            className="group flex flex-col items-center px-6 py-4 text-base uppercase font-semibold text-white dark:text-accent bg-transparent hover:text-blue-400 transition rounded-full"
          >
            <span className="mt-0 text-5xl rotate-180 tracking-widest animate-bounce text-white dark:text-accent">
              ‹‹‹
            </span>
          </button>
  
          <button
            onClick={() => navigate("/contact")}
            className="group flex flex-col items-center px-6 py-4 text-base uppercase font-semibold text-white dark:text-accent bg-transparent hover:text-blue-400 transition rounded-full"
          >
            <span className="mt-0 text-5xl tracking-widest animate-bounce text-white dark:text-accent">
              ›››
            </span>
          </button>
        </div>
  
        {/* Footer (keep it below the arrow) */}
        <footer className="pt-6 pb-12 text-center text-sm text-softGray dark:text-gray-400">
          Developed by Prathik using React.js, Tailwind CSS, Node.js
        </footer>
      </div>
  
      <style>{`
        .animate-reveal {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        .timeline-card {
          transform: translateY(40px) scale(0.98);
        }
      `}</style>
    </section>
  );
}