// components/HeroSection2.jsx

const HeroSection2 = () => {
  return (
    <>
      <style>{`
        :where([class^="ri-"])::before {
          content: "\\f3c2";
        }

        body {
          font-family: 'Inter', sans-serif;
        }

        .hero-section {
          background-image: url('https://readdy.ai/api/search-image?query=modern%2520tech%2520workspace%2520with%2520gradient%2520blue%2520to%2520purple%2520background%2C%2520minimalist%2520design%2C%2520showing%2520abstract%2520code%2520elements%2520and%2520UI%2520components%2520floating%2520on%2520the%2520right%2520side%2C%2520left%2520side%2520is%2520clean%2520with%2520smooth%2520gradient%2520for%2520text%2520placement%2C%2520professional%2520lighting%2C%2520high%2520quality%2520render&width=1600&height=800&seq=hero123&orientation=landscape');
          background-size: cover;
          background-position: center;
        }

        .hero-content {
          background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%);
        }

        .rounded-button {
          border-radius: 0.5rem;
        }

        .bg-primary {
          background-color: #4f46e5; /* Tailwind indigo-600 */
        }

        .text-primary {
          color: #4f46e5;
        }

        .border-primary {
          border-color: #4f46e5;
        }
      `}</style>

      <section className="hero-section relative">
        <div className="container mx-auto px-4 py-24 w-full">
          <div className="hero-content max-w-2xl py-16 px-10 rounded-xl">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Simulated Gigs. Real Growth.
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Master freelancing skills through immersive project simulations. Build your portfolio without the risk of real clients.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap">
                Try Free Demo
              </button>
              <button className="bg-card text-primary border border-primary px-8 py-3 rounded-button font-medium hover:bg-gray-50 transition whitespace-nowrap">
                View Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection2;