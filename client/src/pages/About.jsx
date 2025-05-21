import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function About() {
  const navigate = useNavigate();
  const [showMobileButton, setShowMobileButton] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const professionalTimeline = [
    {
      title: "Internship & Work Experience",
      period: "2021 – 2023",
      description:
        "Worked professionally for 2.5 years in software development, data engineering, and analytics.",
    },
  ];

  const academicTimeline = [
    {
      title: "Schooling",
      period: "Up to 2017",
      description:
        "Completed high school with a solid foundation in mathematics and computer science.",
    },
    {
      title: "Bachelor's in Computer Science",
      period: "2017 – 2021",
      description:
        "Earned my undergraduate degree with strong interest in software engineering and data systems.",
    },
    {
      title: "Master's in Computer Science",
      period: "2023 – Present",
      description:
        "Currently pursuing a Master’s at X University, focusing on software systems and machine learning-driven data solutions.",
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

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (!isDesktop) setShowMobileButton(scrolledToBottom); // Show button only on scroll to bottom for mobile
    };

    const handleResize = () => {
      const nowDesktop = window.innerWidth >= 768;
      setIsDesktop(nowDesktop);
      if (nowDesktop) {
        setShowMobileButton(true); // Show button always on desktop
      }
    };

    window.addEventListener("scroll", reveal);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    reveal();
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesktop]);

  const renderTimelineSection = (title, items) => (
    <div className="mb-24 relative">
      <h2 className="text-2xl font-bold text-white mb-16 text-center">
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
      className="relative min-h-screen bg-cover bg-center text-white px-6 py-20 overflow-hidden"
      style={{ backgroundImage: `url('/Home.jpeg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-darkOverlay/90 via-darkOverlay/60 to-transparent dark:from-black/90 dark:via-black/70" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {renderTimelineSection("Professional Experience", professionalTimeline)}
        {renderTimelineSection("Academic Journey", academicTimeline)}
      </div>

      {/* Back and Next Buttons */}
      <div
        className={`z-10 flex space-x-6 items-center fixed bottom-4 right-1/2 translate-x-1/2 md:right-16 md:translate-x-0 md:absolute md:bottom-14 transition-opacity duration-500 ${
          isDesktop || showMobileButton
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => navigate("/projects")}
          className="group flex flex-col items-center px-4 py-3 text-sm uppercase font-semibold text-white bg-transparent hover:bg-accent hover:text-white transition rounded-full"
        >
          <span>Back</span>
          <span className="mt-1 rotate-180">→</span>
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="group flex flex-col items-center px-4 py-3 text-sm uppercase font-semibold text-white bg-transparent hover:bg-accent hover:text-white transition rounded-full"
        >
          <span>Next</span>
          <span className="mt-1 animate-bounce">→</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-softGray dark:text-gray-400">
        Developed by Prathik using React.js, Tailwind CSS, Node.js
      </footer>

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
