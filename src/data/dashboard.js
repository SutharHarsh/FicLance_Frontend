import React from "react";
import {
  FaCode,
  FaStopwatch,
  FaUsers,
  FaStar,
  FaBug,
  FaLock,
} from "react-icons/fa";
import {
  RiDashboardLine,
  RiFolderLine,
  RiChat4Line,
  RiLayout4Line,
  RiDatabase2Line,
  RiSmartphoneLine,
  RiCodeSSlashLine,
  RiArrowRightUpLine,
  RiTeamLine,
  RiFolderAddLine,
  RiRoadMapLine,
  RiArrowRightLine,
  RiBriefcase4Line,
} from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AiOutlineCheck, AiFillStar } from "react-icons/ai";
import { Combine, HelpCircle, MessageSquareCode } from "lucide-react";

export const welcomeInfo = {
  username: "Asmita",
  date: "July 23, 2025",
  day: "Wednesday",
};

export const dashboardCards = [
  {
    title: "Active Projects",
    value: "12",
    icon: <RiLayout4Line />,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    progress: {
      value: 68,
      color: "bg-indigo-500",
      label: "On track",
      showPercent: true,
    },
  },
  {
    title: "Pending Tasks",
    value: "34",
    icon: <RiCodeSSlashLine />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    changeText: "5 tasks due this week",
    statChangeIcon: <RiArrowRightUpLine />,
    statChangeColor: "text-orange-500",
  },
  {
    title: "Team Members",
    value: "8",
    icon: <RiTeamLine />,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    progress: {
      value: 82,
      color: "bg-green-500",
      label: "Availability",
      showPercent: true,
    },
  },
  {
    title: "Avg. Rating",
    value: "4.8",
    icon: <AiFillStar />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    changeText: "+0.2 vs last month",
    statChangeIcon: <RiArrowRightUpLine />,
    statChangeColor: "text-green-500",
  },
];

export const navItems = [
  {
    name: "Dashboard",
    icon: <RiDashboardLine />,
    href: "/dashboard",
    active: true,
  },
  { name: "Chat", icon: <MessageSquareCode />, href: "/chat" },
  { name: "Portfolio", icon: <Combine />, href: "/portfolio" },
  { name: "Profile", icon: <CgProfile />, href: "/profile" },
  {
    name: "Help Desk",
    icon: <HelpCircle />,
    href: "/help-desk",
    target: "_blank",
  },
];

export const recentProjects = [
  { name: "E-commerce Redesign", color: "bg-green-500" },
  { name: "API Integration", color: "bg-yellow-500" },
  { name: "Mobile App UI", color: "bg-blue-500" },
];

export const inProgressProjects = [
  {
    title: "E-commerce Dashboard",
    description:
      "Design and implement a responsive admin dashboard for an e-commerce platform.",
    icon: <RiLayout4Line />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    priority: "Medium",
    priorityColor: { bg: "bg-yellow-100", text: "text-yellow-800" },
    progress: 65,
    progressColor: "bg-blue-500",
    team: [
      { initials: "JD", bg: "bg-indigo-500" },
      { initials: "MK", bg: "bg-pink-500" },
    ],
    dueDate: "Jul 15",
  },
  {
    title: "Database Refactor",
    description: "Normalize legacy schemas and improve query performance.",
    icon: <RiDatabase2Line />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    priority: "High",
    priorityColor: { bg: "bg-red-100", text: "text-red-800" },
    progress: 48,
    progressColor: "bg-purple-500",
    team: [
      { initials: "AS", bg: "bg-emerald-500" },
      { initials: "VK", bg: "bg-amber-500" },
    ],
    dueDate: "Aug 02",
  },
  {
    title: "Mobile UI Sprint",
    description: "Ship revised onboarding flow for the mobile app.",
    icon: <RiSmartphoneLine />,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    priority: "Medium",
    priorityColor: { bg: "bg-yellow-100", text: "text-yellow-800" },
    progress: 72,
    progressColor: "bg-pink-500",
    team: [
      { initials: "LM", bg: "bg-sky-500" },
      { initials: "TR", bg: "bg-slate-500" },
    ],
    dueDate: "Aug 10",
  },
];

