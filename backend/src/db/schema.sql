CREATE TABLE IF NOT EXISTS banners (
  id          VARCHAR(36) PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  subtitle    TEXT NOT NULL,
  button_text VARCHAR(100) NOT NULL,
  image_url   TEXT NOT NULL,
  badge_text  VARCHAR(100) NULL,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id                VARCHAR(36) PRIMARY KEY,
  name              VARCHAR(255) NOT NULL,
  role              VARCHAR(255) NOT NULL,
  stars             TINYINT NOT NULL,
  quote             TEXT NOT NULL,
  project_purchased VARCHAR(255) NOT NULL,
  avatar_url        TEXT NOT NULL,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id               VARCHAR(36) PRIMARY KEY,
  full_name        VARCHAR(255) NOT NULL,
  phone            VARCHAR(20) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  project_interest VARCHAR(255) NOT NULL,
  message          TEXT NOT NULL,
  status           ENUM('Pendiente', 'Contactado', 'Archivado') NOT NULL DEFAULT 'Pendiente',
  notes            TEXT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
