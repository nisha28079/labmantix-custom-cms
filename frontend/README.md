# Labmantix Custom CMS Portfolio

A full-stack portfolio website with a custom-built Content Management System (CMS), REST API, JWT authentication, PostgreSQL database, media management, and a dedicated admin dashboard.

This project was developed as part of the Labmantix internship project.

---

## 🚀 Project Overview

The project is a full-stack portfolio website with a custom CMS built from scratch.

It consists of two major parts:

1. **Public Portfolio Website**
2. **Custom CMS Dashboard**

The public portfolio allows visitors to view personal information, skills, projects, experience, services, testimonials, blogs, and contact information.

The custom CMS allows an administrator to manage portfolio content through a dedicated dashboard without directly modifying the database.

---

## ✨ Features

### 🌐 Public Portfolio

- Home section
- About section
- Skills
- Projects
- Experience
- Services
- Testimonials
- Blog
- Contact form
- Responsive portfolio interface
- Dynamic content fetched from backend APIs

### 🖥️ Custom CMS Dashboard

- Admin login
- JWT authentication
- Dashboard overview
- About management
- Skills management
- Projects management
- Experience management
- Services management
- Blog management
- Testimonials management
- Contact messages
- Media management
- Media/file upload
- Draft / Published content status
- Create, Read, Update and Delete (CRUD) operations

### ⚙️ Backend & API

- RESTful API
- PostgreSQL database
- JWT authentication
- Admin-only write operations
- Public access to published content
- Image and file uploads
- API permissions
- Swagger / OpenAPI documentation
- Contact message storage

---

## 🏗️ Architecture

```text
                         ┌────────────────────────┐
                         │   Public Portfolio     │
                         │   Next.js Frontend     │
                         └────────────┬───────────┘
                                      │
                                      │ REST API
                                      ▼
                         ┌────────────────────────┐
                         │    Django REST API     │
                         │       Backend          │
                         └────────────┬───────────┘
                                      │
                 ┌────────────────────┼────────────────────┐
                 │                    │                    │
                 ▼                    ▼                    ▼
          PostgreSQL             JWT Auth           Media Storage
           Database
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │      Custom CMS        │
                         │   React / Next.js      │
                         │      Dashboard         │
                         └────────────────────────┘

🛠️ Technology Stack
Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- Pillow
- drf-spectacular
- django-cors-headers
Database
- PostgreSQL
Development Tools
- Visual Studio Code
- Git
- GitHub
- PowerShell
- npm
📁 Project Structure
Labmantix-Custom-CMS/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── core/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── permissions.py
│   ├── urls.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── page.tsx
│   │   │       ├── login/
│   │   │       └── dashboard/
│   │   │
│   │   └── lib/
│   │       └── api.ts
│   │
│   ├── package.json
│   └── ...
│
├── media/
│
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md

📦 Backend Setup
1. Clone the Repository
git clone <your-github-repository-url>
cd Labmantix-Custom-CMS

2. Create Virtual Environment
python -m venv venv

3. Activate Virtual Environment
For PowerShell:
.\venv\Scripts\Activate.ps1

4. Install Backend Dependencies
pip install -r requirements.txt

5. Configure PostgreSQL
Create a PostgreSQL database named:
labmantix_cms

Configure the PostgreSQL database credentials in the Django settings.
Do not commit database passwords or other sensitive credentials to GitHub.
6. Run Database Migrations
python manage.py migrate

7. Create Django Superuser
python manage.py createsuperuser

8. Start Django Server
python manage.py runserver

Backend will be available at:
http://127.0.0.1:8000

💻 Frontend Setup
Open a new terminal and move to the frontend directory:
cd frontend

Install dependencies:
npm install

Create a .env.local file inside the frontend folder:
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

Start the Next.js development server:
npm run dev

Frontend will be available at:
http://localhost:3000

🔐 Admin CMS
The custom CMS login page is available at:
http://localhost:3000/admin/login

After successful authentication, the administrator is redirected to the CMS dashboard.
The dashboard provides management sections for:
- Dashboard
- About
- Skills
- Projects
- Experience
- Services
- Blogs
- Testimonials
- Messages
- Media

🔑 Authentication
The backend uses JWT (JSON Web Token) authentication.
Login
POST /api/auth/login/

Refresh Token
POST /api/auth/refresh/

Authenticated requests use:
Authorization: Bearer <access_token>

Only authenticated staff/admin users can create, update, or delete CMS content.
📡 API Endpoints
The main API endpoints are:
/api/about/
/api/skills/
/api/projects/
/api/experience/
/api/services/
/api/blogs/
/api/testimonials/
/api/messages/
/api/media/

Authentication endpoints:
/api/auth/login/
/api/auth/refresh/

📚 API Documentation
Interactive Swagger documentation is available at:
http://127.0.0.1:8000/api/docs/

OpenAPI schema:
http://127.0.0.1:8000/api/schema/

Swagger provides an interactive interface for viewing and testing the available API endpoints.

🗃️ Content Management

About
The About section manages:
- Name
- Title
- Biography
- Profile image
- Email
- Phone
- Location

Skills
Skills support:
- Skill name
- Category
- Proficiency
- Icon
- Published status

Projects
Projects support:
- Title
- Description
- Project image
- Technologies
- GitHub URL
- Live URL
- Draft / Published status

Experience
Experience supports:
- Company
- Role
- Description
- Start date
- End date
- Current status

Services
Services support:
- Service title
- Description
- Icon
- Published status

Blogs
Blogs support:
- Title
- Slug
- Content
- Featured image
- Draft / Published status

Testimonials
Testimonials support:
- Name
- Role
- Message
- Image
- Published status

Messages
Contact messages include:
- Name
- Email
- Subject
- Message
- Created date
- Read / Unread status
Media

The CMS supports:
- File uploads
- Media listing
- Media access through the backend

📬 Contact System

Visitors can submit messages through the portfolio contact form.
The submitted messages are sent to the Django REST API and stored in the PostgreSQL database.
Administrators can view the submitted messages from the CMS dashboard.

🔒 Security

The project includes:

- JWT-based authentication
- Protected admin operations
- Admin-only write access
- Public read access for appropriate published content
- CORS configuration
- Environment variables for frontend configuration
- Database credentials kept outside the repository

Sensitive information such as:
- Database passwords
- Secret keys
- .env.local
should never be committed to GitHub.

🧪 Testing

Django System Check
python manage.py check

Run Backend
python manage.py runserver

Run Frontend
cd frontend
npm run dev

Build Frontend for Production
npm run build

The frontend production build has been successfully tested.

🎯 Project Objectives

The main objectives of this project are:

- Build a modern portfolio website
- Develop a custom CMS from scratch
- Create RESTful APIs using Django REST Framework
- Implement JWT-based authentication
- Integrate PostgreSQL with Django
- Implement CRUD operations
- Implement media upload functionality
- Manage portfolio content dynamically
- Provide API documentation
- Separate frontend and backend responsibilities
- Build a maintainable full-stack architecture


📌 Project Status
Completed — Functional Full-Stack Portfolio with Custom CMS

The project includes:

- Public portfolio website
- Custom CMS dashboard
- Django REST API
- PostgreSQL database
- JWT authentication
- CRUD functionality
- Media upload
- Contact message system
- Draft / Published content management
- Swagger / OpenAPI documentation
- Production frontend build verification


👩‍💻 Author
Nisha Singh
Computer Science Engineering Student
SATI, Vidisha, Madhya Pradesh, India

📄 License
This project was developed for internship and educational purposes.