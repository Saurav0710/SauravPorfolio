import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ProjectPage from './pages/ProjectPage';
import AdminLogin from './pages/AdminLogin';
import AdminCategories from './pages/AdminCategories';
import AdminVideos from './pages/AdminVideos';

declare global {
  interface Window {
    __navigate?: (path: string) => void;
  }
}

const root = createRoot(document.getElementById('root')!);

function navigate(path: string) {
  if (window.location.pathname === path) return;
  window.history.pushState({}, '', path);
  renderPage();
}

window.__navigate = navigate;

function renderPage() {
  const pathname = window.location.pathname;
  const token = localStorage.getItem('adminToken');

  // route guards
  if (pathname.startsWith('/admin/login') && token) {
    window.location.href = '/admin/videos';
    return;
  }
  if (pathname.startsWith('/admin/videos') && !token) {
    window.location.href = '/admin/login';
    return;
  }
  if (pathname.startsWith('/admin/categories') && !token) {
    window.location.href = '/admin/login';
    return;
  }
  if ((pathname === '/admin' || pathname === '/admin/') && token) {
    window.location.href = '/admin/videos';
    return;
  }
  if ((pathname === '/admin' || pathname === '/admin/') && !token) {
    window.location.href = '/admin/login';
    return;
  }

  // match admin login page
  if (pathname.startsWith('/admin/login')) {
    root.render(
      <StrictMode>
        <AdminLogin />
      </StrictMode>
    );
  }
  // match admin categories
  else if (pathname.startsWith('/admin/categories')) {
    root.render(
      <StrictMode>
        <AdminCategories />
      </StrictMode>
    );
  }
  // match admin videos
  else if (pathname.startsWith('/admin/videos')) {
    root.render(
      <StrictMode>
        <AdminVideos />
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

window.addEventListener('popstate', () => {
  renderPage();
});
