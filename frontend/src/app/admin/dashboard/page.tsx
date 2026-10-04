"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://127.0.0.1:8000/api";

const menuItems = [
  { name: "About", endpoint: "about" },
  { name: "Skills", endpoint: "skills" },
  { name: "Projects", endpoint: "projects" },
  { name: "Experience", endpoint: "experience" },
  { name: "Services", endpoint: "services" },
  { name: "Blogs", endpoint: "blogs" },
  { name: "Testimonials", endpoint: "testimonials" },
  { name: "Messages", endpoint: "messages" },
  { name: "Media", endpoint: "media" },
];

type Project = {
  id: number; title: string; description: string; image: string | null;
  technologies: string; github_url: string; live_url: string;
  status: "draft" | "published"; created_at: string; updated_at: string;
};
type ProjectForm = {
  title: string; description: string; technologies: string; github_url: string;
  live_url: string; status: "draft" | "published"; image: File | null;
};
type Skill = {
  id: number; name: string; category: string; proficiency: number;
  icon: string; is_published: boolean;
};
type SkillForm = {
  name: string; category: string; proficiency: number; icon: string;
  is_published: boolean;
};
type About = {
  id: number; name: string; title: string; bio: string;
  profile_image: string | null; email: string; phone: string; location: string;
  created_at: string; updated_at: string;
};
type AboutForm = {
  name: string; title: string; bio: string; email: string;
  phone: string; location: string; profile_image: File | null;
};
type Experience = {
  id: number; company: string; role: string; description: string;
  start_date: string; end_date: string | null; is_current: boolean;
};
type ExperienceForm = {
  company: string; role: string; description: string;
  start_date: string; end_date: string; is_current: boolean;
};
type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

type BlogForm = {
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  featured_image: File | null;
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  image: string | null;
  is_published: boolean;
};

type TestimonialForm = {
  name: string;
  role: string;
  message: string;
  is_published: boolean;
  image: File | null;
};


type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
};   

type Media = {
  id: number;
  file: string;
  uploaded_at: string;
};


const emptyTestimonialForm: TestimonialForm = {
  name: "",
  role: "",
  message: "",
  is_published: true,
  image: null,
};

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  is_published: boolean;
};

type ServiceForm = {
  title: string;
  description: string;
  icon: string;
  is_published: boolean;
};

const emptyForm: ProjectForm = {
  title: "", description: "", technologies: "", github_url: "", live_url: "",
  status: "draft", image: null,
};
const emptySkillForm: SkillForm = {
  name: "", category: "", proficiency: 0, icon: "", is_published: true,
};
const emptyAboutForm: AboutForm = {
  name: "", title: "", bio: "", email: "", phone: "", location: "", profile_image: null,
};
const emptyExperienceForm: ExperienceForm = {
  company: "", role: "", description: "", start_date: "", end_date: "", is_current: false,
};

const emptyBlogForm: BlogForm = {
  title: "",
  slug: "",
  content: "",
  status: "draft",
  featured_image: null,
};

