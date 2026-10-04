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

  useEffect(() => {
    // ABOUT API
    fetch("http://127.0.0.1:8000/api/about/")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setAbout(data[0]);
        }
      })
      .catch((error) => {
        console.error("ABOUT API ERROR:", error);
      });

    // SKILLS API
    fetch("http://127.0.0.1:8000/api/skills/")
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
      })
      .catch((error) => {
        console.error("SKILLS API ERROR:", error);
      });

    // PROJECTS API
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("PROJECTS API ERROR:", error);
      });

    // EXPERIENCE API
    fetch("http://127.0.0.1:8000/api/experience/")
      .then((response) => response.json())
      .then((data) => {
        setExperience(data);
      })
      .catch((error) => {
        console.error("EXPERIENCE API ERROR:", error);
      });

    // SERVICES API
    fetch("http://127.0.0.1:8000/api/services/")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("SERVICES API ERROR:", error);
      });

    // TESTIMONIALS API
    fetch("http://127.0.0.1:8000/api/testimonials/")
      .then((response) => response.json())
      .then((data) => {
        console.log("TESTIMONIALS API DATA:", data);
        setTestimonials(data);
      })
      .catch((error) => {
        console.error("TESTIMONIALS API ERROR:", error);
      });

    // BLOGS API
    fetch("http://127.0.0.1:8000/api/blogs/")
      .then((response) => response.json())
      .then((data) => {
        console.log("BLOGS API DATA:", data);
        setBlogs(data);
      })
      .catch((error) => {
        console.error("BLOGS API ERROR:", error);
      });
  }, []);

  // CONTACT FORM SUBMIT
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
        const errorData = await response.json();
        console.error("CONTACT API ERROR:", errorData);

        setContactStatus(
          "Something went wrong. Please try again."
        );
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

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-bold">
            {about ? about.name : "Portfolio"}
          </h1>

          <div className="hidden gap-6 text-sm md:flex">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#services">Services</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#blogs">Blog</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            Welcome to my portfolio
          </p>

          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
            {about ? `Hi, I'm ${about.name}.` : "Hi, I'm there."}
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            {about
              ? about.title
              : "Full Stack Software Developer building modern web applications."}
          </p>

          <p className="mt-4 max-w-2xl leading-7 text-gray-500">
            {about
              ? about.bio
              : "Computer Science Engineering student and aspiring software developer."}
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="border-t border-gray-200 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">About</h2>

          {about ? (
            <div className="mt-6 max-w-3xl space-y-3 text-gray-600">
              <p>{about.bio}</p>
              <p>Location: {about.location}</p>
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              Loading About information...
            </p>
          )}
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section
        id="skills"
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Skills</h2>

          {skills.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {skill.name}
                    </h3>

                    <span className="text-sm text-gray-500">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {skill.category && (
                    <p className="mt-2 text-sm text-gray-500">
                      {skill.category}
                    </p>
                  )}

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-black"
                      style={{
                        width: `${skill.proficiency}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              Loading Skills...
            </p>
          )}
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section
        id="projects"
        className="px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Projects</h2>

          {projects.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-48 w-full object-cover"
                    />
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-gray-600">
                      {project.description}
                    </p>

                    {project.technologies && (
                      <p className="mt-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">
                          Technologies:
                        </span>{" "}
                        {project.technologies}
                      </p>
                    )}

                    <div className="mt-6 flex gap-3">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
                        >
                          GitHub
                        </a>
                      )}

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              No published projects available.
            </p>
          )}
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section
        id="experience"
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Experience</h2>

          {experience.length > 0 ? (
            <div className="mt-8 space-y-6">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-2 md:flex-row">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {item.role}
                      </h3>

                      <p className="mt-1 text-gray-600">
                        {item.company}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      {item.start_date} —{" "}
                      {item.is_current
                        ? "Present"
                        : item.end_date || "N/A"}
                    </p>
                  </div>

                  <p className="mt-4 leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              Loading Experience...
            </p>
          )}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section
        id="services"
        className="px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Services</h2>

          {services.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  {service.icon && (
                    <div className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-400">
                      {service.icon}
                    </div>
                  )}

                  <h3 className="text-xl font-semibold">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              Loading Services...
            </p>
          )}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section
        id="testimonials"
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">
            Testimonials
          </h2>

          {testimonials.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="mb-4 h-14 w-14 rounded-full object-cover"
                    />
                  )}

                  <p className="leading-7 text-gray-600">
                    “{testimonial.message}”
                  </p>

                  <div className="mt-5">
                    <h3 className="font-semibold">
                      {testimonial.name}
                    </h3>

                    {testimonial.role && (
                      <p className="mt-1 text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              Loading Testimonials...
            </p>
          )}
        </div>
      </section>

      {/* ================= BLOG ================= */}
      <section
        id="blogs"
        className="px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">
            Blog
          </h2>

          {blogs.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  {blog.featured_image && (
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="h-48 w-full object-cover"
                    />
                  )}

                  <div className="p-6">
                    <p className="text-sm text-gray-500">
                      {new Date(
                        blog.created_at
                      ).toLocaleDateString()}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {blog.title}
                    </h3>

                    <p className="mt-3 leading-7 text-gray-600">
                      {blog.content}
                    </p>

                    <p className="mt-5 text-sm font-medium text-gray-500">
                      Read Article →
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              Loading Blog posts...
            </p>
          )}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="px-6 py-24"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold">
            Contact Me
          </h2>

          <p className="mt-4 text-gray-600">
            Have a project, opportunity, or question?
            Send me a message.
          </p>

          <form
            onSubmit={handleContactSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
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
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Sending..."
                : "Send Message"}
            </button>

            {contactStatus && (
              <p className="rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
                {contactStatus}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">
        © 2026 Portfolio. All rights reserved.
      </footer>

    </main>
  );
}