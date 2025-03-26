const express = require("express");
const Produto = require("../models/produto");

const router = express.Router();

// Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Criar um produto
router.post("/", async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto" });
  }
});

// Atualizar um produto por ID
router.put("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ message: "Produto não encontrado" });

    await produto.update(req.body);
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
});

// Remover um produto por ID
router.delete("/:id", async (req, res) => {
    try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ message: "Produto não encontrado" });

    await produto.destroy();
    res.status(200).json({ message: "Produto removido" });
    } catch (error) {
    res.status(500).json({ message: "Erro ao remover produto" });
    }
});

module.exports = router;