const emptyServiceForm: ServiceForm = {
  title: "",
  description: "",
  icon: "",
  is_published: true,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Overview");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectForm>(emptyForm);
  const [savingProject, setSavingProject] = useState(false);
  const [projectError, setProjectError] = useState("");

  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState<SkillForm>(emptySkillForm);
  const [savingSkill, setSavingSkill] = useState(false);
  const [skillError, setSkillError] = useState("");

  const [about, setAbout] = useState<About | null>(null);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [showAboutForm, setShowAboutForm] = useState(false);
  const [aboutForm, setAboutForm] = useState<AboutForm>(emptyAboutForm);
  const [savingAbout, setSavingAbout] = useState(false);
  const [aboutError, setAboutError] = useState("");

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [experienceForm, setExperienceForm] = useState<ExperienceForm>(emptyExperienceForm);
  const [savingExperience, setSavingExperience] = useState(false);
  const [experienceError, setExperienceError] = useState("");

  const [blogs, setBlogs] = useState<Blog[]>([]);
const [blogsLoading, setBlogsLoading] = useState(false);
const [showBlogForm, setShowBlogForm] = useState(false);
const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
const [blogForm, setBlogForm] = useState<BlogForm>(emptyBlogForm);
const [savingBlog, setSavingBlog] = useState(false);
const [blogError, setBlogError] = useState("");


const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
const [testimonialsLoading, setTestimonialsLoading] = useState(false);
const [showTestimonialForm, setShowTestimonialForm] = useState(false);
const [editingTestimonial, setEditingTestimonial] =
  useState<Testimonial | null>(null);
const [testimonialForm, setTestimonialForm] =
  useState<TestimonialForm>(emptyTestimonialForm);
const [savingTestimonial, setSavingTestimonial] = useState(false);
const [testimonialError, setTestimonialError] = useState("");

const [messages, setMessages] = useState<Message[]>([]);
const [messagesLoading, setMessagesLoading] = useState(false);
const [messageError, setMessageError] = useState("");


const [media, setMedia] = useState<Media[]>([]);
const [mediaLoading, setMediaLoading] = useState(false);
const [mediaError, setMediaError] = useState("");
const [mediaFile, setMediaFile] = useState<File | null>(null);
const [uploadingMedia, setUploadingMedia] = useState(false);


    const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState<ServiceForm>(emptyServiceForm);
  const [savingService, setSavingService] = useState(false);
  const [serviceError, setServiceError] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { router.push("/admin/login"); return; }
    fetchCounts();
  }, [router]);

  const getToken = () => localStorage.getItem("access_token");

  const fetchCounts = async () => {
    const token = getToken();
    if (!token) { router.push("/admin/login"); return; }
    try {
      const results = await Promise.all(menuItems.map(async (item) => {
        const response = await fetch(`${API}/${item.endpoint}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return { name: item.name, count: 0 };
        const data = await response.json();
        return { name: item.name, count: Array.isArray(data) ? data.length : 0 };
      }));
      const countObject: Record<string, number> = {};
      results.forEach((item) => { countObject[item.name] = item.count; });
      setCounts(countObject);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally { setLoading(false); }
  };

  const fetchProjects = async () => {
    const token = getToken();
    if (!token) { router.push("/admin/login"); return; }
    setProjectsLoading(true); setProjectError("");
    try {
      const response = await fetch(`${API}/projects/`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Unable to load projects.");
      setProjects(await response.json());
    } catch (error) {
      console.error("Projects error:", error); setProjectError("Unable to load projects.");
    } finally { setProjectsLoading(false); }
  };

  const fetchSkills = async () => {
    const token = getToken();
    if (!token) { router.push("/admin/login"); return; }
    setSkillsLoading(true); setSkillError("");
    try {
      const response = await fetch(`${API}/skills/`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Unable to load skills.");
      setSkills(await response.json());
    } catch (error) {
      console.error("Skills error:", error); setSkillError("Unable to load skills.");
    } finally { setSkillsLoading(false); }
  };

  const fetchAbout = async () => {
    const token = getToken();
    if (!token) { router.push("/admin/login"); return; }
    setAboutLoading(true); setAboutError("");
    try {
      const response = await fetch(`${API}/about/`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Unable to load about information.");
      const data: About[] = await response.json();
      if (data.length > 0) {
        setAbout(data[0]);
        setAboutForm({
          name: data[0].name || "", title: data[0].title || "", bio: data[0].bio || "",
          email: data[0].email || "", phone: data[0].phone || "", location: data[0].location || "",
          profile_image: null,
        });
      } else {
        setAbout(null); setAboutForm(emptyAboutForm);
      }
    } catch (error) {
      console.error("About error:", error); setAboutError("Unable to load about information.");
    } finally { setAboutLoading(false); }
  };

 const fetchExperiences = async () => {
  setExperiencesLoading(true);
  setExperienceError("");

  try {
    const response = await fetch(`${API}/experience/`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    setExperiences(data);
  } catch (error) {
    console.error("Experience error:", error);
    setExperienceError("Unable to load experience.");
  } finally {
    setExperiencesLoading(false);
  }
};


const fetchBlogs = async () => {
  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  setBlogsLoading(true);
  setBlogError("");

  try {
    const response = await fetch(`${API}/blogs/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    setBlogs(data);
  } catch (error) {
    console.error("Blogs error:", error);
    setBlogError("Unable to load blogs.");
  } finally {
    setBlogsLoading(false);
  }
};

const openAddBlog = () => {
  setEditingBlog(null);
  setBlogForm(emptyBlogForm);
  setBlogError("");
  setShowBlogForm(true);
};

const openEditBlog = (blog: Blog) => {
  setEditingBlog(blog);

  setBlogForm({
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    status: blog.status,
    featured_image: null,
  });

  setBlogError("");
  setShowBlogForm(true);
};

const handleBlogSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  setSavingBlog(true);
  setBlogError("");

  try {
    const formData = new FormData();

    formData.append("title", blogForm.title);
    formData.append("slug", blogForm.slug);
    formData.append("content", blogForm.content);
    formData.append("status", blogForm.status);

    if (blogForm.featured_image) {
      formData.append("featured_image", blogForm.featured_image);
    }

    const url = editingBlog
      ? `${API}/blogs/${editingBlog.id}/`
      : `${API}/blogs/`;

    const response = await fetch(url, {
      method: editingBlog ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
if (!response.ok) {
  throw new Error(
    JSON.stringify(data)
  );
}

    setShowBlogForm(false);
    setEditingBlog(null);
    setBlogForm(emptyBlogForm);

    await fetchBlogs();
    await fetchCounts();
  } catch (error) {
    console.error("Save blog error:", error);

    setBlogError(
      error instanceof Error
        ? error.message
        : "Unable to save blog."
    );
  } finally {
    setSavingBlog(false);
  }
};


const fetchTestimonials = async () => {
  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  setTestimonialsLoading(true);
  setTestimonialError("");

  try {
    const response = await fetch(`${API}/testimonials/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    setTestimonials(data);
  } catch (error) {
    console.error("Testimonials error:", error);
    setTestimonialError("Unable to load testimonials.");
  } finally {
    setTestimonialsLoading(false);
  }
};


const fetchMessages = async () => {
  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  setMessagesLoading(true);
  setMessageError("");

  try {
    const response = await fetch(`${API}/messages/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    setMessages(data);
  } catch (error) {
    console.error("Messages error:", error);
    setMessageError("Unable to load messages.");
  } finally {
    setMessagesLoading(false);
  }
};

const fetchMedia = async () => {
  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  setMediaLoading(true);
  setMediaError("");

  try {
    const response = await fetch(`${API}/media/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    setMedia(data);
  } catch (error) {
    console.error("Media error:", error);
    setMediaError("Unable to load media.");
  } finally {
    setMediaLoading(false);
  }
};

const handleMediaUpload = async () => {
  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  if (!mediaFile) {
    setMediaError("Please select a file.");
    return;
  }

  setUploadingMedia(true);
  setMediaError("");

  try {
    const formData = new FormData();
    formData.append("file", mediaFile);

    const response = await fetch(`${API}/media/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Unable to upload media."
      );
    }

    setMediaFile(null);
    await fetchMedia();
    await fetchCounts();
  } catch (error) {
    console.error("Media upload error:", error);

    setMediaError(
      error instanceof Error
        ? error.message
        : "Unable to upload media."
    );
  } finally {
    setUploadingMedia(false);
  }
};

const openAddTestimonial = () => {
  setEditingTestimonial(null);
  setTestimonialForm(emptyTestimonialForm);
  setTestimonialError("");
  setShowTestimonialForm(true);
};

const openEditTestimonial = (testimonial: Testimonial) => {
  setEditingTestimonial(testimonial);

  setTestimonialForm({
    name: testimonial.name,
    role: testimonial.role,
    message: testimonial.message,
    is_published: testimonial.is_published,
    image: null,
  });

  setTestimonialError("");
  setShowTestimonialForm(true);
};

const handleTestimonialSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  setSavingTestimonial(true);
  setTestimonialError("");

  try {
    const formData = new FormData();

    formData.append("name", testimonialForm.name);
    formData.append("role", testimonialForm.role);
    formData.append("message", testimonialForm.message);
    formData.append(
      "is_published",
      String(testimonialForm.is_published)
    );

    if (testimonialForm.image) {
      formData.append("image", testimonialForm.image);
    }

    const url = editingTestimonial
      ? `${API}/testimonials/${editingTestimonial.id}/`
      : `${API}/testimonials/`;

    const response = await fetch(url, {
      method: editingTestimonial ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Unable to save testimonial."
      );
    }

    setShowTestimonialForm(false);
    setEditingTestimonial(null);
    setTestimonialForm(emptyTestimonialForm);

    await fetchTestimonials();
    await fetchCounts();
  } catch (error) {
    console.error("Save testimonial error:", error);

    setTestimonialError(
      error instanceof Error
        ? error.message
        : "Unable to save testimonial."
    );
  } finally {
    setSavingTestimonial(false);
  }
};

const deleteTestimonial = async (id: number) => {
  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  if (
    !window.confirm(
      "Are you sure you want to delete this testimonial?"
    )
  ) {
    return;
  }

  try {
    const response = await fetch(
      `${API}/testimonials/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to delete testimonial.");
    }

    await fetchTestimonials();
    await fetchCounts();
  } catch (error) {
    console.error("Delete testimonial error:", error);
    setTestimonialError("Unable to delete testimonial.");
  }

};



const deleteBlog = async (id: number) => {
  const token = getToken();

  if (!token) {
    router.push("/admin/login");
    return;
  }

  if (!window.confirm("Are you sure you want to delete this blog?")) {
    return;
  }

  try {
    const response = await fetch(`${API}/blogs/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Unable to delete blog.");
    }

    await fetchBlogs();
    await fetchCounts();
  } catch (error) {
    console.error("Delete blog error:", error);
    setBlogError("Unable to delete blog.");
  }
};


  const fetchServices = async () => {
    setServicesLoading(true);
    setServiceError("");

    try {
      const response = await fetch(`${API}/services/`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Services error:", error);
      setServiceError("Unable to load services.");
    } finally {
      setServicesLoading(false);
    }
  };

  const openAddService = () => {
    setEditingService(null);
    setServiceForm(emptyServiceForm);
    setServiceError("");
    setShowServiceForm(true);
  };

  const openEditService = (service: Service) => {
    setEditingService(service);

    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon || "",
      is_published: service.is_published,
    });

    setServiceError("");
    setShowServiceForm(true);
  };

  const handleServiceSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setSavingService(true);
    setServiceError("");

    try {
      const url = editingService
        ? `${API}/services/${editingService.id}/`
        : `${API}/services/`;

      const response = await fetch(url, {
        method: editingService ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to save service.");
      }

      setShowServiceForm(false);
      setEditingService(null);
      setServiceForm(emptyServiceForm);

      await fetchServices();
      await fetchCounts();
    } catch (error) {
      console.error("Save service error:", error);

      setServiceError(
        error instanceof Error
          ? error.message
          : "Unable to save service."
      );
    } finally {
      setSavingService(false);
    }
  };

  const deleteService = async (id: number) => {
    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/services/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to delete service.");
      }

      await fetchServices();
      await fetchCounts();
    } catch (error) {
      console.error("Delete service error:", error);
      setServiceError("Unable to delete service.");
    }
  };

  const openAddExperience = () => {
    setEditingExperience(null);
    setExperienceForm(emptyExperienceForm);
    setExperienceError("");
    setShowExperienceForm(true);
  };

  const openEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    setExperienceForm({
      company: experience.company,
      role: experience.role,
      description: experience.description,
      start_date: experience.start_date || "",
      end_date: experience.end_date || "",
      is_current: experience.is_current,
    });
    setExperienceError("");
    setShowExperienceForm(true);
  };

  const handleExperienceSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = getToken();
    if (!token) { router.push("/admin/login"); return; }
    setSavingExperience(true); setExperienceError("");
    try {
      const payload = {
        company: experienceForm.company,
        role: experienceForm.role,
        description: experienceForm.description,
        start_date: experienceForm.start_date,
        end_date: experienceForm.is_current ? null : (experienceForm.end_date || null),
        is_current: experienceForm.is_current,
      };
      const url = editingExperience
        ? `${API}/experience/${editingExperience.id}/`
        : `${API}/experience/`;
      const response = await fetch(url, {
        method: editingExperience ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Unable to save experience.");
      setShowExperienceForm(false);
      setEditingExperience(null);
      setExperienceForm(emptyExperienceForm);
      await fetchExperiences();
      await fetchCounts();
    } catch (error) {
      console.error("Save experience error:", error);
      setExperienceError(error instanceof Error ? error.message : "Unable to save experience.");
    } finally {
      setSavingExperience(false);
    }
  };

  const deleteExperience = async (id: number) => {
    const token = getToken();
    if (!token) { router.push("/admin/login"); return; }
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      const response = await fetch(`${API}/experience/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Unable to delete experience.");
      await fetchExperiences();
      await fetchCounts();
    } catch (error) {
      console.error("Delete experience error:", error);
      setExperienceError("Unable to delete experience.");
    }
  };

  const openAddProject = () => { setEditingProject(null); setProjectForm(emptyForm); setProjectError(""); setShowProjectForm(true); };
  const openEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({ title: project.title, description: project.description, technologies: project.technologies,
      github_url: project.github_url, live_url: project.live_url, status: project.status, image: null });
    setProjectError(""); setShowProjectForm(true);
  };

  const handleProjectSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = getToken();
    if (!token) { router.push("/admin/login"); return; }
    setSavingProject(true); setProjectError("");
    try {
      const formData = new FormData();
      formData.append("title", projectForm.title); formData.append("description", projectForm.description);
      formData.append("technologies", projectForm.technologies); formData.append("github_url", projectForm.github_url);
      formData.append("live_url", projectForm.live_url); formData.append("status", projectForm.status);
      if (projectForm.image) formData.append("image", projectForm.image);
      const url = editingProject ? `${API}/projects/${editingProject.id}/` : `${API}/projects/`;
      const response = await fetch(url, { method: editingProject ? "PATCH" : "POST",
        headers: { Authorization: `Bearer ${token}` }, body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Unable to save project.");
      setShowProjectForm(false); setEditingProject(null); setProjectForm(emptyForm);
      await fetchProjects(); await fetchCounts();
    } catch (error) {
      console.error("Save project error:", error);
      setProjectError(error instanceof Error ? error.message : "Unable to save project.");
    } finally { setSavingProject(false); }
  };

  const deleteProject = async (id: number) => {
    const token = getToken(); if (!token) { router.push("/admin/login"); return; }
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`${API}/projects/${id}/`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Unable to delete project.");
      await fetchProjects(); await fetchCounts();
    } catch (error) { console.error("Delete project error:", error); setProjectError("Unable to delete project."); }
  };

  const openAddSkill = () => { setEditingSkill(null); setSkillForm(emptySkillForm); setSkillError(""); setShowSkillForm(true); };
  const openEditSkill = (skill: Skill) => {
    setEditingSkill(skill); setSkillForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency,
      icon: skill.icon, is_published: skill.is_published }); setSkillError(""); setShowSkillForm(true);
  };
  const handleSkillSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const token = getToken(); if (!token) { router.push("/admin/login"); return; }
    setSavingSkill(true); setSkillError("");
    try {
      const url = editingSkill ? `${API}/skills/${editingSkill.id}/` : `${API}/skills/`;
      const response = await fetch(url, { method: editingSkill ? "PATCH" : "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(skillForm) });
      const data = await response.json(); if (!response.ok) throw new Error(data.detail || "Unable to save skill.");
      setShowSkillForm(false); setEditingSkill(null); setSkillForm(emptySkillForm); await fetchSkills(); await fetchCounts();
    } catch (error) {
      console.error("Save skill error:", error); setSkillError(error instanceof Error ? error.message : "Unable to save skill.");
    } finally { setSavingSkill(false); }
  };
  const deleteSkill = async (id: number) => {
    const token = getToken(); if (!token) { router.push("/admin/login"); return; }
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      const response = await fetch(`${API}/skills/${id}/`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Unable to delete skill."); await fetchSkills(); await fetchCounts();
    } catch (error) { console.error("Delete skill error:", error); setSkillError("Unable to delete skill."); }
  };

  const openAddAbout = () => { setAboutForm(emptyAboutForm); setAboutError(""); setShowAboutForm(true); };
  const openEditAbout = () => {
    if (!about) { openAddAbout(); return; }
    setAboutForm({ name: about.name, title: about.title, bio: about.bio, email: about.email,
      phone: about.phone, location: about.location, profile_image: null });
    setAboutError(""); setShowAboutForm(true);
  };
  const handleAboutSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const token = getToken(); if (!token) { router.push("/admin/login"); return; }
    setSavingAbout(true); setAboutError("");
    try {
      const formData = new FormData();
      formData.append("name", aboutForm.name); formData.append("title", aboutForm.title); formData.append("bio", aboutForm.bio);
      formData.append("email", aboutForm.email); formData.append("phone", aboutForm.phone); formData.append("location", aboutForm.location);
      if (aboutForm.profile_image) formData.append("profile_image", aboutForm.profile_image);
      const url = about ? `${API}/about/${about.id}/` : `${API}/about/`;
      const response = await fetch(url, { method: about ? "PATCH" : "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      const data = await response.json(); if (!response.ok) throw new Error(data.detail || "Unable to save about information.");
      setAbout(data); setShowAboutForm(false); setAboutForm({ ...emptyAboutForm }); await fetchAbout(); await fetchCounts();
    } catch (error) {
      console.error("Save about error:", error); setAboutError(error instanceof Error ? error.message : "Unable to save about information.");
    } finally { setSavingAbout(false); }
  };
  const deleteAbout = async () => {
    const token = getToken(); if (!token || !about) { if (!token) router.push("/admin/login"); return; }
    if (!window.confirm("Are you sure you want to delete the About information?")) return;
    try {
      const response = await fetch(`${API}/about/${about.id}/`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Unable to delete about information.");
      setAbout(null); setAboutForm(emptyAboutForm); await fetchAbout(); await fetchCounts();
    } catch (error) { console.error("Delete about error:", error); setAboutError("Unable to delete about information."); }
  };

    const openSection = (section: string) => {
    setActiveSection(section);

    if (section === "Projects") fetchProjects();
    if (section === "Skills") fetchSkills();
    if (section === "About") fetchAbout();
    if (section === "Experience") fetchExperiences();
    if (section === "Services") fetchServices();
    if (section === "Blogs") fetchBlogs();
    if (section === "Testimonials") fetchTestimonials();
    if (section === "Messages") fetchMessages();
    if (section === "Media") fetchMedia();
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token"); router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-gray-950 text-white">
        <div className="border-b border-gray-800 p-6"><p className="text-xs uppercase tracking-[0.25em] text-gray-400">Portfolio</p><h1 className="mt-2 text-xl font-bold">Custom CMS</h1></div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <button onClick={() => openSection("Overview")} className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${activeSection === "Overview" ? "bg-white text-gray-950" : "text-gray-300 hover:bg-gray-800"}`}>Dashboard</button>
          {menuItems.map((item) => <button key={item.endpoint} onClick={() => openSection(item.name)} className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${activeSection === item.name ? "bg-white text-gray-950" : "text-gray-300 hover:bg-gray-800"}`}>{item.name}</button>)}
        </nav>
        <div className="border-t border-gray-800 p-4"><button onClick={handleLogout} className="w-full rounded-lg px-4 py-3 text-left text-sm text-red-400 transition hover:bg-gray-800">Logout</button></div>
      </aside>

      <main className="ml-64 min-h-screen flex-1">
        <header className="flex items-center justify-between border-b bg-white px-8 py-5"><div><h2 className="text-2xl font-bold text-gray-900">{activeSection}</h2><p className="mt-1 text-sm text-gray-500">Manage your portfolio content from one place.</p></div><div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">Admin</div></header>
        <section className="p-8">
          {activeSection === "Overview" && <><div className="mb-8"><h3 className="text-lg font-semibold">Content Overview</h3><p className="mt-1 text-sm text-gray-500">Current content stored in your CMS.</p></div>{loading ? <div className="rounded-xl bg-white p-8 text-center shadow-sm">Loading dashboard...</div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{menuItems.map((item) => <button key={item.endpoint} onClick={() => openSection(item.name)} className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"><p className="text-sm font-medium text-gray-500">{item.name}</p><p className="mt-3 text-3xl font-bold text-gray-900">{counts[item.name] ?? 0}</p><p className="mt-2 text-xs text-gray-400">Records</p></button>)}</div>}<div className="mt-8 rounded-xl border border-gray-200 bg-white p-6"><h3 className="text-lg font-semibold">CMS Status</h3><div className="mt-4 flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-green-500"></span><span className="text-sm text-gray-600">Backend API connected</span></div></div></>}

          {activeSection === "About" && <div>
            <div className="mb-6 flex items-center justify-between"><div><h3 className="text-xl font-semibold">About Management</h3><p className="mt-1 text-sm text-gray-500">Manage your portfolio profile and personal information.</p></div><button onClick={openAddAbout} className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">+ Add About</button></div>
            {aboutError && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{aboutError}</div>}
            {aboutLoading ? <div className="rounded-xl bg-white p-8 text-center shadow-sm">Loading about information...</div> : !about ? <div className="rounded-xl bg-white p-10 text-center shadow-sm"><h4 className="text-lg font-semibold">No About information found</h4><p className="mt-2 text-sm text-gray-500">Add your portfolio profile information.</p></div> : <div className="rounded-xl bg-white p-6 shadow-sm"><div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"><div className="flex gap-5">{about.profile_image ? <img src={about.profile_image} alt={about.name} className="h-28 w-28 rounded-xl object-cover" /> : <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">No Image</div>}<div><h4 className="text-2xl font-semibold">{about.name}</h4><p className="mt-1 text-gray-600">{about.title}</p><p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">{about.bio}</p><div className="mt-4 space-y-1 text-sm text-gray-500"><p><strong>Email:</strong> {about.email || "—"}</p><p><strong>Phone:</strong> {about.phone || "—"}</p><p><strong>Location:</strong> {about.location || "—"}</p></div></div></div><div className="flex shrink-0 gap-2"><button onClick={openEditAbout} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">Edit</button><button onClick={deleteAbout} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">Delete</button></div></div></div>}
            {showAboutForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"><div className="mb-6 flex items-center justify-between"><div><h3 className="text-xl font-bold">{about ? "Edit About" : "Add About"}</h3><p className="mt-1 text-sm text-gray-500">Manage your portfolio profile information.</p></div><button type="button" onClick={() => setShowAboutForm(false)} className="text-2xl text-gray-400 hover:text-gray-900">×</button></div>
              <form onSubmit={handleAboutSubmit} className="space-y-5">
                <div><label className="mb-2 block text-sm font-medium">Name</label><input type="text" required value={aboutForm.name} onChange={(e) => setAboutForm({ ...aboutForm, name: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Nisha Singh" /></div>
                <div><label className="mb-2 block text-sm font-medium">Title</label><input type="text" required value={aboutForm.title} onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Full Stack Software Developer" /></div>
                <div><label className="mb-2 block text-sm font-medium">Bio</label><textarea required rows={5} value={aboutForm.bio} onChange={(e) => setAboutForm({ ...aboutForm, bio: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Tell visitors about yourself..." /></div>
                <div className="grid gap-5 md:grid-cols-2"><div><label className="mb-2 block text-sm font-medium">Email</label><input type="email" value={aboutForm.email} onChange={(e) => setAboutForm({ ...aboutForm, email: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div><div><label className="mb-2 block text-sm font-medium">Phone</label><input type="text" value={aboutForm.phone} onChange={(e) => setAboutForm({ ...aboutForm, phone: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div></div>
                <div><label className="mb-2 block text-sm font-medium">Location</label><input type="text" value={aboutForm.location} onChange={(e) => setAboutForm({ ...aboutForm, location: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div>
                <div><label className="mb-2 block text-sm font-medium">Profile Image</label><input type="file" accept="image/*" onChange={(e) => setAboutForm({ ...aboutForm, profile_image: e.target.files?.[0] || null })} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" /><p className="mt-2 text-xs text-gray-400">Optional. Upload JPG, PNG, or another supported image.</p></div>
                {aboutError && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{aboutError}</div>}
                <div className="flex justify-end gap-3 border-t pt-5"><button type="button" onClick={() => setShowAboutForm(false)} className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50">Cancel</button><button type="submit" disabled={savingAbout} className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">{savingAbout ? "Saving..." : about ? "Update About" : "Create About"}</button></div>
              </form>
            </div></div>}
          </div>}

          {activeSection === "Projects" && <div>
            <div className="mb-6 flex items-center justify-between"><div><h3 className="text-xl font-semibold">Projects Management</h3><p className="mt-1 text-sm text-gray-500">Add, edit, publish, or delete portfolio projects.</p></div><button onClick={openAddProject} className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">+ Add Project</button></div>
            {projectError && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{projectError}</div>}
            {projectsLoading ? <div className="rounded-xl bg-white p-8 text-center shadow-sm">Loading projects...</div> : projects.length === 0 ? <div className="rounded-xl bg-white p-10 text-center shadow-sm"><h4 className="text-lg font-semibold">No projects found</h4><p className="mt-2 text-sm text-gray-500">Add your first portfolio project.</p></div> : <div className="space-y-4">{projects.map((project) => <div key={project.id} className="rounded-xl bg-white p-6 shadow-sm"><div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"><div className="flex gap-5">{project.image ? <img src={project.image} alt={project.title} className="h-24 w-24 rounded-lg object-cover" /> : <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">No Image</div>}<div><div className="flex flex-wrap items-center gap-3"><h4 className="text-lg font-semibold">{project.title}</h4><span className={`rounded-full px-3 py-1 text-xs font-medium ${project.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{project.status}</span></div><p className="mt-2 max-w-2xl text-sm text-gray-600">{project.description}</p>{project.technologies && <p className="mt-3 text-xs text-gray-500"><strong>Technologies:</strong> {project.technologies}</p>}<div className="mt-3 flex flex-wrap gap-4 text-sm">{project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-700 underline">GitHub</a>}{project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-gray-700 underline">Live Demo</a>}</div></div></div><div className="flex shrink-0 gap-2"><button onClick={() => openEditProject(project)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">Edit</button><button onClick={() => deleteProject(project.id)} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">Delete</button></div></div></div>)}</div>}
            {showProjectForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"><div className="mb-6 flex items-center justify-between"><div><h3 className="text-xl font-bold">{editingProject ? "Edit Project" : "Add Project"}</h3><p className="mt-1 text-sm text-gray-500">Manage project information.</p></div><button onClick={() => setShowProjectForm(false)} className="text-2xl text-gray-400 hover:text-gray-900">×</button></div><form onSubmit={handleProjectSubmit} className="space-y-5">
              <div><label className="mb-2 block text-sm font-medium">Project Title</label><input type="text" required value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div>
              <div><label className="mb-2 block text-sm font-medium">Description</label><textarea required rows={5} value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div>
              <div><label className="mb-2 block text-sm font-medium">Technologies</label><input type="text" value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Python, Flask, SQL" /></div>
              <div><label className="mb-2 block text-sm font-medium">GitHub URL</label><input type="url" value={projectForm.github_url} onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div>
              <div><label className="mb-2 block text-sm font-medium">Live Demo URL</label><input type="url" value={projectForm.live_url} onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div>
              <div><label className="mb-2 block text-sm font-medium">Status</label><select value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as "draft" | "published" })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"><option value="draft">Draft</option><option value="published">Published</option></select></div>
              <div><label className="mb-2 block text-sm font-medium">Project Image</label><input type="file" accept="image/*" onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files?.[0] || null })} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" /></div>
              {projectError && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{projectError}</div>}
              <div className="flex justify-end gap-3 border-t pt-5"><button type="button" onClick={() => setShowProjectForm(false)} className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50">Cancel</button><button type="submit" disabled={savingProject} className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">{savingProject ? "Saving..." : editingProject ? "Update Project" : "Create Project"}</button></div>
            </form></div></div>}
          </div>}

          {activeSection === "Skills" && <div>
            <div className="mb-6 flex items-center justify-between"><div><h3 className="text-xl font-semibold">Skills Management</h3><p className="mt-1 text-sm text-gray-500">Add, edit, publish, or delete your portfolio skills.</p></div><button onClick={openAddSkill} className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">+ Add Skill</button></div>
            {skillError && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{skillError}</div>}
            {skillsLoading ? <div className="rounded-xl bg-white p-8 text-center shadow-sm">Loading skills...</div> : skills.length === 0 ? <div className="rounded-xl bg-white p-10 text-center shadow-sm"><h4 className="text-lg font-semibold">No skills found</h4><p className="mt-2 text-sm text-gray-500">Add your first portfolio skill.</p></div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{skills.map((skill) => <div key={skill.id} className="rounded-xl bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><h4 className="text-lg font-semibold">{skill.name}</h4><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${skill.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{skill.is_published ? "Published" : "Hidden"}</span></div>{skill.category && <p className="mt-1 text-sm text-gray-500">{skill.category}</p>}</div>{skill.icon && <span className="rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-600">{skill.icon}</span>}</div><div className="mt-5"><div className="mb-2 flex items-center justify-between text-sm"><span className="text-gray-500">Proficiency</span><span className="font-semibold text-gray-900">{skill.proficiency}%</span></div><div className="h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-gray-950" style={{ width: `${skill.proficiency}%` }} /></div></div><div className="mt-5 flex gap-2"><button onClick={() => openEditSkill(skill)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">Edit</button><button onClick={() => deleteSkill(skill.id)} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">Delete</button></div></div>)}</div>}
            {showSkillForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"><div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl"><div className="mb-6 flex items-center justify-between"><div><h3 className="text-xl font-bold">{editingSkill ? "Edit Skill" : "Add Skill"}</h3><p className="mt-1 text-sm text-gray-500">Manage skill information.</p></div><button type="button" onClick={() => setShowSkillForm(false)} className="text-2xl text-gray-400 hover:text-gray-900">×</button></div><form onSubmit={handleSkillSubmit} className="space-y-5">
              <div><label className="mb-2 block text-sm font-medium">Skill Name</label><input type="text" required value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Python" /></div>
              <div><label className="mb-2 block text-sm font-medium">Category</label><input type="text" value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Programming" /></div>
              <div><div className="mb-2 flex items-center justify-between"><label className="block text-sm font-medium">Proficiency</label><span className="text-sm font-semibold">{skillForm.proficiency}%</span></div><input type="range" min="0" max="100" value={skillForm.proficiency} onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })} className="w-full" /></div>
              <div><label className="mb-2 block text-sm font-medium">Icon</label><input type="text" value={skillForm.icon} onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="python" /></div>
              <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={skillForm.is_published} onChange={(e) => setSkillForm({ ...skillForm, is_published: e.target.checked })} className="h-4 w-4" />Publish this skill</label>
              {skillError && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{skillError}</div>}
              <div className="flex justify-end gap-3 border-t pt-5"><button type="button" onClick={() => setShowSkillForm(false)} className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50">Cancel</button><button type="submit" disabled={savingSkill} className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">{savingSkill ? "Saving..." : editingSkill ? "Update Skill" : "Create Skill"}</button></div>
            </form></div></div>}
          </div>}


          {activeSection === "Experience" && <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Experience Management</h3>
                <p className="mt-1 text-sm text-gray-500">Add, edit, or delete your professional experience.</p>
              </div>
              <button onClick={openAddExperience} className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">+ Add Experience</button>
            </div>

            {experienceError && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{experienceError}</div>}

            {experiencesLoading ? (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">Loading experience...</div>
            ) : experiences.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                <h4 className="text-lg font-semibold">No experience found</h4>
                <p className="mt-2 text-sm text-gray-500">Add your first professional experience.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences.map((experience) => (
                  <div key={experience.id} className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="text-lg font-semibold">{experience.role}</h4>
                          {experience.is_current && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Current</span>}
                        </div>
                        <p className="mt-1 font-medium text-gray-700">{experience.company}</p>
                        <p className="mt-2 text-sm text-gray-500">
                          {experience.start_date} — {experience.is_current ? "Present" : (experience.end_date || "Present")}
                        </p>
                        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">{experience.description}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button onClick={() => openEditExperience(experience)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">Edit</button>
                        <button onClick={() => deleteExperience(experience.id)} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showExperienceForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{editingExperience ? "Edit Experience" : "Add Experience"}</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage your professional experience information.</p>
                  </div>
                  <button type="button" onClick={() => setShowExperienceForm(false)} className="text-2xl text-gray-400 hover:text-gray-900">×</button>
                </div>

                <form onSubmit={handleExperienceSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Company</label>
                    <input type="text" required value={experienceForm.company} onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Labmantix" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Role</label>
                    <input type="text" required value={experienceForm.role} onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Python Developer Intern" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Description</label>
                    <textarea required rows={5} value={experienceForm.description} onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" placeholder="Describe your responsibilities, work, and achievements..." />
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Start Date</label>
                      <input type="date" required value={experienceForm.start_date} onChange={(e) => setExperienceForm({ ...experienceForm, start_date: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">End Date</label>
                      <input type="date" disabled={experienceForm.is_current} value={experienceForm.end_date} onChange={(e) => setExperienceForm({ ...experienceForm, end_date: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:bg-gray-100" />
                    </div>
                  </div>
                  <label className="flex items-center gap-3 text-sm font-medium">
                    <input type="checkbox" checked={experienceForm.is_current} onChange={(e) => setExperienceForm({ ...experienceForm, is_current: e.target.checked, end_date: e.target.checked ? "" : experienceForm.end_date })} className="h-4 w-4" />
                    This is my current experience
                  </label>

                  {experienceError && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{experienceError}</div>}
                  <div className="flex justify-end gap-3 border-t pt-5">
                    <button type="button" onClick={() => setShowExperienceForm(false)} className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={savingExperience} className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
                      {savingExperience ? "Saving..." : editingExperience ? "Update Experience" : "Create Experience"}
                    </button>
                  </div>
                </form>
              </div>
            </div>}
          </div>}

                    {activeSection === "Services" && <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Services Management</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add, edit, publish, or delete your portfolio services.
                </p>
              </div>

              <button
                onClick={openAddService}
                className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                + Add Service
              </button>
            </div>

            {serviceError && (
              <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {serviceError}
              </div>
            )}

            {servicesLoading ? (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                Loading services...
              </div>
            ) : services.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                <h4 className="text-lg font-semibold">
                  No services found
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Add your first portfolio service.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold">
                            {service.title}
                          </h4>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              service.is_published
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {service.is_published
                              ? "Published"
                              : "Hidden"}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          {service.description}
                        </p>

                        {service.icon && (
                          <div className="mt-4">
                            <span className="rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-600">
                              Icon: {service.icon}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2 border-t pt-4">
                      <button
                        onClick={() => openEditService(service)}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteService(service.id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showServiceForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
                <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">

                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">
                        {editingService
                          ? "Edit Service"
                          : "Add Service"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Manage service information.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowServiceForm(false)}
                      className="text-2xl text-gray-400 hover:text-gray-900"
                    >
                      ×
                    </button>
                  </div>

                  <form
                    onSubmit={handleServiceSubmit}
                    className="space-y-5"
                  >

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Service Title
                      </label>

                      <input
                        type="text"
                        required
                        value={serviceForm.title}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            title: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="Web Development"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Description
                      </label>

                      <textarea
                        required
                        rows={5}
                        value={serviceForm.description}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="Describe the service you provide..."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Icon
                      </label>

                      <input
                        type="text"
                        value={serviceForm.icon}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            icon: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="web"
                      />

                      <p className="mt-2 text-xs text-gray-400">
                        Example: web, code, database, mobile
                      </p>
                    </div>

                    <label className="flex items-center gap-3 text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={serviceForm.is_published}
                        onChange={(e) =>
                          setServiceForm({
                            ...serviceForm,
                            is_published: e.target.checked,
                          })
                        }
                        className="h-4 w-4"
                      />

                      Publish this service
                    </label>

                    {serviceError && (
                      <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {serviceError}
                      </div>
                    )}

                    <div className="flex justify-end gap-3 border-t pt-5">

                      <button
                        type="button"
                        onClick={() => setShowServiceForm(false)}
                        className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={savingService}
                        className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {savingService
                          ? "Saving..."
                          : editingService
                          ? "Update Service"
                          : "Create Service"}
                      </button>

                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>}
                    {activeSection === "Blogs" && <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Blogs Management
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add, edit, publish, or delete your portfolio blogs.
                </p>
              </div>

              <button
                onClick={openAddBlog}
                className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                + Add Blog
              </button>
            </div>

            {blogError && (
              <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {blogError}
              </div>
            )}

            {blogsLoading ? (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                Loading blogs...
              </div>
            ) : blogs.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                <h4 className="text-lg font-semibold">
                  No blogs found
                </h4>
                <p className="mt-2 text-sm text-gray-500">
                  Add your first portfolio blog.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="rounded-xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      
                      <div className="flex gap-5">
                        {blog.featured_image ? (
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="h-24 w-24 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                            No Image
                          </div>
                        )}

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-lg font-semibold">
                              {blog.title}
                            </h4>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                blog.status === "published"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {blog.status}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-gray-500">
                            Slug: {blog.slug}
                          </p>

                          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                            {blog.content.length > 250
                              ? `${blog.content.substring(0, 250)}...`
                              : blog.content}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => openEditBlog(blog)}
                          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showBlogForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
                <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">

                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">
                        {editingBlog ? "Edit Blog" : "Add Blog"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Manage your blog content.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowBlogForm(false)}
                      className="text-2xl text-gray-400 hover:text-gray-900"
                    >
                      ×
                    </button>
                  </div>

                  <form
                    onSubmit={handleBlogSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Blog Title
                      </label>

                      <input
                        type="text"
                        required
                        value={blogForm.title}
                        onChange={(e) =>
                          setBlogForm({
                            ...blogForm,
                            title: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="Getting Started with Machine Learning"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Slug
                      </label>

                      <input
                        type="text"
                        required
                        value={blogForm.slug}
                        onChange={(e) =>
                          setBlogForm({
                            ...blogForm,
                            slug: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="getting-started-with-machine-learning"
                      />

                      <p className="mt-2 text-xs text-gray-400">
                        Use lowercase letters, numbers, and hyphens.
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Content
                      </label>

                      <textarea
                        required
                        rows={10}
                        value={blogForm.content}
                        onChange={(e) =>
                          setBlogForm({
                            ...blogForm,
                            content: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        placeholder="Write your blog content here..."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Status
                      </label>

                      <select
                        value={blogForm.status}
                        onChange={(e) =>
                          setBlogForm({
                            ...blogForm,
                            status: e.target.value as
                              | "draft"
                              | "published",
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Featured Image
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setBlogForm({
                            ...blogForm,
                            featured_image:
                              e.target.files?.[0] || null,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
                      />

                      <p className="mt-2 text-xs text-gray-400">
                        Optional. Upload JPG, PNG, or another supported image.
                      </p>
                    </div>

                    {blogError && (
                      <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {blogError}
                      </div>
                    )}

                    <div className="flex justify-end gap-3 border-t pt-5">
                      <button
                        type="button"
                        onClick={() => setShowBlogForm(false)}
                        className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={savingBlog}
                        className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {savingBlog
                          ? "Saving..."
                          : editingBlog
                          ? "Update Blog"
                          : "Create Blog"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
          </div>}
          {activeSection === "Testimonials" && (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <p className="text-gray-500">
          Manage testimonials displayed on your portfolio.
        </p>
      </div>

      <button
        onClick={openAddTestimonial}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        + Add Testimonial
      </button>
    </div>

    {testimonialError && (
      <p className="text-red-500 mb-4">{testimonialError}</p>
    )}

    {testimonialsLoading ? (
      <p>Loading testimonials...</p>
    ) : testimonials.length === 0 ? (
      <div className="border rounded-lg p-6 text-gray-500">
        No testimonials found.
      </div>
    ) : (
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="border rounded-lg p-5 flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {testimonial.name}
              </h3>

              {testimonial.role && (
                <p className="text-sm text-gray-500">
                  {testimonial.role}
                </p>
              )}

              <p className="mt-2 text-gray-700">
                {testimonial.message}
              </p>

              <p className="mt-2 text-sm">
                Status:{" "}
                <span
                  className={
                    testimonial.is_published
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {testimonial.is_published
                    ? "Published"
                    : "Hidden"}
                </span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEditTestimonial(testimonial)}
                className="px-3 py-1 border rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTestimonial(testimonial.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {showTestimonialForm && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold">
              {editingTestimonial
                ? "Edit Testimonial"
                : "Add Testimonial"}
            </h3>

            <button
              type="button"
              onClick={() => setShowTestimonialForm(false)}
              className="text-gray-500 text-xl"
            >
              ×
            </button>
          </div>

          <form
            onSubmit={handleTestimonialSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={testimonialForm.name}
              onChange={(e) =>
                setTestimonialForm({
                  ...testimonialForm,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />

            <input
              type="text"
              placeholder="Role"
              value={testimonialForm.role}
              onChange={(e) =>
                setTestimonialForm({
                  ...testimonialForm,
                  role: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <textarea
              placeholder="Testimonial message"
              value={testimonialForm.message}
              onChange={(e) =>
                setTestimonialForm({
                  ...testimonialForm,
                  message: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2 min-h-32"
              required
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={testimonialForm.is_published}
                onChange={(e) =>
                  setTestimonialForm({
                    ...testimonialForm,
                    is_published: e.target.checked,
                  })
                }
              />
              Published
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setTestimonialForm({
                  ...testimonialForm,
                  image: e.target.files?.[0] || null,
                })
              }
              className="w-full"
            />

            {testimonialError && (
              <p className="text-red-500 text-sm">
                {testimonialError}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={savingTestimonial}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                {savingTestimonial
                  ? "Saving..."
                  : editingTestimonial
                  ? "Update Testimonial"
                  : "Add Testimonial"}
              </button>

              <button
                type="button"
                onClick={() => setShowTestimonialForm(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    )}
  </div>
)}


{activeSection === "Messages" && (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      <p className="text-gray-500">
        View and manage messages received from the portfolio contact form.
      </p>
    </div>

    {messageError && (
      <p className="text-red-500 mb-4">{messageError}</p>
    )}

    {messagesLoading ? (
      <p>Loading messages...</p>
    ) : messages.length === 0 ? (
      <div className="border rounded-lg p-6 text-gray-500">
        No messages found.
      </div>
    ) : (
      <div className="space-y-4">
        {messages.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.email}
                </p>

                {item.subject && (
                  <p className="mt-2 font-medium">
                    Subject: {item.subject}
                  </p>
                )}

                <p className="mt-3 text-gray-700">
                  {item.message}
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>

              <span
                className={
                  item.is_read
                    ? "text-green-600 text-sm"
                    : "text-red-600 text-sm font-medium"
                }
              >
                {item.is_read ? "Read" : "Unread"}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}

{activeSection === "Media" && (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold">Media</h2>
      <p className="text-gray-500">
        Upload and manage media files for your portfolio.
      </p>
    </div>

    {mediaError && (
      <p className="text-red-500 mb-4">{mediaError}</p>
    )}

    <div className="border rounded-lg p-5 mb-6">
      <h3 className="font-semibold mb-3">Upload Media</h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="file"
          onChange={(e) =>
            setMediaFile(e.target.files?.[0] || null)
          }
          className="border rounded-lg px-3 py-2"
        />

        <button
          onClick={handleMediaUpload}
          disabled={uploadingMedia || !mediaFile}
          className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {uploadingMedia ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>

    {mediaLoading ? (
      <p>Loading media...</p>
    ) : media.length === 0 ? (
      <div className="border rounded-lg p-6 text-gray-500">
        No media files found.
      </div>
    ) : (
      <div className="space-y-3">
        {media.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex items-center justify-between gap-4"
          >
            <div>
              <p className="font-medium break-all">
                {item.file}
              </p>

              <p className="text-sm text-gray-500">
                Uploaded:{" "}
                {new Date(item.uploaded_at).toLocaleString()}
              </p>
            </div>

            <a
              href={
                item.file.startsWith("http")
                  ? item.file
                  : `http://127.0.0.1:8000${item.file}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="border px-3 py-1 rounded-lg"
            >
              View
            </a>
          </div>
        ))}
      </div>
    )}
  </div>
)}
          {activeSection !== "Overview" &&
           activeSection !== "Projects" &&
           activeSection !== "Skills" &&
           activeSection !== "About" &&
           activeSection !== "Experience" &&
           activeSection !== "Services" &&
           activeSection !== "Blogs" && 
           activeSection !== "Testimonials" &&
           activeSection !== "Messages" &&
           activeSection !== "Media" &&
           (
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold">
                {activeSection} Management
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                CMS management interface for {activeSection.toLowerCase()}.
              </p>

              <div className="mt-6 rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-600">
                  CRUD interface will be added here.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}