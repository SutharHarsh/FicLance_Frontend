// components/RoleCards.jsx

import {
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiLayout4Line,
  RiBarChart2Line,
  RiBarChartLine,
  RiFolderLine,
} from 'react-icons/ri';

const roles = [
  {
    title: 'Frontend Developer',
    description:
      'Build responsive, interactive user interfaces using modern frameworks and libraries.',
    icon: <RiCodeSSlashLine className="text-primary text-3xl" />,
    levelIcon: <RiBarChart2Line className="text-yellow-500" />,
    level: 'Intermediate',
    projectsIcon: <RiFolderLine className="text-blue-500" />,
    projects: '24 Projects',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-600',
  },
  {
    title: 'Backend Developer',
    description:
      'Create robust APIs, manage databases, and build server-side applications.',
    icon: <RiDatabase2Line className="text-primary text-3xl" />,
    levelIcon: <RiBarChartLine className="text-red-500" />,
    level: 'Advanced',
    projectsIcon: <RiFolderLine className="text-blue-500" />,
    projects: '18 Projects',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500',
  },
  {
    title: 'UI/UX Designer',
    description:
      'Design intuitive user experiences and beautiful interfaces for web and mobile.',
    icon: <RiLayout4Line className="text-primary text-3xl" />,
    levelIcon: <RiBarChartLine className="text-green-500" />,
    level: 'Beginner',
    projectsIcon: <RiFolderLine className="text-blue-500" />,
    projects: '32 Projects',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-teal-500',
  },
];

const RoleCard = ({
  title,
  description,
  icon,
  levelIcon,
  level,
  projectsIcon,
  projects,
  gradientFrom,
  gradientTo,
}) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
    <div
      className={`h-40 bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center`}
    >
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 flex items-center justify-center">{levelIcon}</div>
          <span className="ml-2 text-sm text-gray-700">{level}</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 flex items-center justify-center">{projectsIcon}</div>
          <span className="ml-2 text-sm text-gray-700">{projects}</span>
        </div>
      </div>
      <button className="w-full bg-primary text-white py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap">
        Choose Role
      </button>
    </div>
  </div>
);

const RoleCards = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a professional path that matches your skills and interests. Each role
            offers unique challenges and learning opportunities.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <RoleCard key={index} {...role} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleCards;