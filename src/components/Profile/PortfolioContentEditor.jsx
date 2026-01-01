"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Palette,
    Eye,
    EyeOff,
    Save,
    Info,
    Briefcase,
    FolderOpen,
    Code,
    Mail,
    Plus,
    Check,
    Copy,
    Trash2,
    Loader,
    ExternalLink,
    X,
    Building,
    Calendar,
    Link as LinkIcon,
    Phone,
    Github,
    Linkedin,
    Globe,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { MonthPicker } from "@/components/ui/calendar";

const THEMES = [
    { id: "executive-professional", name: "Executive Professional", color: "bg-blue-600" },
    { id: "modern-magazine", name: "Modern Magazine", color: "bg-purple-600" },
    { id: "pure-minimalism", name: "Pure Minimalism", color: "bg-gray-400" },
    { id: "bento-intelligence", name: "Smart Grid", color: "bg-indigo-600" },
    { id: "editorial-narrative", name: "Editorial Story", color: "bg-amber-600" },
    { id: "creative-studio", name: "Creative Studio", color: "bg-pink-600" },
    { id: "the-journey", name: "The Journey", color: "bg-rose-600" },
    { id: "proof-of-work", name: "Data Driven", color: "bg-emerald-600" },
    { id: "tech-showcase", name: "Tech Showcase", color: "bg-cyan-600" },
    { id: "ultra-modern", name: "Ultra Modern", color: "bg-fuchsia-600" },
    { id: "corporate-executive", name: "Corporate Executive", color: "bg-slate-700" },
    { id: "artistic-soul", name: "Artistic Soul", color: "bg-orange-500" },
    { id: "startup-founder", name: "Startup Founder", color: "bg-violet-600" },
];

const SECTION_TABS = [
    { id: "about", label: "About", icon: Info },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "skills", label: "Skills", icon: Code },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "custom", label: "Custom Sections", icon: Plus },
];

