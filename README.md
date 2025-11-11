# 🐾 Petly – Online Pet Adoption Platform

## 📌 Overview

[![Homepage](./assets/images/Home_min.jpg 'Petly')](https://petly-project.vercel.app/)

Petly is a full-stack web application for browsing and posting pet adoption or sale announcements.  
It allows users to register, add personal listings, communicate via contact forms, and securely upload images.  
Our mission is to help animals find caring homes by simplifying adoption and increasing awareness.

Join us in our mission to give every animal a loving and caring home.

🌐 [Live Site](https://petly-project.vercel.app/)  
📖 [Swagger API Docs](https://petly-backend-6jdb.onrender.com/api-docs/)  
📂 [Frontend GitHub](https://github.com/MaksymDziubanchuk/petly)  
📂 [Backend GitHub](https://github.com/MaksymDziubanchuk/petly-backend)

---

## ✨ Features

-   🐶 View pet listings by category
-   📝 Add/edit/delete personal pet posts
-   🔐 User registration, login, and JWT-based auth
-   📁 File uploads with Cloudinary & image processing
-   📬 Email sending (SendGrid)
-   📚 API documented with Swagger
-   📱 Responsive and mobile-first UI

---

## 🛠 Tech Stack

### 🖥 Frontend

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Redux toolkit](./assets/images/frontend/logo_redux_toolkit.png) ![Redux persist](./assets/images/frontend/logo_persist.png) ![Axios](./assets/images/frontend/logo_axios.png) ![Chakra](./assets/images/frontend/logo_chakra.png) ![date-fns](./assets/images/frontend/logo_date-fns.png) ![dotenv](./assets/images/frontend/logo_dotenv.png) ![formik](./assets/images/frontend/logo_formik.png) ![luxon](./assets/images/frontend/logo_luxon.png) ![nanoid](./assets/images/frontend/logo_nanoid.png) ![notiflix](./assets/images/frontend/logo_notiflix.png) ![flatpickr](./assets/images/frontend/logo_flatpickr.png) ![loader_spinner](./assets/images/frontend/logo_loader-spinner.png) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

> Also used: Redux Toolkit, Redux Persist, Chakra UI, Axios, Date-fns, Formik, Luxon, Notiflix, Flatpickr, Spinner loader, Nanoid

[GitHub](https://github.com/MaksymDziubanchuk/petly)

---

### 🔧 Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) ![sendgrid](./assets/images/backend/logo_sendgrid.png) ![bcrypt](./assets/images/backend/logo_bcrypt.png) ![cloudinary](./assets/images/backend/logo_cloudinary.png) ![dotenv](./assets/images/backend/logo_dotenv.png) ![express](./assets/images/backend/logo_express.png) ![jimp](./assets/images/backend/logo_jimp.png) ![joi](./assets/images/backend/logo_joi.png) ![jsonwebtoken](./assets/images/backend/logo_jsonwebtoken.png) ![mongoose](./assets/images/backend/logo_mongoose.png) ![nanoid](./assets/images/backend/logo_nanoid.png) ![gravatar](./assets/images/backend/logo_gravatar.png) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

> Also used: Mongoose, Joi, Jimp, Multer, Cloudinary, Bcrypt, SendGrid, Gravatar, Nanoid, Dotenv

[Swagger](https://petly-backend-6jdb.onrender.com/api-docs/)

---

## 🚀 Getting Started (Backend)

### 1. Clone repo

```bash
git clone https://github.com/MaksymDziubanchuk/petly-backend.git
cd petly-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env` file based on `.env.example` and provide your credentials:

```env
PORT=3000
DB_HOST=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
...

```
### 4. Start server

```bash
npm run start:dev
```

Or for production:

```bash
npm start
```
---

## 💻 Commands

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm start`         | Start the server in production mode  |
| `npm run start:dev` | Start the server in development mode |
| `npm run lint`      | Lint check using ESLint              |
| `npm run lint:fix`  | Auto-fix simple lint errors          |

---

## 👥 Team

### Frontend

-   Halyna Vorokh (Scrum Master)
-   Dmytro Zayets
-   Taras Perchyk
-   Evgen Grabar
-   Kateryna Bykova
-   Mykyta Kovpak
-   Olena Holovina
-   Anna Kasianenko

### Backend

-   Krystyna Varchuk (Team Lead)
-   Maksym Dziubanchuk
-   Sergiy Kudryavtsev

---

## 👨‍💻 Author's Contribution (Maksym Dziubanchuk)

As a backend developer in the Petly project, I was responsible for designing and implementing the majority of the server-side logic and functionality, including:

-   Development of RESTful API endpoints using Node.js and Express
-   CRUD operations for pet listings, user profiles, favorites, and news
-   Integration with MongoDB via Mongoose (schemas, models, queries)
-   File upload handling via Multer and image processing with Jimp
-   Integration with Cloudinary for secure image hosting
-   JWT-based user authentication and session control
-   API input validation using Joi
-   Environment configuration management using dotenv
-   Email integration setup via SendGrid
-   Writing and maintaining reusable middleware (auth, validation, file filter)
-   Project folder structure and base configuration

This experience gave me strong hands-on practice with backend development workflows, teamwork, and modern web infrastructure.
