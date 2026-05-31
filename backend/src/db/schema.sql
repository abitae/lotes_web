CREATE TABLE IF NOT EXISTS projects (
  id             VARCHAR(36) PRIMARY KEY,
  title          VARCHAR(255) NOT NULL,
  location       VARCHAR(255) NOT NULL,
  region         VARCHAR(100) NOT NULL,
  project_type   ENUM('Playero', 'Campestre', 'Urbano', 'Industrial') NOT NULL,
  surface        DECIMAL(10, 2) NOT NULL,
  price_soles    DECIMAL(12, 2) NOT NULL,
  price_dollars  DECIMAL(12, 2) NOT NULL,
  status         ENUM('Pre-venta', 'Inmediata', 'Vendido', 'En Obras') NOT NULL,
  image_url      TEXT NOT NULL,
  lat            DECIMAL(10, 7) NOT NULL,
  lng            DECIMAL(10, 7) NOT NULL,
  description    TEXT NOT NULL,
  features       JSON NOT NULL,
  featured       TINYINT(1) NOT NULL DEFAULT 0,
  total_lots     INT NOT NULL,
  available_lots INT NOT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

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
