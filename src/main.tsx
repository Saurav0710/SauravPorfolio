import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ProjectPage from './pages/ProjectPage';

const root = createRoot(document.getElementById('root')!);

function renderPage() {
  const pathname = window.location.pathname;

  // match both `/projects` and `/projects/<key>`
  if (pathname.startsWith('/projects')) {
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
