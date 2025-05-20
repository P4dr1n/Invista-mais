CREATE DATABASE IF NOT EXISTS sistema_auth;
USE sistema_auth;

-- Tabela de Usuários com índices otimizados
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  sobrenome VARCHAR(255) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  verificado BOOLEAN DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),  -- Índice para buscas por email
  INDEX idx_cpf (cpf)       -- Índice para buscas por CPF
);

-- Tabela de Endereços com ENUM para mora_como
CREATE TABLE enderecos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  cep VARCHAR(8) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  mora_como ENUM('Sozinho', 'Com Familiares', 'Com Colegas', 'Outros') DEFAULT 'Sozinho',
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_usuario (usuario_id)  -- Índice para joins frequentes
);

-- Tabela de Códigos com relação direta ao usuário
CREATE TABLE codigos_verificacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  codigo VARCHAR(6) NOT NULL,
  expira_em DATETIME NOT NULL,
  utilizado BOOLEAN DEFAULT 0,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_expiracao (expira_em)  -- Índice para limpeza periódica
);

-- Tabela de Custo de Vida com estrutura normalizada
CREATE TABLE CustoVidaClasseMedia (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Chave primária única
    Ano INT NOT NULL,
    Regiao VARCHAR(50) NOT NULL,
    SalarioMedio DECIMAL(10,2) NOT NULL,
    Habitacao DECIMAL(5,2),       -- Percentual ajustado
    Alimentacao DECIMAL(5,2),     -- Percentual ajustado
    Transporte DECIMAL(5,2),      -- Percentual ajustado
    EducacaoSaude DECIMAL(5,2),   -- Percentual ajustado
    Lazer DECIMAL(5,2),           -- Percentual ajustado
    Dividas DECIMAL(5,2),         -- Percentual ajustado
    Fonte VARCHAR(100),
    UNIQUE KEY unq_ano_regiao (Ano, Regiao),  -- Garante combinação única
    INDEX idx_regiao (Regiao)      -- Índice para buscas por região
);