import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ProjectPage from './pages/ProjectPage';
import AdminLogin from './pages/AdminLogin';

const root = createRoot(document.getElementById('root')!);

function renderPage() {
  const pathname = window.location.pathname;

  // match admin login page
  if (pathname.startsWith('/admin/login')) {
    root.render(
      <StrictMode>
        <AdminLogin />
      </StrictMode>
    );
  }
  // match both `/projects` and `/projects/<key>`
  else if (pathname.startsWith('/projects')) {
    root.render(
      <StrictMode>
        <ProjectPage />
      </StrictMode>
    );
  } else {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

// Initial render
renderPage();

// Listen for navigation events
window.addEventListener('navigate-home', () => {
  renderPage();
  // Scroll to projects section
  setTimeout(() => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
});

// Listen for project navigation
window.addEventListener('navigate-project', () => {
  renderPage();
});
