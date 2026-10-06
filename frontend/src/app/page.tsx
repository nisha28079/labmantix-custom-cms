"use client";

import { useEffect, useState } from "react";

type About = {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
};

type Skill = {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  is_published: boolean;
};

type Project = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  technologies: string;
  github_url: string;
  live_url: string;
  status: string;
};

type Experience = {
  id: number;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
};

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  is_published: boolean;
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  image: string | null;
  is_published: boolean;
};

type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  status: string;
  created_at: string;
};

export default function Home() {
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactStatus, setContactStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/about/")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) setAbout(data[0]);
      })
      .catch((error) => console.error("ABOUT API ERROR:", error));

    fetch("http://127.0.0.1:8000/api/skills/")
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("SKILLS API ERROR:", error));

    fetch("http://127.0.0.1:8000/api/projects/")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("PROJECTS API ERROR:", error));

    fetch("http://127.0.0.1:8000/api/experience/")
      .then((response) => response.json())
      .then((data) => setExperience(data))
      .catch((error) => console.error("EXPERIENCE API ERROR:", error));

    fetch("http://127.0.0.1:8000/api/services/")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("SERVICES API ERROR:", error));

    fetch("http://127.0.0.1:8000/api/testimonials/")
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("TESTIMONIALS API ERROR:", error));

    fetch("http://127.0.0.1:8000/api/blogs/")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("BLOGS API ERROR:", error));
  }, []);

  const handleContactSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setContactStatus("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/messages/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactForm),
        }
      );

      if (response.ok) {
        setContactStatus(
          "Message sent successfully! Thank you for contacting me."
        );

        setContactForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setContactStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("CONTACT SUBMIT ERROR:", error);
      setContactStatus(
        "Unable to send message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Services", "#services"],
    ["Blog", "#blogs"],
    ["Contact", "#contact"],
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111111]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#fafafa]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#home"
            className="text-xl font-black tracking-tight"
          >
            {about?.name || "Portfolio"}
            <span className="text-gray-400">.</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-gray-600 transition hover:text-black"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 md:block"
          >
            Let&apos;s Talk
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-black/10 bg-[#fafafa] px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-gray-700"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden border-b border-black/10"
      >
        <div className="absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-gray-200/60 blur-3xl" />

        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Available for opportunities
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              Hello, I&apos;m
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              {about?.name || "Nisha Singh"}
              <span className="text-gray-400">.</span>
            </h1>

            <h2 className="mt-7 max-w-2xl text-xl font-semibold text-gray-700 sm:text-2xl">
              {about?.title ||
                "Full Stack Software Developer building modern web applications."}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg">
              {about?.bio ||
                "Computer Science Engineering student and aspiring software developer."}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-gray-800"
              >
                View My Work →
              </a>

              <a
                href="#contact"
                className="rounded-full border border-black/15 bg-white px-7 py-3.5 text-sm font-semibold transition hover:-translate-y-1 hover:border-black"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
              <span>📍 {about?.location || "India"}</span>
              {about?.email && <span>✉ {about.email}</span>}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-5 rounded-[2rem] bg-gray-200/70 blur-2xl" />

              <div className="relative rounded-[2rem] border border-black/10 bg-white p-8 shadow-2xl shadow-black/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Portfolio
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                    2026
                  </span>
                </div>

                <div className="mt-20">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-3xl font-black text-white">
                    {about?.name?.charAt(0) || "N"}
                  </div>

                  <h3 className="mt-7 text-3xl font-black">
                    Building.
                    <br />
                    Learning.
                    <br />
                    Creating.
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-gray-500">
                    Turning ideas into useful, reliable and modern digital
                    experiences.
                  </p>
                </div>

                <div className="mt-12 flex justify-between border-t border-black/10 pt-5 text-xs font-semibold text-gray-400">
                  <span>DEVELOPER</span>
                  <span>CREATIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-b border-black/10 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                01 / About
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                A little about me.
              </h2>
            </div>

            <div>
              {about ? (
                <>
                  <p className="text-xl leading-9 text-gray-600">
                    {about.bio}
                  </p>

                  <div className="mt-9 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-black/10 bg-white p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Location
                      </p>
                      <p className="mt-2 font-semibold">{about.location}</p>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Email
                      </p>
                      <p className="mt-2 break-all font-semibold">
                        {about.email}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Loading About information...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            02 / Skills
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              What I work with.
            </h2>

            <p className="max-w-md text-sm leading-7 text-gray-500">
              Technologies and tools I use to build, learn and solve real
              problems.
            </p>
          </div>

          {skills.length > 0 ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group rounded-2xl border border-black/10 bg-[#fafafa] p-6 transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{skill.name}</h3>

                      {skill.category && (
                        <p className="mt-1 text-sm text-gray-500">
                          {skill.category}
                        </p>
                      )}
                    </div>

                    <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <div className="mt-7 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-black transition-all duration-700"
                      style={{
                        width: `${skill.proficiency}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-gray-500">Loading Skills...</p>
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-[#111111] px-5 py-24 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            03 / Projects
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Selected work.
            </h2>

            <p className="max-w-md text-sm leading-7 text-gray-400">
              Projects built to learn, experiment and create practical
              solutions.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-64 items-end bg-gradient-to-br from-gray-800 to-gray-950 p-7">
                      <span className="text-7xl font-black text-white/10">
                        0{index + 1}
                      </span>
                    </div>
                  )}

                  <div className="p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                        Project 0{index + 1}
                      </span>

                      {project.status && (
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                          {project.status}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 text-2xl font-black">
                      {project.title}
                    </h3>

                    <p className="mt-4 leading-7 text-gray-400">
                      {project.description}
                    </p>

                    {project.technologies && (
                      <p className="mt-5 text-sm text-gray-500">
                        {project.technologies}
                      </p>
                    )}

                    <div className="mt-7 flex flex-wrap gap-3">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-gray-200"
                        >
                          GitHub ↗
                        </a>
                      )}

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold transition hover:bg-white hover:text-black"
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-gray-400">
              No published projects available.
            </p>
          )}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            04 / Experience
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Where I&apos;ve been learning.
          </h2>

          {experience.length > 0 ? (
            <div className="mt-12 space-y-5">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-6 rounded-3xl border border-black/10 bg-white p-7 transition hover:shadow-xl hover:shadow-black/5 md:grid-cols-[220px_1fr]"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-500">
                      {item.start_date} —{" "}
                      {item.is_current
                        ? "Present"
                        : item.end_date || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black">{item.role}</h3>
                    <p className="mt-1 font-semibold text-gray-500">
                      {item.company}
                    </p>

                    <p className="mt-5 max-w-3xl leading-8 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-gray-500">Loading Experience...</p>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-gray-100 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            05 / Services
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            What I can build.
          </h2>

          {services.length > 0 ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="rounded-3xl border border-black/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="text-4xl font-black text-gray-200">
                    0{index + 1}
                  </span>

                  {service.icon && (
                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                      {service.icon}
                    </p>
                  )}

                  <h3 className="mt-3 text-xl font-black">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-gray-500">Loading Services...</p>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            06 / Testimonials
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Kind words.
          </h2>

          {testimonials.length > 0 ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-3xl border border-black/10 bg-[#fafafa] p-7"
                >
                  <div className="text-4xl font-black text-gray-300">
                    “
                  </div>

                  <p className="mt-2 leading-8 text-gray-600">
                    {testimonial.message}
                  </p>

                  <div className="mt-7 flex items-center gap-4">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}

                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      {testimonial.role && (
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-gray-500">
              Loading Testimonials...
            </p>
          )}
        </div>
      </section>

      {/* BLOG */}
      <section id="blogs" className="border-t border-black/10 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            07 / Blog
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Thoughts & learning.
          </h2>

          {blogs.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {blog.featured_image ? (
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-gray-100" />
                  )}

                  <div className="p-7">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>

                    <h3 className="mt-3 text-xl font-black">
                      {blog.title}
                    </h3>

                    <p className="mt-4 line-clamp-4 leading-7 text-gray-600">
                      {blog.content}
                    </p>

                    <p className="mt-6 text-sm font-bold">
                      Read Article →
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-gray-500">
              Loading Blog posts...
            </p>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="bg-[#111111] px-5 py-24 text-white sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
                08 / Contact
              </p>

              <h2 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
                Let&apos;s build something useful.
              </h2>

              <p className="mt-6 max-w-md leading-8 text-gray-400">
                Have a project, internship opportunity, collaboration idea,
                or simply want to connect? Send me a message.
              </p>

              {about?.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="mt-8 inline-block font-semibold text-white underline underline-offset-4"
                >
                  {about.email}
                </a>
              )}
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Name
                  </label>

                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        email: e.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Subject
                </label>

                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      subject: e.target.value,
                    })
                  }
                  placeholder="How can I help?"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Message
                </label>

                <textarea
                  required
                  rows={6}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      message: e.target.value,
                    })
                  }
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </button>

              {contactStatus && (
                <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.06] p-4 text-sm text-gray-300">
                  {contactStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-5 py-8 text-center text-sm text-gray-500 sm:px-8">
        <p>
          © 2026 {about?.name || "Portfolio"}. Built with Next.js,
          Tailwind CSS & Django.
        </p>
      </footer>
    </main>
  );
}