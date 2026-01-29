import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Mail,
  MapPin,
  Globe,
  ChevronDown,
  ExternalLink,
  Download,
} from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";

// Resume data
const resumeData = {
  name: "Oluwatomiwa Ojo",
  title: "Full-Stack Developer",
  location: "Nigeria",
  email: "waynecodes@outlook.com",
  website: "codethiefx.dev",
  summary:
    "Passionate full-stack developer with expertise in building modern web and mobile applications. Specialized in React, Next.js, React Native, and blockchain technologies.",

  experience: [
    {
      id: 1,
      role: "Full-Stack Developer",
      company: "Freelance",
      period: "2022 - Present",
      location: "Remote",
      description: [
        "Developed 14+ production applications for clients across fintech, Web3, and e-commerce sectors",
        "Built DeFi trading platforms with multi-chain support and MEV protection",
        "Created mobile apps with React Native for iOS and Android platforms",
        "Implemented modern UI/UX designs with smooth animations and responsive layouts",
      ],
      tech: [
        "React",
        "Next.js",
        "React Native",
        "Node.js",
        "TypeScript",
        "Solidity",
      ],
    },
    {
      id: 2,
      role: "Frontend Developer",
      company: "Various Projects",
      period: "2021 - 2022",
      location: "Remote",
      description: [
        "Built responsive web applications using React and modern CSS frameworks",
        "Collaborated with design teams to implement pixel-perfect UIs",
        "Optimized performance and accessibility across projects",
      ],
      tech: ["React", "JavaScript", "Tailwind CSS", "GSAP"],
    },
  ],

  education: [
    {
      id: 1,
      degree: "Computer Science",
      school: "Self-Taught & Online Courses",
      period: "2020 - Present",
      details:
        "Continuous learning through online platforms, documentation, and hands-on projects",
    },
  ],

  skills: {
    frontend: ["React.js", "Next.js", "TypeScript", "Angular", "Remix.js"],
    mobile: ["React Native", "Expo", "Flutter/Dart"],
    styling: ["Tailwind CSS", "Sass", "CSS Modules", "Framer Motion"],
    backend: ["Node.js", "Express.js", "Python", "REST APIs"],
    database: ["MongoDB", "PostgreSQL", "Supabase", "Firebase"],
    tools: ["Git", "Docker", "Figma", "Postman", "CI/CD"],
  },

  achievements: [
    {
      id: 1,
      title: "14+ Production Apps",
      desc: "Built and deployed across web and mobile",
    },
    {
      id: 2,
      title: "Web3 Expertise",
      desc: "DeFi platforms, NFT marketplaces, blockchain integration",
    },
    {
      id: 3,
      title: "Open Source",
      desc: "Active contributor to developer communities",
    },
  ],
};

const Section = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 
                   rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
      >
        <Icon className="w-5 h-5 text-blue-500" />
        <span className="font-semibold text-gray-800 dark:text-white flex-1 text-left">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 pl-11">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InteractiveResume = ({ isMaximized }) => {
  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-gray-200/80 dark:bg-gray-800/80 
                      backdrop-blur border-b border-gray-300 dark:border-gray-700"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110" />
            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-110" />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:brightness-110" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Briefcase className="w-4 h-4" />
          <span className="text-sm font-medium">Interactive Resume</span>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-1 bg-blue-500 hover:bg-blue-600 
                         text-white text-xs font-medium rounded-full transition-colors"
        >
          <Download className="w-3 h-3" />
          Download PDF
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-br from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div
              className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center 
                          text-3xl font-bold"
            >
              TO
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{resumeData.name}</h1>
              <p className="text-white/90 text-lg mb-2">{resumeData.title}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {resumeData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" /> {resumeData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" /> {resumeData.website}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-white/90 text-sm leading-relaxed">
            {resumeData.summary}
          </p>
        </motion.div>

        {/* Experience Section */}
        <Section title="Experience" icon={Briefcase}>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-blue-500 text-sm">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.period} • {exp.location}
                  </div>
                </div>
                <ul className="space-y-1 mb-3">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 dark:text-gray-300 flex gap-2"
                    >
                      <span className="text-blue-500">•</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 
                                           text-blue-600 dark:text-blue-400 text-xs rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section title="Skills" icon={Code}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(resumeData.skills).map(
              ([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3"
                >
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 
                                                text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </Section>

        {/* Education Section */}
        <Section title="Education" icon={GraduationCap}>
          {resumeData.education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {edu.degree}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.period}
                </span>
              </div>
              <p className="text-blue-500 text-sm mb-1">{edu.school}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {edu.details}
              </p>
            </div>
          ))}
        </Section>

        {/* Achievements Section */}
        <Section title="Achievements" icon={Award}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {resumeData.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-linear-to-br from-yellow-400/20 to-orange-400/20 
                         dark:from-yellow-400/10 dark:to-orange-400/10 
                         border border-yellow-400/30 rounded-lg p-3 text-center"
              >
                <Award className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {achievement.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default WindowWrapper(InteractiveResume, "resume");
