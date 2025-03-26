const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(cors());
app.use(express.json());

// Configurar o Sequelize e o Banco de Dados (SQLite)
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", // ou o caminho do seu banco de dados
});

// Definir o modelo de Produto
const Produto = sequelize.define("Produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fornecedor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco_fornecedor: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    endereco: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    preco_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
    },
});

// Sincronizar o modelo com o banco de dados
sequelize.sync().then(async () => {
    console.log("Banco de dados sincronizado");

  // Verificar se já existem produtos na base
    const produtos = await Produto.findAll();
    if (produtos.length === 0) {
    // Adicionar registros fictícios
    await Produto.create({
        nome: "Produto 1",
        fornecedor: "Fornecedor 1",
        endereco_fornecedor: "Rua 1",
        quantidade: 10,
        endereco: "Rua A",
        preco_unitario: 15.50
    });
    await Produto.create({
        nome: "Produto 2",
        fornecedor: "Fornecedor 2",
        endereco_fornecedor: "Rua 2",
        quantidade: 20,
        endereco: "Rua B",
        preco_unitario: 20.00
    });
    await Produto.create({
        nome: "Produto 3",
        fornecedor: "Fornecedor 3",
        endereco_fornecedor: "Rua 3",
        quantidade: 30,
        endereco: "Rua C",
        preco_unitario: 25.75
    });
    await Produto.create({
        nome: "Produto 4",
        fornecedor: "Fornecedor 4",
        endereco_fornecedor: "Rua 4",
        quantidade: 40,
        endereco: "Rua D",
        preco_unitario: 30.00
    });
    console.log("Produtos fictícios adicionados!");
    } else {
    console.log("Produtos já existem na base de dados.");
    }
}).catch((error) => {
    console.error("Erro ao sincronizar o banco de dados", error);
});

// Rota de Teste
app.get("/", (req, res) => {
    res.send("API rodando!");
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
