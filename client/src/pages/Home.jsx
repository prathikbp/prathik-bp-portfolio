import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const hiRef = useRef(null);
  const nameRef = useRef(null);
  const experienceRef = useRef(null);

  const [show, setShow] = useState({
    hi: false,
    name: false,
    experience: false,
  });

  const [showMobileButton, setShowMobileButton] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const reveal = () => {
      const animate = (ref, key) => {
        if (!ref.current) return;
        const top = ref.current.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          setShow((prev) => ({ ...prev, [key]: true }));
        }
      };

      animate(hiRef, "hi");
      animate(nameRef, "name");
      animate(experienceRef, "experience");
    };

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setShowMobileButton(isMobile && scrolledToBottom);
    };

    const handleResize = () => {
      const nowDesktop = window.innerWidth >= 768;
      setIsDesktop(nowDesktop);
      if (nowDesktop) {
        setShowMobileButton(false); // reset mobile button on resize to desktop
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
  }, []);

  return (
    <section
      className="relative min-h-screen bg-cover bg-center text-white dark:text-white overflow-hidden"
      style={{ backgroundImage: `url('/Home.jpeg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-darkOverlay/90 via-darkOverlay/60 to-transparent dark:from-black/90 dark:via-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
        {/* Left: Text */}
        <div className="md:w-1/2 flex flex-col space-y-6">
          {/* Hi There */}
          <p
            ref={hiRef}
            className={`transition-all duration-700 ease-out delay-400 transform ${
              show.hi ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } text-lg md:text-2xl font-light text-softGray dark:text-gray-300 leading-snug max-w-2xl`}
          >
            Hi there, I’m{" "}
          </p>

          {/* Name */}
          <h1
            ref={nameRef}
            className={`transition-all duration-700 ease-out delay-800 transform ${
              show.name
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            } text-5xl md:text-5xl font-extrabold tracking-tight text-white dark:text-accent leading-tight`}
          >
            Prathik <span className="text-white"> B Prabhakara</span>
          </h1>

          <p className="text-lg md:text-xl text-softGray dark:text-gray-300 max-w-xl leading-relaxed">
            A graduate student pursuing a Master’s in Computer Science at{" "}
            <span className="font-semibold">X University</span>, with a strong
            passion for the study of Software systems and Data, particularly
            aligning with machine learning-driven implementations.
          </p>

          <div
            ref={experienceRef}
            className={`transition-all duration-700 ease-out delay-1200 transform ${
              show.experience
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-xl font-bold text-white mb-2">
              Experienced professional for about 2.5 years in
            </h2>

            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-2xl border border-white/20 dark:border-white/10 mt-4">
              <p className="text-xl text-softGray dark:text-gray-300">
                Software Development, Data Engineering, and Analytics,
                contributing to building scalable systems and efficient data
                pipelines within Azure, while also developing dynamic web
                applications with React.js and Python. My work often involves
                transforming complex data into actionable insights through
                interactive dashboards and visualizations using Power BI.
                Throughout my journey, I’ve delivered robust, cloud-based
                solutions in real-world projects.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/my-image.jpeg"
            alt="Prathik"
            className="w-80 h-80 rounded-full border-1 border-accent object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Next Button */}
      <div
        className={`z-10 flex flex-col items-center fixed bottom-6 right-1/2 translate-x-1/2 md:right-16 md:translate-x-0 md:absolute md:bottom-14 transition-opacity duration-500 ${
          isDesktop || showMobileButton
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => navigate("/projects")}
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
