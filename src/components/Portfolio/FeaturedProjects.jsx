"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Star, 
  Github, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Users,
  Code,
  Award,
  Eye,
  TrendingUp,
  X,
  Clock,
  User,
  Target,
  Lightbulb,
  BarChart
} from "lucide-react";

const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "E-commerce Platform",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    description: "A comprehensive e-commerce solution with advanced features including real-time inventory management, secure payment processing, and AI-powered product recommendations.",
    rating: 5.0,
    duration: "6 months",
    teamSize: "4 developers",
    views: "12.5K",
    githubLink: "https://github.com",
    caseStudyLink: "#",
    category: "Web Application",
    status: "Completed",
    year: "2024",
    caseStudy: {
      client: "Fashion Retailer Inc.",
      timeline: "January - June 2024",
      role: "Lead Frontend Developer",
      overview: "A comprehensive e-commerce solution for a fashion retailer with product management, shopping cart, payment processing, and order tracking features. The platform needed to handle thousands of products while maintaining optimal performance.",
      challenge: "The client needed a scalable e-commerce platform that could handle their growing product catalog of over 10,000 items while providing a seamless shopping experience across all devices. Their existing platform was outdated and couldn't support modern features like real-time inventory updates.",
      approach: "I implemented a React frontend with Redux for state management, connected to a Node.js backend with Express. The platform features responsive design, optimized product filtering with Elasticsearch, and a streamlined checkout process with multiple payment options including Stripe and PayPal integration.",
      results: "The new platform increased mobile conversions by 35% and reduced cart abandonment by 25%. The client reported a 40% increase in overall sales and significant improvements in customer satisfaction scores. Page load times improved by 60%.",
      technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe API", "PayPal", "Elasticsearch", "AWS S3", "Redis"],
      detailImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    id: 2,
    title: "Financial Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Financial Dashboard",
    tags: ["Vue.js", "D3.js", "Firebase", "Chart.js"],
    description: "Interactive financial analytics dashboard featuring real-time data visualization, custom reporting tools, and predictive analysis capabilities for investment portfolio management.",
    rating: 4.8,
    duration: "4 months",
    teamSize: "3 developers",
    views: "8.2K",
    githubLink: "https://github.com",
    caseStudyLink: "#",
    category: "Dashboard",
    status: "Completed",
    year: "2024",
    caseStudy: {
      client: "Investment Solutions LLC",
      timeline: "March - June 2024",
      role: "Full Stack Developer",
      overview: "An interactive financial dashboard that visualizes complex investment data and provides real-time analytics for portfolio management. The system processes millions of data points to generate actionable insights.",
      challenge: "The client needed to transform complex financial data into actionable insights for their team and clients, with real-time updates and historical trend analysis spanning 10+ years of market data. The existing Excel-based system was inefficient and prone to errors.",
      approach: "I built a Vue.js application with D3.js for advanced data visualization, connected to Firebase for real-time updates. The dashboard includes customizable views, interactive charts, automated alerts, and exportable reports with PDF generation.",
      results: "The dashboard reduced analysis time by 60% and improved client engagement during portfolio reviews by 45%. The visualization tools have become central to the firm's client presentations, resulting in 30% more successful pitch meetings.",
      technologies: ["Vue.js", "D3.js", "Firebase", "Vuex", "Chart.js", "REST APIs", "PDF Generation", "WebSockets"],
      detailImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    id: 3,
    title: "Healthcare Management System",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Healthcare Management System",
    tags: ["React", "TypeScript", "PostgreSQL", "AWS"],
    description: "Comprehensive healthcare management platform with patient records, appointment scheduling, telemedicine integration, and HIPAA-compliant data handling.",
    rating: 4.9,
    duration: "8 months",
    teamSize: "6 developers",
    views: "15.3K",
    githubLink: "https://github.com",
    caseStudyLink: "#",
    category: "Healthcare",
    status: "Completed",
    year: "2023",
    caseStudy: {
      client: "Regional Medical Center",
      timeline: "May 2023 - December 2023",
      role: "Senior Frontend Developer",
      overview: "Comprehensive healthcare management platform serving 5,000+ patients with features including patient records, appointment scheduling, telemedicine integration, and HIPAA-compliant data handling.",
      challenge: "The medical center needed to digitize their patient management system while ensuring HIPAA compliance and maintaining seamless integration with existing medical equipment and third-party services.",
      approach: "Built with React and TypeScript for type safety, integrated with PostgreSQL for secure data storage, and deployed on AWS with comprehensive security measures. Implemented role-based access control and audit trails for compliance.",
      results: "Reduced appointment scheduling time by 70%, improved patient satisfaction scores by 25%, and enabled the medical center to handle 40% more patients efficiently. The telemedicine feature became crucial during the pandemic.",
      technologies: ["React", "TypeScript", "PostgreSQL", "AWS", "HIPAA Compliance", "WebRTC", "Node.js", "Docker"],
      detailImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    id: 4,
    title: "Social Media Analytics Tool",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Social Media Analytics Tool",
    tags: ["Angular", "Python", "TensorFlow", "Redis"],
    description: "Advanced social media analytics platform with sentiment analysis, engagement tracking, competitor analysis, and automated reporting for marketing teams.",
    rating: 4.7,
    duration: "5 months",
    teamSize: "5 developers",
    views: "9.8K",
    githubLink: "https://github.com",
    caseStudyLink: "#",
    category: "Analytics",
    status: "Completed",
    year: "2023",
    caseStudy: {
      client: "Digital Marketing Agency",
      timeline: "August - December 2023",
      role: "Frontend Lead",
      overview: "Advanced social media analytics platform processing 1M+ posts daily with sentiment analysis, engagement tracking, competitor analysis, and automated reporting for marketing teams.",
      challenge: "The agency needed to analyze massive amounts of social media data across multiple platforms while providing real-time insights and automated reporting for their 50+ clients.",
      approach: "Developed an Angular frontend with Python backend leveraging TensorFlow for AI-powered sentiment analysis. Implemented Redis for caching and real-time data processing with automated report generation.",
      results: "Enabled the agency to increase their client capacity by 200% while reducing manual analysis time by 80%. The AI-powered insights led to 35% better campaign performance across client accounts.",
      technologies: ["Angular", "Python", "TensorFlow", "Redis", "Social Media APIs", "Natural Language Processing", "Docker"],
      detailImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    id: 5,
    title: "Real Estate Platform",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Real Estate Platform",
    tags: ["Next.js", "Prisma", "Stripe", "MapBox"],
    description: "Modern real estate marketplace with virtual tours, mortgage calculators, property comparison tools, and integrated payment processing for seamless transactions.",
    rating: 4.6,
    duration: "7 months",
    teamSize: "4 developers",
    views: "11.7K",
    githubLink: "https://github.com",
    caseStudyLink: "#",
    category: "Marketplace",
    status: "Completed",
    year: "2023",
    caseStudy: {
      client: "Metropolitan Realty Group",
      timeline: "February - August 2023",
      role: "Full Stack Developer",
      overview: "Modern real estate marketplace handling 10,000+ property listings with virtual tours, mortgage calculators, property comparison tools, and integrated payment processing for seamless transactions.",
      challenge: "The realty group needed a modern platform to compete with major real estate websites while providing unique features like virtual tours and integrated mortgage services for their local market.",
      approach: "Built with Next.js for optimal SEO and performance, integrated Prisma for database management, Stripe for payments, and MapBox for interactive property maps. Implemented 3D virtual tours and mortgage calculation APIs.",
      results: "Increased property inquiries by 150%, reduced time-to-sale by 30%, and enabled the realty group to expand to 3 new markets. The virtual tour feature became a key differentiator in the local market.",
      technologies: ["Next.js", "Prisma", "Stripe", "MapBox", "Three.js", "PostgreSQL", "Vercel", "3D Virtual Tours"],
      detailImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    id: 6,
    title: "Learning Management System",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Learning Management System",
    tags: ["React", "Node.js", "Socket.io", "MySQL"],
    description: "Interactive e-learning platform with video streaming, live chat, progress tracking, gamification elements, and comprehensive assessment tools for educational institutions.",
    rating: 4.8,
    duration: "6 months",
    teamSize: "5 developers",
    views: "13.4K",
    githubLink: "https://github.com",
    caseStudyLink: "#",
    category: "Education",
    status: "Completed",
    year: "2022",
    caseStudy: {
      client: "State University Online",
      timeline: "June - November 2022",
      role: "Lead Developer",
      overview: "Interactive e-learning platform serving 15,000+ students with video streaming, live chat, progress tracking, gamification elements, and comprehensive assessment tools.",
      challenge: "The university needed to transition from in-person to hybrid learning while maintaining engagement and tracking student progress effectively across 200+ courses.",
      approach: "Developed a React application with Node.js backend, Socket.io for real-time communication, and MySQL for data management. Implemented gamification, video streaming, and automated assessment tools.",
      results: "Student engagement increased by 40% compared to their previous platform, with completion rates improving by 25%. Instructors reported 50% time savings in course management and grading.",
      technologies: ["React", "Node.js", "Socket.io", "MySQL", "Video Streaming", "Gamification", "WebRTC"],
      detailImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  }
];
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const Modal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  const caseStudy = project.caseStudy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pr-12">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden mb-8 h-64 md:h-80 bg-gray-100 relative">
            <Image
              src={caseStudy.detailImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Client</h3>
                <p className="text-gray-600 text-sm">{caseStudy.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Timeline</h3>
                <p className="text-gray-600 text-sm">{caseStudy.timeline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Role</h3>
                <p className="text-gray-600 text-sm">{caseStudy.role}</p>
              </div>
            </div>
          </div>

          {/* Project Sections */}
          <div className="space-y-8">
            {/* Overview */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Project Overview</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{caseStudy.overview}</p>
            </div>

            {/* Challenge */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Target className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Challenge</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
            </div>

            {/* Approach */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Approach & Solution</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{caseStudy.approach}</p>
            </div>

            {/* Results */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Results & Impact</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{caseStudy.results}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProjectCard remains the same, just replace <img> with <Image> from Next.js

const ProjectCard = ({ project, onCaseStudyClick }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            project.status === 'Completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {project.status}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-black/70 text-white rounded-full">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-gray-500 font-medium">{project.year}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="mb-4">
          <StarRating rating={project.rating} />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <Calendar className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-900">{project.duration}</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
          <div className="text-center">
            <Users className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-900">{project.teamSize}</div>
            <div className="text-xs text-gray-500">Team Size</div>
          </div>
          <div className="text-center">
            <Eye className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-900">{project.views}</div>
            <div className="text-xs text-gray-500">Views</div>
          </div>
        </div>
        <div className="flex gap-3">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <button
            onClick={() => onCaseStudyClick(project)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Case Study
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectsPerPage = 6;

  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projectsData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const handleCaseStudyClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) handleCloseModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-6 h-6 text-blue-600" />
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Portfolio Showcase
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Showcasing my best work across various industries and technologies. Each project 
            demonstrates my technical expertise, problem-solving approach, and commitment to 
            delivering exceptional user experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onCaseStudyClick={handleCaseStudyClick}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={goToPrevious} disabled={currentPage === 1} className="...">Previous</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => goToPage(i + 1)} className="...">{i + 1}</button>
            ))}
            <button onClick={goToNext} disabled={currentPage === totalPages} className="...">Next</button>
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, projectsData.length)} of {projectsData.length} projects
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} project={selectedProject} />
    </section>
  );
};

export default FeaturedProjects;