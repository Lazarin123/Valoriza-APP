-- =============================================
--   VALORIZA DB - Script de Criação das Tabelas
--   Execute este script no seu banco MySQL (Railway)
-- =============================================

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(150)        NOT NULL,
  email           VARCHAR(150)        NOT NULL UNIQUE,
  password        VARCHAR(255)        NOT NULL,
  plan            ENUM('free','monthly') NOT NULL DEFAULT 'free',
  plan_expires_at DATETIME            NULL,
  created_at      DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Pagamentos
CREATE TABLE IF NOT EXISTS payments (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  user_id             INT             NOT NULL,
  pagseguro_order_id  VARCHAR(100)    NOT NULL UNIQUE,
  plan                ENUM('monthly') NOT NULL DEFAULT 'monthly',
  amount              DECIMAL(10,2)   NOT NULL,
  status              ENUM('WAITING','PAID','DECLINED','CANCELLED','REFUNDED') NOT NULL DEFAULT 'WAITING',
  paid_at             DATETIME        NULL,
  created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX idx_users_email       ON users(email);
CREATE INDEX idx_payments_user_id  ON payments(user_id);
CREATE INDEX idx_payments_order_id ON payments(pagseguro_order_id);
CREATE INDEX idx_payments_status   ON payments(status);
