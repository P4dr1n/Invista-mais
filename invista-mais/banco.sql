CREATE DATABASE IF NOT EXISTS sistema_auth;
USE sistema_auth;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cep CHAR(8),
    endereco VARCHAR(255),
    numero VARCHAR(10),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado CHAR(2),
    mora_como VARCHAR(50),
    verificado BOOLEAN DEFAULT FALSE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE codigos_verificacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    codigo CHAR(6) NOT NULL,
    expira_em TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 10 MINUTE),
    utilizado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (email) REFERENCES usuarios(email) ON DELETE CASCADE
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