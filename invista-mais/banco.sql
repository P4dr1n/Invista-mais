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
  email VARCHAR(255) NOT NULL,          -- Coluna EMAIL mantida
  codigo VARCHAR(6) NOT NULL,
  expira_em DATETIME NOT NULL,
  usado BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_expiracao (expira_em)       -- Índice para limpeza periódica
);
  


-- Tabela de Custo de Vida com estrutura normalizada
CREATE TABLE CustoVidaClasseMedia (
  Ano INT NOT NULL,
  Regiao VARCHAR(50) NOT NULL,
  SalarioMedio DECIMAL(15,2) NOT NULL,      
  Habitacao DECIMAL(7,2),                  
  Alimentacao DECIMAL(7,2),
  Transporte DECIMAL(7,2),
  EducacaoSaude DECIMAL(7,2),
  Lazer DECIMAL(7,2),
  Dividas DECIMAL(7,2),
  PercentualMoradia DECIMAL(7,2),          
  Fonte VARCHAR(255)
);