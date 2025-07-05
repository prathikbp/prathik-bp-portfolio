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
      className="relative min-h-screen flex flex-col bg-cover bg-center text-white dark:text-white overflow-hidden"
      style={{ backgroundImage: `url('/Home.jpeg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-darkOverlay/90 via-darkOverlay/60 to-transparent dark:from-black/90 dark:via-black/70" />

      {/* Content */}
      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-6 pt-32 flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
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
            I’m curious to work at the intersection of software, data, and
            intelligence. I’m drawn to building systems that scale in the cloud,
            uncover insights from data, and learn through machine learning.
          </p>

          <div
            ref={experienceRef}
            className={`transition-all duration-700 ease-out delay-1200 transform ${
              show.experience
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } mt-4`}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Experienced professionally in
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                {[
                  "Software Development",
                  "Cloud Data Engineering",
                  "Data Analytics",
                  "Machine Learning",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="px-6 py-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 text-blue-300 border border-white/10 backdrop-blur-sm shadow-md hover:shadow-blue-400/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] text-sm font-semibold text-center"
                  >
                    {text}
                  </div>
                ))}
              </div>
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

      {/* Arrow ABOVE Footer */}
      <div
        className={`z-10 flex justify-center mt-6 mb-0 transition-opacity duration-500 ${
          isDesktop || showMobileButton
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => navigate("/projects")}
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
    </section>
  );
}  