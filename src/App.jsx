
import './index.css'
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Eric from './Eric.png';
import Tuyishime_Cv from './EricCv.pdf'
import Tuyishime from './Eri.jpg'

const Portfolio = () => {
  const [navActive, setNavActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', color: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Scroll event for navbar shadow
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar.classList.add('shadow-md');
        navbar.classList.remove('shadow-sm');
      } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.add('shadow-sm');
      }
    };

    // Intersection Observer for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
      observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Form validation
    const isValid = Object.values(formErrors).every(error => !error) && 
                    Object.values(formData).every(field => field.trim());
    setIsFormValid(isValid);
  }, [formData, formErrors]);

  const handleNavToggle = () => {
    setNavActive(!navActive);
  };

  const handleNavLinkClick = () => {
    setNavActive(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation
    if (name === 'email') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, email: 'Email cannot be empty' }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Invalid email' }));
      } else {
        setFormErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (name === 'name') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, name: 'Name cannot be empty' }));
      } else if (value.trim().length < 2) {
        setFormErrors(prev => ({ ...prev, name: 'Name too short' }));
      } else {
        setFormErrors(prev => ({ ...prev, name: '' }));
      }
    } else if (name === 'subject') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, subject: 'Subject cannot be empty' }));
      } else if (value.trim().length < 4) {
        setFormErrors(prev => ({ ...prev, subject: 'Subject too short' }));
      } else {
        setFormErrors(prev => ({ ...prev, subject: '' }));
      }
    } else if (name === 'message') {
      if (!value.trim()) {
        setFormErrors(prev => ({ ...prev, message: 'Message cannot be empty' }));
      } else if (value.trim().length < 5) {
        setFormErrors(prev => ({ ...prev, message: 'Message too short' }));
      } else {
        setFormErrors(prev => ({ ...prev, message: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://backend-qnfm.onrender.com/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSubmitMessage({ 
        text: "Thank you for contacting me! Your message has been received.", 
        color: "text-green-500" 
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage({ 
        text: "An error occurred while sending the message.", 
        color: "text-red-500" 
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage({ text: '', color: '' });
      }, 4000);
    }
  };

  return (
    <div className="font-sans text-gray-700 bg-white">
      {/* Navbar */}
      <nav className="navbar fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-sm z-50 transition-all">
        <div className="container mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">Eric Tuyishime</div>
          <ul className={`nav-list md:flex ${navActive ? 'flex' : 'hidden'} md:space-x-8 absolute md:static top-16 right-0 w-3/5 md:w-auto h-[calc(100vh-4rem)] md:h-auto bg-white md:bg-transparent shadow-md md:shadow-none flex-col md:flex-row items-center pt-8 md:pt-0`}>
            {['home', 'about', 'experience', 'education', 'projects', 'contact'].map((item) => (
              <li key={item} className="my-4 md:my-0">
                <a 
                  href={`#${item}`} 
                  className="nav-link font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={handleNavLinkClick}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <div className="burger md:hidden cursor-pointer" onClick={handleNavToggle}>
            <div className={`w-6 h-0.5 bg-gray-700 my-1.5 transition-all ${navActive ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-700 my-1.5 transition-all ${navActive ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-700 my-1.5 transition-all ${navActive ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero min-h-screen flex items-center relative bg-gradient-to-br from-blue-600/90 to-purple-500/90 text-gray-200 overflow-hidden px-8">
        <div className="container mx-auto px-8">
          <div className="hero-content max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Hi, I'm Eric Tuyishime</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">Full-Stack Developer | Telecommunications & ICT Specialist | Based in Kigali, Rwanda</p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-white/90 hover:-translate-y-1 transition-all text-center">
                Get In Touch
              </a>
              <a href="#projects" className="btn-outline border-2 border-white text-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-600 hover:-translate-y-1 transition-all text-center">
                View My Work
              </a>
              <a 
                href={Tuyishime_Cv} 
                download 
                className="btn-primary bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-white/90 hover:-translate-y-1 transition-all text-center"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 inline-block relative">
            About Me
            <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <div className="about-content grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="profile-image flex justify-center md:justify-start">
              <img 
                src={Eric} 
                alt="Eric Tuyishime" 
                className="w-64 h-64 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="about-text md:col-span-2">
              <p className="text-lg text-gray-600 mb-4">
                Hello! I'm Eric Tuyishime, a passionate Full-Stack Developer and Telecommunications Specialist with expertise in front-end development, Python programming, and network configuration. I thrive on solving complex problems and delivering innovative solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With a strong foundation in Computer Science and hands-on experience in web development and ICT solutions, I aim to contribute to cutting-edge projects that drive technological advancement.
              </p>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Skills</h3>
              <div className="skills flex flex-wrap gap-3 mt-6">
                {[
                  'JavaScript', 'React', 'Python', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'Git', 
                  'Tailwindcss', 'React vite', 'Mysql', 'Mini-link craft', 'Moshell', 'typescript', 
                  'C++', 'C', 'Radio Links', 'Baseband', 'Microwave', 'Packet tracer'
                ].map((skill) => (
                  <span key={skill} className="skill-tag bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 inline-block relative">
            Professional Experience
            <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <div className="experience-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="experience-card fade-in bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform opacity-0 translate-y-5">
              <p className="text-blue-600 font-semibold mb-2">Aug 2022 - Present</p>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Telecommunications & Radio Link Configuration</h3>
              <p className="font-medium text-gray-700 mb-4">Havilah Engineering Group, Kigali</p>
              <p className="text-gray-600">
                Configured and maintained radio link systems, ensuring optimal performance and reliability. Collaborated with cross-functional teams to deliver ICT solutions for clients.
              </p>
            </div>
            <div className="experience-card fade-in bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform opacity-0 translate-y-5">
              <p className="text-blue-600 font-semibold mb-2">Jan 2021 - Jul 2022</p>
              <h3 className="text-xl font-bold mb-2 text-gray-800">ICT Support Specialist</h3>
              <p className="font-medium text-gray-700 mb-4">Tech Solutions Ltd, Kigali</p>
              <p className="text-gray-600">
                Provided technical support and troubleshooting for network and software issues. Assisted in the deployment of ICT infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 inline-block relative">
            Education
            <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <div className="education-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="education-card fade-in bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform opacity-0 translate-y-5">
              <p className="text-blue-600 font-semibold mb-2">2023 - Present</p>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Bachelor of Computer Science</h3>
              <p className="font-medium text-gray-700 mb-4">University of Rwanda</p>
              <p className="text-gray-600">
                Relevant Coursework: Advanced Web Development, Software Engineering, Database Systems, Telecommunication Networks, AI & Machine Learning.
              </p>
            </div>
            <div className="education-card fade-in bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform opacity-0 translate-y-5">
              <p className="text-blue-600 font-semibold mb-2">2019 - 2022</p>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Advanced Level Certificate</h3>
              <p className="font-medium text-gray-700 mb-4">GS Saint Espirit Mushaka</p>
              <p className="text-gray-600">
                Focus: Mathematics, Economics, and Computer Science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
  <div className="container mx-auto px-8">
    <h2 className="text-3xl font-bold mb-12 inline-block relative">
      Projects
      <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
    </h2>
    <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Project 1 */}
      <div className="project-card fade-in bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform opacity-0 translate-y-5">
        <div className={ isHovered === false ? "project-content p-6" : ""} onMouseEnter={() => setIsHovered(true)} >
          <h3 className="text-xl font-bold mb-3 text-gray-800">Advanced Portfolio Website</h3>
          <p className="text-gray-600 mb-4">Designed a professional portfolio showcasing projects, skills, and a multilingual language switcher (English, French, Spanish, Kinyarwanda). Implemented SEO optimization for higher search engine visibility.</p>
          <div className="project-tags flex flex-wrap gap-2 mt-4">
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">React.js</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Tailwind CSS</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">TypeScript</span>
          </div>
          <p className='mt-[50px]'><a href='#' className='text-blue-500 mt-[30px] cursor-pointer hover:text-blue-300'> View this project</a></p>
        </div>
      </div>

      {/* Project 2 */}
      <div className="project-card fade-in bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform opacity-0 translate-y-5">
        <div className="project-content p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-800">Real-time Photo Gallery</h3>
          <p className="text-gray-600 mb-4">Developed a real-time Gallery with functionalities to add or remove image, and navigate through the images with a fully responsive design and full photographic functionalities.</p>
          <div className="project-tags flex flex-wrap gap-2 mt-4">
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">React vite</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Tailwindcss</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">html</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Typescript</span>
          </div>
          <p className='mt-[50px]'><a href='#' className='text-blue-500 mt-[30px] cursor-pointer hover:text-blue-300'> View this project</a></p>
        </div>
      </div>

      {/* Project 3 */}
      <div className="project-card fade-in bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform opacity-0 translate-y-5">
        <div className="project-content p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-800">Telecommunications Network Simulator</h3>
          <p className="text-gray-600 mb-4">Designed a multi-layered network topology using Cisco Packet Tracer, implementing QoS, redundancy, and efficient routing protocols. Configured VPNs and firewalls to enhance network security.</p>
          <div className="project-tags flex flex-wrap gap-2 mt-4">
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Cisco Packet Tracer</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">GNS3</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Networking</span>
          </div>
          <p className='mt-[50px]'><a href='#' className='text-blue-500 mt-[30px] cursor-pointer hover:text-blue-300'> View this project</a></p>
        </div>
      </div>

      {/* Project 4 */}
      <div className="project-card fade-in bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform opacity-0 translate-y-5">
        <div className="project-content p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-800">Online TV Streaming Platform</h3>
          <p className="text-gray-600 mb-4">Built an online platform with features for video streaming, user subscriptions, and admin controls. Integrated payment gateway APIs for secure transactions.</p>
          <div className="project-tags flex flex-wrap gap-2 mt-4">
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">React.js</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Node.js</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">MongoDB</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Stripe API</span>
          </div>
          <p className='mt-[50px]'><a href='#' className='text-blue-500 mt-[30px] cursor-pointer hover:text-blue-300'> View this project</a></p>
        </div>
      </div>

      {/* Project 5 */}
      <div className="project-card fade-in bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform opacity-0 translate-y-5">
        <div className="project-content p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Image Generator</h3>
          <p className="text-gray-600 mb-4">Developed a website to create AI-generated images and videos based on the prompted captions or description of the needed video or image. This functions like real-life images and videos.</p>
          <div className="project-tags flex flex-wrap gap-2 mt-4">
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">React vite</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">javascript</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Tailwindcss</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Node.js</span>
          </div>
          <p className='mt-[50px]'><a href='#' className='text-blue-500 mt-[30px] cursor-pointer hover:text-blue-300'> View this project</a></p>
        </div>
      </div>

      {/* Project 6 */}
      <div className="project-card fade-in bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform opacity-0 translate-y-5">
        <div className="project-content p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-800">Digital Calculator</h3>
          <p className="text-gray-600 mb-4">I created a real-problem solving calculator to perform basic and advanced mathematical operations for either educational or researching purposes.</p>
          <div className="project-tags flex flex-wrap gap-2 mt-4">
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">React vite</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">Tailwindcss</span>
            <span className="project-tag bg-white text-gray-700 px-3 py-1 rounded-full text-xs border border-blue-600">javascript</span>
          </div>
          <p className='mt-[50px]'><a href='https://0d725986.calculator-aej.pages.dev/' target='_blank' className='text-blue-500 mt-[30px] cursor-pointer hover:text-blue-300'> View this project</a></p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12 inline-block relative">
            Get In Touch
            <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <div className="contact-container grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="contact-info lg:col-span-1">
              <div className="contact-item flex items-center gap-4 mb-6">
                <div className="contact-icon w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg">
                  📧
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Email</h3>
                  <p className="text-gray-600">erictuyishime574@gmail.com</p>
                </div>
              </div>
              <div className="contact-item flex items-center gap-4 mb-6">
                <div className="contact-icon w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg">
                  📱
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+250 783 687 408</p>
                </div>
              </div>
              <div className="contact-item flex items-center gap-4 mb-6">
                <div className="contact-icon w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Location</h3>
                  <p className="text-gray-600">Kigali, Rwanda</p>
                </div>
              </div>
              <div className="social-icons flex gap-4 mt-8">
                <a href="https://github.com/eric2003tu" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaGithub className="text-3xl text-gray-700 hover:text-blue-600 transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/eric-tuyishime-3444b3358/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaLinkedin className="text-3xl text-gray-700 hover:text-blue-600 transition-colors" />
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaTwitter className="text-3xl text-gray-700 hover:text-blue-600 transition-colors" />
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="lg:col-span-2">
              <p className="mb-6 text-gray-600">
                Fill this form to contact me. and remember that <strong className="text-red-500">*</strong> means required.
              </p>
              <div className="form-group mb-4">
                <label htmlFor="name" className="block mb-2 text-gray-700">
                  Name<strong className="text-red-500">*</strong>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Name"
                />
                {formErrors.name && (
                  <p className={`mt-1 text-sm ${formErrors.name.includes('valid') ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email" className="block mb-2 text-gray-700">
                  Email<strong className="text-red-500">*</strong>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Email"
                />
                {formErrors.email && (
                  <p className={`mt-1 text-sm ${formErrors.email.includes('valid') ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="subject" className="block mb-2 text-gray-700">
                  Subject<strong className="text-red-500">*</strong>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Subject"
                />
                {formErrors.subject && (
                  <p className={`mt-1 text-sm ${formErrors.subject.includes('valid') ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {formErrors.subject}
                  </p>
                )}
              </div>
              <div className="form-group mb-6">
                <label htmlFor="message" className="block mb-2 text-gray-700">
                  Message<strong className="text-red-500">*</strong>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Message"
                ></textarea>
                {formErrors.message && (
                  <p className={`mt-1 text-sm ${formErrors.message.includes('valid') ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {formErrors.message}
                  </p>
                )}
              </div>
              {submitMessage.text && (
                <p className={`mb-4 ${submitMessage.color} font-semibold`}>
                  {submitMessage.text}
                </p>
              )}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full px-6 py-3 rounded font-bold text-white ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-blue-300 cursor-not-allowed'} transition-colors relative`}
              >
                {isSubmitting ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="container mx-auto px-8">
          <p>&copy; 2025 Eric Tuyishime. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
