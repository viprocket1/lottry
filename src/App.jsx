import React from 'react';

const Resume = () => {
  // --- DATA SOURCE (Edit this section) ---
  const resumeData = {
    header: {
      name: "JOHN A. HARVARD",
      address: "Cambridge, MA",
      phone: "(555) 123-4567",
      email: "john.harvard@college.edu",
      linkedin: "linkedin.com/in/johnharvard",
      github: "github.com/johnharvard"
    },
    education: [
      {
        school: "Harvard University",
        location: "Cambridge, MA",
        degree: "Bachelor of Science in Computer Science, cum laude",
        date: "May 2025",
        details: [
          "GPA: 3.9/4.0",
          "Relevant Coursework: Data Structures, Algorithms, Distributed Systems, Machine Learning, Operating Systems.",
          "Honors: John Harvard Scholar (Top 5%), Dean’s List (All Semesters)."
        ]
      }
    ],
    experience: [
      {
        company: "Tech Giant Corp",
        location: "San Francisco, CA",
        role: "Software Engineering Intern",
        date: "May 2024 – Aug 2024",
        bullets: [
          "Engineered a scalable microservice using Go and gRPC to handle 50k+ daily requests, reducing latency by 40%.",
          "Collaborated with cross-functional teams to integrate GraphQL endpoints, enhancing frontend data fetching efficiency.",
          "Automated deployment pipelines using Docker and Jenkins, cutting deployment time from 20 minutes to 5 minutes."
        ]
      },
      {
        company: "StartUp Inc.",
        location: "Remote",
        role: "Full Stack Developer",
        date: "June 2023 – Aug 2023",
        bullets: [
          "Developed a responsive e-commerce web application using React, Node.js, and PostgreSQL.",
          "Implemented secure user authentication with OAuth 2.0 and integrated Stripe API for payment processing.",
          "Optimized database queries, resulting in a 25% improvement in page load speeds for high-traffic product pages."
        ]
      }
    ],
    projects: [
      {
        name: "Algorithmic Trading Bot",
        tech: "Python, Pandas, AWS",
        bullets: [
          "Built a high-frequency trading bot that executes strategies based on real-time market data using WebSockets.",
          "Backtested strategies over 5 years of historical data, achieving a simulated annualized return of 15%.",
          "Deployed on AWS EC2 for continuous uptime and integrated SMS alerts for trade execution notifications."
        ]
      }
    ],
    skills: {
      languages: "Java, Python, C++, JavaScript (ES6+), TypeScript, SQL, Go",
      frameworks: "React, Node.js, Express, Spring Boot, Django, Flask",
      tools: "Git, Docker, Kubernetes, AWS, Linux/Unix, Jenkins, MongoDB"
    }
  };

  // --- COMPONENT RENDER ---
  return (
    <div className="bg-gray-100 min-h-screen p-8 print:p-0 print:bg-white flex justify-center">
      {/* Paper Container - Simulates US Letter Size */}
      <div 
        className="bg-white w-[8.5in] min-h-[11in] shadow-lg print:shadow-none p-[0.5in] text-black"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        
        {/* HEADER */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">
            {resumeData.header.name}
          </h1>
          <div className="text-sm">
            <span>{resumeData.header.address}</span>
            <span className="mx-1">•</span>
            <span>{resumeData.header.phone}</span>
            <span className="mx-1">•</span>
            <a href={`mailto:${resumeData.header.email}`} className="hover:underline">{resumeData.header.email}</a>
            <span className="mx-1">•</span>
            <a href={`https://${resumeData.header.linkedin}`} className="hover:underline">{resumeData.header.linkedin}</a>
            <span className="mx-1">•</span>
            <a href={`https://${resumeData.header.github}`} className="hover:underline">{resumeData.header.github}</a>
          </div>
        </header>

        {/* EDUCATION SECTION */}
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{edu.school}</h3>
                <span className="text-sm">{edu.location}</span>
              </div>
              <div className="flex justify-between items-baseline italic">
                <span className="text-sm">{edu.degree}</span>
                <span className="text-sm">{edu.date}</span>
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 text-sm leading-tight">
                {edu.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Experience</h2>
          {resumeData.experience.map((job, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{job.company}</h3>
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex justify-between items-baseline italic mb-1">
                <span className="text-sm">{job.role}</span>
                <span className="text-sm">{job.date}</span>
              </div>
              <ul className="list-disc list-outside ml-4 text-sm leading-snug">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="mb-0.5">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* PROJECTS SECTION */}
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Leadership & Projects</h2>
          {resumeData.projects.map((proj, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-base">{proj.name}</span>
                  <span className="text-sm italic ml-1"> — {proj.tech}</span>
                </div>
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 text-sm leading-snug">
                {proj.bullets.map((bullet, i) => (
                  <li key={i} className="mb-0.5">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* SKILLS SECTION */}
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Technical Skills & Interests</h2>
          <div className="text-sm leading-snug">
            <p className="mb-1">
              <span className="font-bold">Languages:</span> {resumeData.skills.languages}
            </p>
            <p className="mb-1">
              <span className="font-bold">Frameworks:</span> {resumeData.skills.frameworks}
            </p>
            <p>
              <span className="font-bold">Developer Tools:</span> {resumeData.skills.tools}
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Resume;
