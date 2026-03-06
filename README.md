# Vignesh's Solar System Portfolio 🪐

An immersive, space-themed developer portfolio built with React and TypeScript. Navigate a miniature solar system where each orbiting planet represents a section — About, Projects, Skills, and Contact — all rendered with pure CSS transforms, parallax depth, and cinematic transitions.

## 🚀 Features

- **Orbital Navigation** — Planets orbit a central star at different speeds and radii. Click any planet to focus on it.
- **Projects Satellite System** — The Projects planet expands into its own mini solar system with orbiting satellites, each representing a project with architecture diagrams and tech details.
- **Parallax Starfield** — Multi-layered star backdrop (near, mid, far) that subtly shifts with mouse movement for a 3D depth feel.
- **Cinematic Transitions** — Smooth camera zoom, planet scaling, and fade effects when entering/exiting sections.
- **Architecture Diagrams** — Each project panel includes a visual node-connection diagram of its tech stack.
- **Contact Integration** — Functional contact form powered by **EmailJS**.
- **Dockerized Deployment** — Production-ready with Dockerfile, Nginx, and Docker Compose.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS (custom properties, transforms, keyframe animations)
- **Email Service**: @emailjs/browser
- **Deployment**: Docker, Nginx

## 📂 Project Structure

```
src/
├── components/
│   ├── SpatialHub.tsx         # Main scene — starfield, orbits, central star
│   ├── SpatialNode.tsx        # Individual orbiting planet
│   ├── ProjectSystem.tsx      # Satellite orbit system for projects
│   ├── ProjectPanel.tsx       # Project detail panel with architecture
│   ├── ArchitectureDiagram.tsx# Node-connection tech diagram
│   └── FocusPanel.tsx         # Generic section detail panel
├── data/
│   └── portfolioData.tsx      # All section, project, and architecture data
├── index.css                  # Full design system and animations
├── main.tsx                   # App entry point
└── App.tsx                    # Root component
```

## 📦 Setup & Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/vbg-07/Portfolio.git
    cd Portfolio
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure Environment Variables**
    Create a `.env` file in the root directory and add your EmailJS credentials:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4. **Run Development Server**
    ```bash
    npm run dev
    ```

## 🐳 Docker Deployment

```bash
docker compose up --build
```

This builds the production bundle and serves it via Nginx at `http://localhost:3000`.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