export const completedProjects = [
  {
    title: "Landing Page Redesign",
    date: "June 15, 2025",
    rating: "4.8",
    icon: <AiOutlineCheck className="text-green-600 text-lg" />,
  },
  {
    title: "Marketing Automation",
    date: "May 28, 2025",
    rating: "4.9",
    icon: <AiOutlineCheck className="text-green-600 text-lg" />,
  },
];

export const deadlines = [
  {
    month: "JUL",
    date: "08",
    title: "API Integration",
    description: "Payment gateway implementation",
    priority: "High",
  },
  {
    month: "JUL",
    date: "18",
    title: "UX Review",
    description: "Run usability testing for dashboard",
    priority: "Medium",
  },
];

export const skills = [
  { name: "React.js", percent: 95 },
  { name: "Node.js", percent: 70 },
  { name: "UI/UX Design", percent: 75 },
  { name: "Testing", percent: 80 },
  { name: "API Design", percent: 85 },
  { name: "TypeScript", percent: 65 },
];

export const recentActivities = [
  {
    title: "Project Assigned",
    subtitle: "E-commerce Dashboard",
    description:
      "You've been assigned to a new project as a frontend developer.",
    timestamp: "Today, 10:30 AM",
    icon: <FaCode className="text-white text-xs" />,
    bgColor: "bg-blue-500",
  },
  {
    title: "Task Completed",
    subtitle: "Mobile App UI",
    description: "You've completed the navigation design for the fitness app.",
    timestamp: "Yesterday, 3:45 PM",
    icon: <FaStar className="text-white text-xs" />,
    bgColor: "bg-green-500",
  },
];

export const recommendations = [
  {
    icon: <RiFolderAddLine className="text-green-600 text-lg" />,
    iconBg: "bg-green-100",
    title: "Try This Project Next",
    description:
      "Authentication System with OAuth - This project aligns with your backend development goals.",
    buttonText: "View Project",
  },
  {
    icon: <RiRoadMapLine className="text-indigo-600 text-lg" />,
    iconBg: "bg-indigo-100",
    title: "Skill Path",
    description: "Plan a 4-week track to advance your API design expertise.",
    buttonText: "View Plan",
  },
];

export const achievementBadges = [
  {
    label: "Code Master",
    icon: FaCode,
    iconClass: "text-indigo-600 text-lg",
    bgColor: "bg-indigo-100",
    textColor: "text-gray-700",
  },
  {
    label: "Fast Learner",
    icon: FaStopwatch,
    iconClass: "text-green-600 text-lg",
    bgColor: "bg-green-100",
    textColor: "text-gray-700",
  },
  {
    label: "Team Player",
    icon: FaUsers,
    iconClass: "text-purple-600 text-lg",
    bgColor: "bg-purple-100",
    textColor: "text-gray-700",
  },
  {
    label: "Rising Star",
    icon: FaStar,
    iconClass: "text-yellow-600 text-lg",
    bgColor: "bg-yellow-100",
    textColor: "text-gray-700",
  },
  {
    label: "Bug Hunter",
    icon: FaBug,
    iconClass: "text-blue-600 text-lg",
    bgColor: "bg-blue-100",
    textColor: "text-gray-700",
  },
  {
    label: "Locked",
    icon: FaLock,
    iconClass: "text-gray-400 text-lg",
    bgColor: "bg-gray-100",
    textColor: "text-gray-400",
  },
];

export default {
  welcomeInfo,
  dashboardCards,
  navItems,
  recentProjects,
  inProgressProjects,
  completedProjects,
  deadlines,
  skills,
  recentActivities,
  recommendations,
  achievementBadges,
};
