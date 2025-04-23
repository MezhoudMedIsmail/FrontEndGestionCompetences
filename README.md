🌟 FrontEndGestionCompetences

A modern Angular-based frontend application for managing talent acquisition and competency evaluation within La Poste Tunisienne. This system is part of a broader solution that digitizes and streamlines the evaluation, feedback, and profile tracking processes in the organization.

🎯 Project Purpose

This frontend interfaces with a backend REST API to provide a complete talent management solution for HR departments. It includes dashboards, role-based access, evaluation modules, and user feedback handling.

🧰 Technologies Used

- Angular
- TypeScript
- RxJS
- Angular Router
- HTTP Interceptors
- SCSS / HTML5
- JWT Authentication (via Guard + Interceptor)

🗂️ Folder Structure

```
src/app/
├── Components/          # Main dashboard and feature modules
│   └── dashboard/
│       ├── evaluation/
│       ├── feedback/
│       ├── profile/
│       ├── question/
│       ├── reponse/
│       ├── theme/
│       └── users/
├── Guard/               # Route protection (auth guard)
├── Interceptor/         # JWT interceptor for requests
├── Models/              # TypeScript interfaces and models
├── Services/            # HTTP services for API integration
├── app.component.ts     # Root component
├── app.routes.ts        # Routing configuration
└── app.config.ts        # App-level settings
```

🚀 How to Run Locally

1. Clone the repository

```bash
git clone https://github.com/MezhoudMedIsmail/FrontEndGestionCompetences.git
cd FrontEndGestionCompetences
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
ng serve
```

4. Open your browser at `http://localhost:4200`

---

🔐 Authentication

This frontend uses JWT authentication with route protection (`AuthGuard`) and auto-token inclusion in API requests via an HTTP interceptor.

💡 Key Features

- ✅ Secure login and token-based authentication
- 📊 Dashboard for HR evaluations and user tracking
- 📂 Modular component structure
- 🧩 Reusable services and interface models
- 🌐 Connects to a Spring Boot backend for data operations

📦 Future Improvements

- Add internationalization (i18n)
- Improve UI responsiveness for mobile
- Integrate charts for evaluation analytics

🤝 Contributing

Pull requests are welcome! For major updates, please open an issue first to discuss potential changes.

---

Built with ❤️ for La Poste Tunisienne by [MezhoudMedIsmail](https://github.com/MezhoudMedIsmail)
