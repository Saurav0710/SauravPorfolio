-- PostgreSQL setup for saurav_portfolio

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(150),
  email VARCHAR(150),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Insert admin user
INSERT INTO admins (username, password_hash, display_name, email, is_active) VALUES
('admin', '$2a$10$x4hGmWQsZDKFnINhhcx65eO1rdtSjS51HngGxxmmgxa.nxbkz6wye', 'Administrator', 'admin@example.com', true)
ON CONFLICT (username) DO NOTHING;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  cat_key VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  cover VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  source VARCHAR(50) DEFAULT 'youtube',
  video_identifier VARCHAR(500) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumb VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (cat_key, title, subtitle, cover) VALUES
('brand-films', 'Brand Films', 'Cinematic storytelling for brands', NULL),
('genai', 'GenAI Creations', 'AI-powered creative content', NULL)
ON CONFLICT (cat_key) DO NOTHING;