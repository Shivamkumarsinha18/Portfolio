import './App.css'
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { SiCplusplus, SiHtml5, SiCss3, SiJavascript, SiPython, SiReact, SiTypescript, SiTailwindcss, SiDocker, SiFirebase, SiMongodb, SiGit, SiGithub, SiJupyter, SiIntellijidea, SiEclipseide } from "react-icons/si";
import { FaMobileAlt, FaUsers, FaLightbulb, FaClock, FaSyncAlt, FaHandshake, FaCode, FaDatabase, FaTools, FaMapMarkerAlt, FaFingerprint, FaUserShield, FaSync, FaChartBar, FaFileExcel, FaAward, FaUsersCog, FaUserGraduate, FaComments, FaVideo, FaGift, FaBook, FaCalendarAlt, FaReact, FaAndroid, FaPhone, FaLinkedin, FaInstagram, FaGithub, FaUser, FaProjectDiagram, FaCertificate } from "react-icons/fa";
import profilePic from './assets/profile.jpg';

// Dynamically import all certificate images using Vite's import.meta.glob
const images = import.meta.glob('./assets/certificates/*.jpg', { eager: true, as: 'url' });

const certificateImages = Object.entries(images).map(([path, url]) => ({
  url: url as string,
  name: path.split('/').pop()?.replace(/\.jpg$/, '').replace(/_/g, ' ') || '',
}));

