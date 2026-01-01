// app/components/Integrations.tsx (or wherever you keep components)

import {
  RiGithubFill,
  RiBrushFill,
  RiApps2Fill,
  RiCheckLine,
} from "react-icons/ri";

const integrations = [
  {
    name: "GitHub",
    description:
      "Link your GitHub account to automatically sync your project repositories and showcase your code contributions.",
    icon: <RiGithubFill className="text-gray-900 text-2xl" />,
    status: "Connected",
    statusStyle: "bg-green-100 text-green-800",
    features: ["Code verification", "Commit history", "Portfolio integration"],
    checkColor: "text-green-500",
  },
  {
    name: "Figma",
    description:
      "Connect your Figma account to access design assets, collaborate on UI/UX projects, and showcase your design work.",
    icon: <RiBrushFill className="text-purple-600 text-2xl" />,
    status: "Connected",
    statusStyle: "bg-green-100 text-green-800",
    features: ["Design file access", "Prototype sharing", "Design showcase"],
    checkColor: "text-green-500",
  },
  {
    name: "Trello",
    description:
      "Integrate with Trello to manage your project tasks, track progress, and organize your workflow efficiently.",
    icon: <RiApps2Fill className="text-blue-500 text-2xl" />,
    status: "Connect",
    statusStyle: "bg-gray-100 text-gray-800",
    features: [
      "Task synchronization",
      "Progress tracking",
      "Deadline management",
    ],
    checkColor: "text-gray-400",
  },
];

const Integrations = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Seamless Integrations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with the tools you already use to enhance your learning
            experience and streamline your workflow.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Icon + Status */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  {integration.icon}
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${integration.statusStyle}`}
                >
                  {integration.status}
                </span>
              </div>

              {/* Title + Description */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {integration.name}
              </h3>
              <p className="text-gray-600 mb-6">{integration.description}</p>

              {/* Features */}
              {integration.features.map((feature, i) => (
                <div
                  key={i}
                  className={`flex items-center text-sm text-gray-500${
                    i > 0 ? " mt-2" : ""
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <RiCheckLine className={integration.checkColor} />
                  </div>
                  <span className="ml-2">{feature}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;