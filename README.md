
# Vignesh's 3D Desk Portfolio 🖥️

A highly interactive, immersive 3D developer portfolio built with React, Tailwind CSS, and Framer Motion. It features a "physical desk" interface where users can interact with everyday objects to explore my skills, projects, and contact info.

![Portfolio Preview](<img width="1872" height="1002" alt="image" src="https://github.com/user-attachments/assets/b11e2396-188f-4343-ab07-73882ea14dff" />


## 🚀 Features

-   **Interactive Desk Interface**: Clickable items (Monitor, Phone, Coffee Cup, Server Rack, Blueprints) that act as navigation.
-   **Immersive Zoom Animations**: Seamless "entering the screen" transitions when interacting with the monitor.
-   **Real-time Contact Form**: Fully functional contact terminal powered by **EmailJS** with custom error handling.
-   **Dynamic Background**: Smooth Aurora Borealis shader background.
-   **3D Tilt Effects**: Elements react to mouse movement for a pseudo-3D feel.
-   **Responsive Design**: Falls back to a mobile-friendly "Command Dashboard" on smaller screens.

## 🛠️ Tech Stack

-   **Frontend**: React 18, TypeScript, Vite
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **Charts**: Recharts (for Analytics visualization)
-   **Email Service**: @emailjs/browser

## 📦 Setup & Installation

1.  **Clone the Despository**
    ```bash
    git clone https://github.com/vbg-07/Portfolio.git
    cd Portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your EmailJS credentials:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```
    *(Refer to `.env.example`)*

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