// Modal component for zoom functionality
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl max-h-[90vh] overflow-auto bg-[#2d2d30] rounded-xl border border-gray-700 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold z-10 bg-[#2d2d30] rounded-full w-8 h-8 flex items-center justify-center border border-gray-600"
          >
            ×
          </button>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const CertificateGallery = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificateImages[0] | null>(null);

  return (
    <section id="certificates" className="min-h-screen bg-[#252425] py-16 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-left text-gray-100 mb-12 tracking-wide">Certificates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {certificateImages.map((img) => (
          <motion.div
            key={img.url}
            className="rounded-xl overflow-hidden shadow-lg bg-[#2d2d30] border border-gray-700 p-0 transition-transform duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            onClick={() => setSelectedCertificate(img)}
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-72 object-cover transition-all duration-500 border-b border-gray-700"
            />
            <div className="p-4">
              <p className="text-gray-300 text-left text-lg font-medium">
                {img.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selectedCertificate} onClose={() => setSelectedCertificate(null)}>
        {selectedCertificate && (
          <div className="p-6">
            <img
              src={selectedCertificate.url}
              alt={selectedCertificate.name}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            <h3 className="text-2xl font-bold text-gray-100 mt-4 text-center">
              {selectedCertificate.name}
            </h3>
          </div>
        )}
      </Modal>
    </section>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-[#232224] bg-opacity-95 shadow-md border-b border-gray-800">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
      <span className="text-xl font-bold text-gray-100 tracking-wide flex items-center gap-2"><FaUser /> Shivam</span>
      <ul className="flex gap-6 md:gap-10 items-center">
        <li><a href="#about" className="flex items-center gap-1 text-gray-300 hover:text-white transition"><FaUser /> About</a></li>
        <li><a href="#skills" className="flex items-center gap-1 text-gray-300 hover:text-white transition"><FaTools /> Skills</a></li>
        <li><a href="#projects" className="flex items-center gap-1 text-gray-300 hover:text-white transition"><FaProjectDiagram /> Projects</a></li>
        <li><a href="#certificates" className="flex items-center gap-1 text-gray-300 hover:text-white transition"><FaCertificate /> Certificates</a></li>
        <li><a href="#contact" className="flex items-center gap-1 text-gray-300 hover:text-white transition"><FaPhone /> Contact</a></li>
      </ul>
    </div>
  </nav>
);

const Hero = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <section id="about" className="flex flex-col items-start justify-center min-h-[60vh] bg-[#252425] py-24 pt-32 md:pt-40 px-4 md:px-16 relative">
      <motion.img
        src={profilePic}
        alt="Shivam Kumar Sinha"
        className="w-36 h-36 rounded-full object-cover border-4 border-[#2d2d30] shadow mb-6 cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => setShowProfileModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-gray-100 mb-4 tracking-tight text-left"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Shivam Kumar Sinha
      </motion.h1>
      <motion.h2
        className="text-2xl md:text-3xl font-medium text-gray-400 mb-6 text-left"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        BCA Graduate | Aspiring Software Developer | Android Enthusiast | Problem Solver
      </motion.h2>
      <motion.ul
        className="max-w-2xl text-lg text-gray-300 mb-8 text-left list-disc list-inside space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <li>BCA Graduate from Amity University, Patna</li>
        <li>Passionate about building innovative software and Android apps</li>
        <li>Enjoys solving real-world problems with code</li>
        <li>Strong experience in Java, Python, C++, Firebase, and Android Studio</li>
        <li>Continuously learning and exploring new technologies</li>
      </motion.ul>

      <Modal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)}>
        <div className="p-8 text-center">
          <img
            src={profilePic}
            alt="Shivam Kumar Sinha"
            className="w-64 h-64 rounded-full object-cover border-4 border-[#2d2d30] shadow-lg mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Shivam Kumar Sinha</h2>
          <p className="text-xl text-gray-300 mb-4">BCA Graduate | Software Developer</p>
          <div className="text-gray-400 space-y-2">
            <p>📍 Amity University, Patna</p>
            <p>💻 Android Development Enthusiast</p>
            <p>🚀 Problem Solver & Innovator</p>
          </div>
        </div>
      </Modal>
    </section>
  );
};

const projects = [
  {
    title: "GeoPulse",
    icon: <FaMapMarkerAlt className="text-[#3DDC84] text-3xl" />, // Geofencing icon
    description: [
      "Automated Campus Attendance System for Amity University, Patna.",
      "Combines GPS geofencing and biometric authentication for secure, proxy-proof attendance.",
      "Real-time data sync for students, teachers, and admins.",
      "Generates automated reports and Excel exports."
    ],
    features: [
      { icon: <FaMapMarkerAlt className="text-[#3DDC84]" title="Geofencing" />, tooltip: "Geofencing" },
      { icon: <FaFingerprint className="text-[#FFCA28]" title="Biometric" />, tooltip: "Biometric" },
      { icon: <FaUserShield className="text-[#61DAFB]" title="Role-based" />, tooltip: "Role-based" },
      { icon: <FaSync className="text-[#06B6D4]" title="Realtime" />, tooltip: "Realtime" },
      { icon: <FaChartBar className="text-[#F7DF1E]" title="Reports" />, tooltip: "Reports" },
      { icon: <FaFileExcel className="text-[#21A366]" title="Excel Export" />, tooltip: "Excel Export" },
    ],
    link: "https://www.linkedin.com/posts/shivam-kumar-sinha-55aa9b273_androiddevelopment-firebase-geofencing-activity-7334648541899808770-W_Pg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELnDlYB3PNyHjT642Na4O1hlxfci9TmPI4",
    tech: [
      { icon: <FaAndroid className="text-[#3DDC84]" title="Android" />, tooltip: "Android" },
      { icon: <FaCode className="text-orange-500" title="Java" />, tooltip: "Java" },
      { icon: <FaDatabase className="text-yellow-400" title="Firebase" />, tooltip: "Firebase" },
    ],
  },
  {
    title: "MentorConnect",
    icon: <FaUsersCog className="text-[#0A66C2] text-3xl" />, // Mentorship icon
    description: [
      "Student-Alumni Mentorship Platform built for Amity University Hackathon.",
      "Matches students with alumni mentors using intelligent algorithms.",
      "Supports real-time chat, video calls, and session scheduling.",
      "Gamified XP/rewards, resource library, and event management."
    ],
    features: [
      { icon: <FaUserGraduate className="text-[#3DDC84]" title="Matching" />, tooltip: "Matching" },
      { icon: <FaComments className="text-[#FFCA28]" title="Chat" />, tooltip: "Chat" },
      { icon: <FaVideo className="text-[#61DAFB]" title="Video" />, tooltip: "Video" },
      { icon: <FaGift className="text-[#F7DF1E]" title="Rewards" />, tooltip: "Rewards" },
      { icon: <FaBook className="text-[#21A366]" title="Library" />, tooltip: "Library" },
      { icon: <FaCalendarAlt className="text-[#06B6D4]" title="Events" />, tooltip: "Events" },
    ],
    link: "https://www.linkedin.com/posts/shivam-kumar-sinha-55aa9b273_hackathon-thirdplace-mentorconnect-activity-7334646930691534849-Folq?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELnDlYB3PNyHjT642Na4O1hlxfci9TmPI4",
    tech: [
      { icon: <FaReact className="text-[#61DAFB]" title="React" />, tooltip: "React" },
      { icon: <FaCode className="text-blue-500" title="Node.js" />, tooltip: "Node.js" },
      { icon: <FaDatabase className="text-green-500" title="MongoDB" />, tooltip: "MongoDB" },
    ],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);

  return (
    <section id="projects" className="py-16 bg-[#252425] px-4 md:px-16">
      <h2 className="text-4xl font-bold text-left text-gray-100 mb-12 tracking-wide flex items-center gap-2"><FaAward className="text-yellow-400" /> Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {projects.map((proj: typeof projects[number]) => (
          <motion.div
            key={proj.title}
            className="block rounded-xl bg-[#2d2d30] border border-gray-700 shadow-lg p-6 transition-transform duration-300 group text-left cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            onClick={() => setSelectedProject(proj)}
          >
            <div className="flex items-center gap-3 mb-4">
              {proj.icon}
              <h3 className="text-2xl font-semibold text-gray-100 group-hover:text-gray-300 transition-colors">{proj.title}</h3>
            </div>
            <ul className="mb-4 text-gray-300 text-sm list-disc list-inside space-y-1">
              {proj.description.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className="flex gap-4 justify-start mb-4">
              {proj.features.map((f: { icon: React.ReactElement; tooltip: string }, i: number) => (
                <span key={i} title={f.tooltip} className="text-2xl">{f.icon}</span>
              ))}
            </div>
            <div className="flex gap-3 justify-start items-center flex-wrap mb-4">
              {proj.tech.map((t: { icon: React.ReactElement; tooltip: string }, i: number) => (
                <span key={i} title={t.tooltip} className="flex items-center gap-2 text-xl">
                  {t.icon}
                  <span className="text-gray-300 text-base">{t.tooltip}</span>
                </span>
              ))}
            </div>
            <div className="flex justify-start">
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                View Project
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="p-8 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              {selectedProject.icon}
              <h2 className="text-3xl font-bold text-gray-100">{selectedProject.title}</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Description</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                {selectedProject.description.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.features.map((f: { icon: React.ReactElement; tooltip: string }, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <span className="text-xl">{f.icon}</span>
                    <span>{f.tooltip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProject.tech.map((t: { icon: React.ReactElement; tooltip: string }, i: number) => (
                  <span key={i} className="flex items-center gap-2 px-3 py-2 bg-[#353535] rounded-lg text-gray-300">
                    <span className="text-lg">{t.icon}</span>
                    <span>{t.tooltip}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                View Project
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

const skills = [
  {
    category: "Languages",
    items: [
      { name: "C", icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "Java", icon: <FaCode className="text-orange-500" /> },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "HTML", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "CSS", icon: <SiCss3 className="text-[#1572B6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
    ],
  },
  {
    category: "Mobile Development",
    items: [
      { name: "Android", icon: <FaAndroid className="text-[#3DDC84]" /> },
      { name: "Java", icon: <FaCode className="text-orange-500" /> },
      { name: "XML", icon: <FaCode className="text-gray-300" /> },
      { name: "Android Studio", icon: <FaMobileAlt className="text-[#3DDC84]" /> },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "GitHub", icon: <SiGithub className="text-[#181717]" /> },
      { name: "Android Studio", icon: <FaMobileAlt className="text-[#3DDC84]" /> },
      { name: "VS Code", icon: <FaCode className="text-[#007ACC]" /> },
      { name: "Jupyter Notebook", icon: <SiJupyter className="text-[#F37626]" /> },
      { name: "IntelliJ IDEA", icon: <SiIntellijidea className="text-[#000000]" /> },
      { name: "Eclipse", icon: <SiEclipseide className="text-[#2C2255]" /> },
      { name: "DSA", icon: <FaLightbulb className="text-yellow-400" /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "API", icon: <FaCode className="text-gray-300" /> },
      { name: "Kubernetes", icon: <FaCode className="text-blue-400" /> },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Team Work", icon: <FaHandshake className="text-green-400" /> },
      { name: "Problem Solving", icon: <FaLightbulb className="text-blue-400" /> },
      { name: "Time Management", icon: <FaClock className="text-yellow-500" /> },
      { name: "Adaptability", icon: <FaSyncAlt className="text-orange-400" /> },
      { name: "Communication", icon: <FaUsers className="text-purple-400" /> },
    ],
  },
];

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<{ category: string; items: typeof skills[0]['items'] } | null>(null);

  return (
    <section id="skills" className="py-16 bg-[#252425] px-4 md:px-16">
      <h2 className="text-4xl font-bold text-left text-gray-100 mb-12 tracking-wide">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {skills.map((cat) => (
                  <motion.div
          key={cat.category}
          className="rounded-xl bg-[#2d2d30] border border-gray-700 shadow-lg p-6 flex flex-col items-start transition-transform duration-300 cursor-pointer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          onClick={() => setSelectedSkill({ category: cat.category, items: cat.items })}
        >
          <h3 className="text-2xl font-semibold text-gray-100 mb-4 text-left">{cat.category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {cat.items.map(item => (
              <div key={item.name} className="flex flex-col items-center justify-center p-3 bg-[#353535] rounded-lg">
                <span className="text-3xl mb-2">{item.icon}</span>
                <span className="text-gray-300 text-sm font-medium text-center leading-tight">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)}>
        {selectedSkill && (
          <div className="p-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">{selectedSkill.category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {selectedSkill.items.map(item => (
                <div key={item.name} className="flex flex-col items-center p-4 bg-[#353535] rounded-lg">
                  <span className="text-5xl mb-3">{item.icon}</span>
                  <span className="text-gray-300 text-lg font-medium text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

const Contact = () => {
  const [showContactProfileModal, setShowContactProfileModal] = useState(false);

  return (
    <section id="contact" className="py-12 bg-[#252425] px-4 md:px-16">
      <h2 className="text-3xl font-bold text-left text-gray-100 mb-8 tracking-wide">Contact</h2>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <motion.img
          src={profilePic}
          alt="Shivam Kumar Sinha"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#2d2d30] shadow mb-4 md:mb-0 cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => setShowContactProfileModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-lg text-gray-300">
            <FaPhone className="text-green-400 text-2xl" />
            <span>+91 9304332221</span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-300">
            <FaLinkedin className="text-blue-400 text-2xl" />
            <a href="https://www.linkedin.com/in/shivam-kumar-sinha-55aa9b273/" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/shivam-kumar-sinha-55aa9b273</a>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-300">
            <FaGithub className="text-white text-2xl" />
            <a href="https://github.com/Shivamkumarsinha18" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/Shivamkumarsinha18</a>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-300">
            <FaInstagram className="text-pink-400 text-2xl" />
            <a href="https://www.instagram.com/shkrsin/" target="_blank" rel="noopener noreferrer" className="hover:underline">instagram.com/shkrsin</a>
          </div>
        </div>
      </div>

      <Modal isOpen={showContactProfileModal} onClose={() => setShowContactProfileModal(false)}>
        <div className="p-8 text-center">
          <img
            src={profilePic}
            alt="Shivam Kumar Sinha"
            className="w-48 h-48 rounded-full object-cover border-4 border-[#2d2d30] shadow-lg mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Shivam Kumar Sinha</h2>
          <p className="text-lg text-gray-300 mb-4">Get in Touch</p>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-center justify-center gap-3">
              <FaPhone className="text-green-400" />
              <span>+91 9304332221</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FaLinkedin className="text-blue-400" />
              <span>LinkedIn</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FaGithub className="text-white" />
              <span>GitHub</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FaInstagram className="text-pink-400" />
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-[#252425] relative overflow-hidden">
      {/* SVG pattern background for the entire page */}
      <svg width="100%" height="100%" className="fixed inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pattern-circles-bg" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#353535" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-circles-bg)" />
      </svg>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <CertificateGallery />
        <Contact />
      </div>
    </div>
  );
}

export default App
