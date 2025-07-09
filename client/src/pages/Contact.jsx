import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [showMobileButton, setShowMobileButton] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setStatus(data.msg);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-cover bg-center text-white px-6 py-20"
      style={{ backgroundImage: `url('/Home.jpeg')` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-darkOverlay/90 via-darkOverlay/60 to-transparent dark:from-black/90 dark:via-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-8 mt-4 text-center">
          Contact Me
        </h2>
        <h1 className="text-2xl  text-accent mb-8 text-center">E-mail to</h1>
        <h1 className="text-2xl italic  mb-8 text-center">
          {" "}
          prathik1470@gmail.com
        </h1>
        {/* <form
          onSubmit={handleSubmit}
          className="bg-white/10 dark:bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20 dark:border-white/10 space-y-6"
        >
          <input
            name="name"
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            name="phone"
            type="tel"
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <textarea
            name="message"
            onChange={handleChange}
            placeholder="Message"
            className="w-full px-4 py-2 h-32 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <button
            type="submit"
            className="w-full bg-accent hover:bg-white hover:text-accent border border-transparent hover:border-accent transition text-white font-semibold py-2 rounded-md"
          >
            Send Message
          </button>
          {status && <p className="text-green-400 text-center">{status}</p>}
        </form> */}

        {/* Arrow ABOVE Footer */}
        <div
          className={`z-10 flex justify-center mt-8 mb-0 transition-opacity duration-500 ${
            isDesktop || showMobileButton
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => navigate("/about")}
            className="group flex flex-col items-center px-6 py-4 text-base uppercase font-semibold text-white dark:text-accent bg-transparent hover:text-blue-400 transition rounded-full"
          >
            <span className="mt-0 text-5xl rotate-180 tracking-widest animate-bounce text-white dark:text-accent">
              ‹‹‹
            </span>
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-sm text-white/60">
          Developed by Prathik using React.js, Tailwind CSS, Node.js
        </p>
      </div>
    </section>
  );
}