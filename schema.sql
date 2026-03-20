-- Drop tables if re-running
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS admin_config;

-- Events table
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Admin config table (stores the hashed password)
CREATE TABLE admin_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Seed: default admin password hash
-- This is the bcrypt hash of "sceneco_admin" — change after first login!
-- Plain: sceneco_admin
-- You can regenerate with: https://bcrypt.online/ at cost factor 10
INSERT INTO admin_config (key, value) VALUES (
  'admin_password_hash',
  '$2a$10$n9CM8OgInDlwpvjLaLbuuuUlAaJnZVlq1FYBPxqJQNq2VFCmBbH9e'
);

-- Seed some starter past events
INSERT INTO events (title, category, date, description, image_url) VALUES
  ('TEDx Youth @ Example', 'TEDx', 'November 2025', 'A completely carbon-neutral TEDx event catering to over 500 attendees, featuring interactive zones and upcycled stage designs.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'),
  ('Global Tech Summit 2025', 'Corporate', 'August 2025', 'An experiential corporate summit blending cutting-edge tech showcases with sustainable hospitality, hosting 1200+ industry leaders.', 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80'),
  ('Eco-Fashion Launch', 'Brand Activation', 'June 2025', 'A stunning product launch for an eco-aware fashion label, featuring immersive botanical art installations and zero-waste catering.', 'https://images.unsplash.com/photo-1509822929063-6b6cfc2b4293?auto=format&fit=crop&w=800&q=80');