export default function PortfolioContentEditor({ user, onUpdate }) {
    const { refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    const [config, setConfig] = useState({
        themeId: "executive-professional",
        isPublic: false,
    });

    const [content, setContent] = useState({
        about: "",
        experiences: [], // [{ company, organization, startDate, endDate, currentlyWorking, description }]
        manualProjects: [], // [{ name, description, techStack, githubUrl, liveUrl }]
        skills: [], // ["React", "Node.js", ...]
        contact: {
            phone: "",
            email: "",
            github: "",
            linkedin: "",
            website: "",
            customLinks: [], // [{ label, url }]
        },
        customSections: [],
    });

    const [skillInput, setSkillInput] = useState("");

    useEffect(() => {
        if (user) {
            console.log("👤 Loading user data:", user);
            console.log("📋 Portfolio experiences:", user.profile?.portfolio?.experiences);
            console.log("📋 Portfolio manual projects:", user.profile?.portfolio?.manualProjects);
            console.log("📋 Custom sections:", user.profile?.portfolio?.customSections);

            setConfig({
                themeId: user.profile?.portfolio?.themeId || "executive-professional",
                isPublic: user.profile?.portfolio?.isPublic || false,
            });

            setContent({
                about: user.about || user.profile?.bio || "",
                experiences: user.profile?.portfolio?.experiences || [],
                manualProjects: user.profile?.portfolio?.manualProjects || [],
                skills: user.profile?.skills || [],
                contact: {
                    phone: user.profile?.phone || "",
                    email: user.email || "",
                    github: user.profile?.portfolioLinks?.github || "",
                    linkedin: user.profile?.portfolioLinks?.linkedin || "",
                    website: user.profile?.portfolioLinks?.website || "",
                    customLinks: user.profile?.portfolio?.customLinks || [],
                },
                customSections: user.profile?.portfolio?.customSections || [],
            });
        }
    }, [user]);

    const isSavingRef = useRef(false);

    const handleSave = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (isSavingRef.current || loading) return;

        isSavingRef.current = true;
        setLoading(true);

        try {
            console.log("🚀 PREPARING SAVE PAYLOAD");
            console.log("Current Content State:", content);
            console.log("Experiences to save:", content.experiences);

            const payload = {
                about: content.about,
                email: content.contact.email,
                profile: {
                    // REMOVED ...user.profile to prevent overwriting backend data with stale frontend state
                    // The backend now supports partial merges for the profile object.
                    skills: content.skills,
                    phone: content.contact.phone,
                    portfolioLinks: {
                        github: content.contact.github,
                        linkedin: content.contact.linkedin,
                        website: content.contact.website,
                    },
                    portfolio: {
                        themeId: config.themeId,
                        isPublic: config.isPublic,
                        experiences: content.experiences,
                        manualProjects: content.manualProjects,
                        customLinks: content.contact.customLinks,
                        customSections: content.customSections,
                    },
                },
            };

            console.log("📦 FINAL PAYLOAD:", JSON.stringify(payload, null, 2));

            const response = await api.patch("/users/me", payload);

            if (response.data.success) {
                toast.success("Portfolio saved successfully!");
                await refreshUser();
                if (onUpdate) onUpdate(response.data.data);
            }
        } catch (error) {
            console.error("Save failed:", error);
            toast.error(error.response?.data?.message || "Failed to save portfolio");
        } finally {
            setLoading(false);
            isSavingRef.current = false;
        }
    };

    // Experience handlers
    const addExperience = () => {
        if (content.experiences.length >= 5) {
            toast.error("Maximum 5 experiences allowed");
            return;
        }
        setContent({
            ...content,
            experiences: [...content.experiences, {
                company: "",
                organization: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
                description: ""
            }],
        });
    };

    const removeExperience = (index) => {
        const newExperiences = content.experiences.filter((_, i) => i !== index);
        setContent({ ...content, experiences: newExperiences });
    };

    const updateExperience = (index, field, value) => {
        const newExperiences = [...content.experiences];

        // If toggling "currently working", clear end date
        if (field === "currentlyWorking" && value === true) {
            newExperiences[index].endDate = "";
        }

        newExperiences[index][field] = value;
        setContent({ ...content, experiences: newExperiences });
    };

    // Format date for display  
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const [year, month] = dateString.split("-");
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    // Project handlers
    const addProject = () => {
        if (content.manualProjects.length >= 8) {
            toast.error("Maximum 8 manual projects allowed");
            return;
        }
        setContent({
            ...content,
            manualProjects: [...content.manualProjects, { name: "", description: "", techStack: "", githubUrl: "", liveUrl: "" }],
        });
    };

    const removeProject = (index) => {
        const newProjects = content.manualProjects.filter((_, i) => i !== index);
        setContent({ ...content, manualProjects: newProjects });
    };

    const updateProject = (index, field, value) => {
        const newProjects = [...content.manualProjects];
        newProjects[index][field] = value;
        setContent({ ...content, manualProjects: newProjects });
    };

    // Skills handlers
    const addSkill = () => {
        const trimmed = skillInput.trim();
        if (!trimmed) return;
        if (content.skills.includes(trimmed)) {
            toast.error("Skill already added");
            return;
        }
        setContent({ ...content, skills: [...content.skills, trimmed] });
        setSkillInput("");
    };

    const removeSkill = (skillToRemove) => {
        setContent({ ...content, skills: content.skills.filter(s => s !== skillToRemove) });
    };

    // Contact custom link handlers
    const addCustomLink = () => {
        setContent({
            ...content,
            contact: {
                ...content.contact,
                customLinks: [...content.contact.customLinks, { label: "", url: "" }],
            },
        });
    };

    const removeCustomLink = (index) => {
        const newLinks = content.contact.customLinks.filter((_, i) => i !== index);
        setContent({ ...content, contact: { ...content.contact, customLinks: newLinks } });
    };

    const updateCustomLink = (index, field, value) => {
        const newLinks = [...content.contact.customLinks];
        newLinks[index][field] = value;
        setContent({ ...content, contact: { ...content.contact, customLinks: newLinks } });
    };

    // Custom sections handlers
    const addCustomSection = () => {
        if (content.customSections.length >= 5) {
            toast.error("Maximum 5 custom sections allowed");
            return;
        }
        setContent({
            ...content,
            customSections: [...content.customSections, { title: "", content: "" }],
        });
    };

    const removeCustomSection = (index) => {
        const newSections = content.customSections.filter((_, i) => i !== index);
        setContent({ ...content, customSections: newSections });
    };

    const updateCustomSection = (index, field, value) => {
        const newSections = [...content.customSections];
        newSections[index][field] = value;
        setContent({ ...content, customSections: newSections });
    };

    const renderSectionEditor = () => {
        switch (activeSection) {
            case "about":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                About You
                            </label>
                            <p className="text-sm text-slate-500 mb-3">
                                Tell visitors who you are and what you do
                            </p>
                            <textarea
                                value={content.about}
                                onChange={(e) => setContent({ ...content, about: e.target.value })}
                                rows={6}
                                maxLength={500}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="I'm a full-stack developer passionate about creating beautiful web applications..."
                            />
                            <div className="text-right text-xs text-slate-400 mt-1">
                                {content.about.length}/500 characters
                            </div>
                        </div>
                    </div>
                );

            case "experience":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Work Experience</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Add your professional experience, hackathons, or achievements
                                </p>
                            </div>
                            <button
                                onClick={addExperience}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-semibold"
                            >
                                <Plus className="w-4 h-4" />
                                Add Experience ({content.experiences.length}/5)
                            </button>
                        </div>

                        {content.experiences.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">No experience added yet</p>
                                <p className="text-sm text-slate-400 mt-1">All fields are optional</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {content.experiences.map((exp, idx) => (
                                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-slate-700">Experience #{idx + 1}</h4>
                                            <button
                                                onClick={() => removeExperience(idx)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    <Building className="w-3 h-3 inline mr-1" />
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(idx, "company", e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Google, Microsoft..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Organization/Event
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.organization}
                                                    onChange={(e) => updateExperience(idx, "organization", e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder="MLH Hackathon, Conference..."
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                <Calendar className="w-3 h-3 inline mr-1" />
                                                Duration
                                            </label>

                                            <div className="grid grid-cols-2 gap-4">
                                                {/* Start Date */}
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                                        Start Date
                                                    </label>
                                                    <MonthPicker
                                                        value={exp.startDate || ""}
                                                        onChange={(value) => updateExperience(idx, "startDate", value)}
                                                        placeholder="Select start month"
                                                    />
                                                </div>

                                                {/* End Date */}
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-600 mb-2">
                                                        End Date
                                                    </label>
                                                    <MonthPicker
                                                        value={exp.endDate || ""}
                                                        onChange={(value) => updateExperience(idx, "endDate", value)}
                                                        placeholder="Select end month"
                                                        disabled={exp.currentlyWorking}
                                                    />
                                                </div>
                                            </div>

                                            {/* Currently Working Checkbox */}
                                            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={exp.currentlyWorking || false}
                                                    onChange={(e) => updateExperience(idx, "currentlyWorking", e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                                />
                                                <span className="group-hover:text-blue-600 transition-colors">
                                                    I currently work here
                                                </span>
                                            </label>

                                            {/* Duration Preview */}
                                            {exp.startDate && (
                                                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                    <p className="text-sm text-blue-800 font-medium">
                                                        Preview: {formatDate(exp.startDate)} - {exp.currentlyWorking ? "Present" : (exp.endDate ? formatDate(exp.endDate) : "Not specified")}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                value={exp.description}
                                                onChange={(e) => updateExperience(idx, "description", e.target.value)}
                                                rows={3}
                                                maxLength={500}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                                placeholder="Describe your role, achievements, or what you learned..."
                                            />
                                            <div className="text-right text-xs text-slate-400 mt-1">
                                                {exp.description.length}/500
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "projects":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Manual Projects</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Add personal projects. Platform projects will also appear automatically.
                                </p>
                            </div>
                            <button
                                onClick={addProject}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-semibold"
                            >
                                <Plus className="w-4 h-4" />
                                Add Project ({content.manualProjects.length}/8)
                            </button>
                        </div>

                        {content.manualProjects.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">No manual projects added</p>
                                <p className="text-sm text-slate-400 mt-1">All fields are optional</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {content.manualProjects.map((project, idx) => (
                                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-slate-700">Project #{idx + 1}</h4>
                                            <button
                                                onClick={() => removeProject(idx)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Project Name
                                            </label>
                                            <input
                                                type="text"
                                                value={project.name}
                                                onChange={(e) => updateProject(idx, "name", e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="My Awesome Project"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => updateProject(idx, "description", e.target.value)}
                                                rows={3}
                                                maxLength={500}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                                placeholder="What does this project do? What problems does it solve?"
                                            />
                                            <div className="text-right text-xs text-slate-400 mt-1">
                                                {project.description.length}/500
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Status
                                                </label>
                                                <select
                                                    value={project.status || "active"}
                                                    onChange={(e) => updateProject(idx, "status", e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="paused">Paused</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Priority
                                                </label>
                                                <select
                                                    value={project.priority || "medium"}
                                                    onChange={(e) => updateProject(idx, "priority", e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Completion (%)
                                                </label>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={project.progress || 0}
                                                        onChange={(e) => updateProject(idx, "progress", parseInt(e.target.value))}
                                                        className="w-full"
                                                    />
                                                    <span className="text-sm font-medium text-slate-700 w-12">
                                                        {project.progress || 0}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Deadline
                                                </label>
                                                <input
                                                    type="date"
                                                    value={project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateProject(idx, "deadline", e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                <Code className="w-3 h-3 inline mr-1" />
                                                Tech Stack
                                            </label>
                                            <input
                                                type="text"
                                                value={project.techStack}
                                                onChange={(e) => updateProject(idx, "techStack", e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="React, Node.js, MongoDB, AWS..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    <Github className="w-3 h-3 inline mr-1" />
                                                    GitHub URL
                                                </label>
                                                <input
                                                    type="url"
                                                    value={project.githubUrl}
                                                    onChange={(e) => updateProject(idx, "githubUrl", e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder="https://github.com/..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    <Globe className="w-3 h-3 inline mr-1" />
                                                    Live URL
                                                </label>
                                                <input
                                                    type="url"
                                                    value={project.liveUrl}
                                                    onChange={(e) => updateProject(idx, "liveUrl", e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder="https://myproject.com"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "skills":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Your Skills
                            </label>
                            <p className="text-sm text-slate-500 mb-3">
                                Type a skill and press Enter to add it
                            </p>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addSkill();
                                        }
                                    }}
                                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Type a skill and press Enter..."
                                />
                                <button
                                    onClick={addSkill}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    Add
                                </button>
                            </div>

                            {content.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {content.skills.map((skill, idx) => (
                                        <div
                                            key={idx}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium group hover:bg-blue-100 transition-colors"
                                        >
                                            {skill}
                                            <button
                                                onClick={() => removeSkill(skill)}
                                                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs text-slate-400 mt-2">
                                {content.skills.length} skills added
                            </p>
                        </div>
                    </div>
                );

            case "contact":
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={content.contact.phone}
                                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={content.contact.email}
                                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    <Github className="w-4 h-4 inline mr-1" />
                                    GitHub
                                </label>
                                <input
                                    type="url"
                                    value={content.contact.github}
                                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, github: e.target.value } })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    <Linkedin className="w-4 h-4 inline mr-1" />
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    value={content.contact.linkedin}
                                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, linkedin: e.target.value } })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    <Globe className="w-4 h-4 inline mr-1" />
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={content.contact.website}
                                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, website: e.target.value } })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-semibold text-slate-900">
                                    <LinkIcon className="w-4 h-4 inline mr-1" />
                                    Custom Links
                                </label>
                                <button
                                    onClick={addCustomLink}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    + Add Link
                                </button>
                            </div>

                            {content.contact.customLinks.map((link, idx) => (
                                <div key={idx} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={link.label}
                                        onChange={(e) => updateCustomLink(idx, "label", e.target.value)}
                                        className="w-1/3 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Label (e.g., Portfolio)"
                                    />
                                    <input
                                        type="url"
                                        value={link.url}
                                        onChange={(e) => updateCustomLink(idx, "url", e.target.value)}
                                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://..."
                                    />
                                    <button
                                        onClick={() => removeCustomLink(idx)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "custom":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Custom Sections</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Add unique content blocks with custom titles
                                </p>
                            </div>
                            <button
                                onClick={addCustomSection}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-semibold"
                            >
                                <Plus className="w-4 h-4" />
                                Add Section ({content.customSections.length}/5)
                            </button>
                        </div>

                        {content.customSections.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                                <Plus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">No custom sections yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {content.customSections.map((section, idx) => (
                                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Section Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={section.title}
                                                    onChange={(e) => updateCustomSection(idx, "title", e.target.value)}
                                                    maxLength={100}
                                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Why You Should Hire Me"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeCustomSection(idx)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-7"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                Content
                                            </label>
                                            <textarea
                                                value={section.content}
                                                onChange={(e) => updateCustomSection(idx, "content", e.target.value)}
                                                rows={6}
                                                maxLength={2000}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                                placeholder="Write your custom content here..."
                                            />
                                            <div className="text-right text-xs text-slate-400 mt-1">
                                                {section.content.length}/2000
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Palette className="w-6 h-6 text-blue-600" />
                        Portfolio Content Editor
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Manage your portfolio content section by section
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setConfig({ ...config, isPublic: !config.isPublic })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${config.isPublic
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                            }`}
                    >
                        {config.isPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {config.isPublic ? "Public" : "Private"}
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Portfolio Code
                            </>
                        )}
                    </button>
                </div>
            </div>



            {/* Section Tabs & Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50">
                    <div className="flex overflow-x-auto">
                        {SECTION_TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeSection === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSection(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all ${isActive
                                        ? "border-blue-600 text-blue-600 bg-white"
                                        : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="p-8">{renderSectionEditor()}</div>
            </div>

        </div>
    );
}
