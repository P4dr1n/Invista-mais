CREATE DATABASE IF NOT EXISTS sistema_auth;
USE sistema_auth;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  sobrenome VARCHAR(255) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  verificado BOOLEAN DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enderecos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  cep VARCHAR(8) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  mora_como VARCHAR(50),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE codigos_verificacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  codigo VARCHAR(6) NOT NULL,
  expira_em DATETIME NOT NULL,
  utilizado BOOLEAN DEFAULT 0
);
CREATE TABLE CustoVidaClasseMedia (
    Ano INT NOT NULL,
    Regiao VARCHAR(50) NOT NULL,
    SalarioMedio DECIMAL(10,2) NOT NULL,
    Habitacao DECIMAL(10,2),
    Alimentacao DECIMAL(10,2),
    Transporte DECIMAL(10,2),
    EducacaoSaude DECIMAL(10,2),
    Lazer DECIMAL(10,2),
    Dividas DECIMAL(10,2),
    PercentualMoradia DECIMAL(5,2),
    Fonte VARCHAR(100),
    PRIMARY KEY (Ano, Regiao)
);