// components/Feature.jsx

import {
  RiCheckLine,
  RiTrophyLine,
  RiStarFill,
  RiTimeLine,
  RiCodeBoxLine,
  RiLockLine,
  RiStarLine,
  RiRocketLine,
} from "react-icons/ri";

const checklist = [
  "Skill-based progression system",
  "Unlock achievements and badges",
  "Detailed performance analytics",
  "Personalized skill recommendations",
];

const levels = [
  {
    status: "completed",
    title: "Beginner Projects",
    subtitle: "5/5 Completed",
    icon: <RiCheckLine />,
    progressLine: "bg-green-500",
    badges: [
      { icon: <RiStarFill className="text-yellow-500" />, bg: "bg-yellow-100" },
      { icon: <RiTimeLine className="text-blue-500" />, bg: "bg-blue-100" },
    ],
  },
  {
    status: "current",
    title: "Intermediate Projects",
    subtitle: "3/7 Completed",
    icon: <span className="text-sm font-medium">3</span>,
    progressLine: "bg-gray-300",
    badges: [
      { icon: <RiStarFill className="text-yellow-500" />, bg: "bg-yellow-100" },
      {
        icon: <RiCodeBoxLine className="text-purple-500" />,
        bg: "bg-purple-100",
      },
    ],
  },
  {
    status: "locked",
    title: "Advanced Projects",
    subtitle: "0/8 Completed",
    icon: <RiLockLine />,
    progressLine: "",
    badges: [
      { icon: <RiStarLine className="text-gray-400" />, bg: "bg-gray-100" },
      { icon: <RiRocketLine className="text-gray-400" />, bg: "bg-gray-100" },
    ],
  },
];

const Feature = () => {
  return (
    <section className="py-20 md:mx-16 mx-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Personalized Learning Journey
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Track your growth as you move from simpler projects to advanced ones, building both technical skills and professional habits needed for freelancing and jobs.
            </p>
            <ul className="space-y-4 mb-8">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-6 h-6 mt-1 flex items-center justify-center text-green-500">
                    <RiCheckLine className="text-lg" />
                  </div>
                  <span className="ml-3 text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Your Progress
                  </h3>
                  <div className="flex items-center">
                    <RiTrophyLine className="text-primary w-5 h-5" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Level 3
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {levels.map((lvl, i) => (
                    <div key={i} className="relative">
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-8 h-8 ${
                            lvl.status === "completed"
                              ? "bg-green-500"
                              : lvl.status === "current"
                              ? "bg-primary"
                              : "bg-gray-300"
                          } rounded-full flex items-center justify-center text-white z-10`}
                        >
                          {lvl.icon}
                        </div>

                        <div className="ml-3">
                          <h4
                            className={`font-medium ${
                              lvl.status === "locked"
                                ? "text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {lvl.title}
                          </h4>
                          <p
                            className={`text-sm ${
                              lvl.status === "locked"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            {lvl.subtitle}
                          </p>
                        </div>

                        <div className="ml-auto flex">
                          {lvl.badges.map((b, j) => (
                            <div
                              key={j}
                              className={`w-8 h-8 rounded-full ${
                                b.bg
                              } flex items-center justify-center ${
                                j > 0 ? "ml-2" : ""
                              }`}
                            >
                              {b.icon}
                            </div>
                          ))}
                        </div>
                      </div>

                      {lvl.progressLine && (
                        <div
                          className={`h-full w-0.5 ${lvl.progressLine} absolute left-4 top-8 -translate-x-1/2 z-0`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Overall progress bar */}
                <div className="mt-8">
                  <div className="bg-gray-100 rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>8/20 Projects</span>
                    <span>45% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;