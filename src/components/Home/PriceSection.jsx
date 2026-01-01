// app/components/PriceSection.tsx (or components/PriceSection.tsx if using Pages Router)

import { isBetaMode } from "@/lib/config";

const plans = [
  {
    name: "rookie-mode",
    tagline: "start small, level up fast",
    features: [
      "Basic project simulations",
      "Clear, easy-to-follow briefs",
      "Work on projects that actually matter",
      "Sharpen your skills faster through hands-on projects",
      "Earn points for every completed project",
      "Designed for quick practice and steady momentum",
      "Great for starting your portfolio",
      "Build confidence through fast wins",
      "Start your journey and stand out with real experience",
    ],
    heightClass: "h-[470px]",
  },
];

const PriceSection = () => {
  // Check if beta mode is active
  const betaModeActive = isBetaMode();

  return (
    <section
      className="bg-white py-16 md:mx-16 mx-6 px-4 sm:px-6 lg:px-8"
      id="pricing"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-gray-500 text-sm uppercase tracking-widest">
          choose your mode
        </p>
        <h2 className="text-4xl sm:text-5xl font-light text-gray-900">
          <span className="font-medium">Website Dev Journeys</span> for Every
          Level
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-600">
          From low-pressure practice projects to serious pro challenges, earn
          progress, level up, and build a portfolio that actually matters.
        </p>
      </div>

      {/* Beta Mode Message or Pricing Cards */}
      {betaModeActive ? (
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
            </span>
            <h3 className="text-2xl font-bold text-gray-900">
              Beta Access - Unlimited Everything!
            </h3>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            We're currently in beta mode. All users have{" "}
            <strong>unlimited access</strong> to all features, projects, and
            templates completely free!
          </p>
          <p className="text-sm text-gray-600">
            Take advantage of this opportunity to build your portfolio and
            explore all expertise levels without any restrictions.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${plan.heightClass}`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 capitalize flex items-center gap-1">
                  {plan.name}
                  {plan.isPro && (
                    <span className="text-yellow-400 text-xl">•</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{plan.tagline}</p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <div className="mt-6">
                <button className="w-full bg-yellow-400 hover:bg-yellow-300 transition text-black font-medium text-sm py-3 px-4 rounded-full">
                  find out the price <span className="ml-1">➜</span>
                </button>
                <p className="text-[11px] text-center text-gray-500 mt-1">
                  and receive a commercial offer
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PriceSection;
