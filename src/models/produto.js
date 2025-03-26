// Rota GET /produtos - Retorna todos os produtos
app.get("/produtos", async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar produtos", error });
    }
    });

  // Rota POST /produtos - Adiciona um novo produto
    app.post("/produtos", async (req, res) => {
    try {
        const { nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario } = req.body;
        const produto = await Produto.create({
        nome,
        fornecedor,
        endereco_fornecedor,
        quantidade,
        endereco,
        preco_unitario
        });
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar produto", error });
    }
    });
  
  // Rota PUT /produtos/:id - Atualiza um produto pelo ID
    app.put("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario } = req.body;
        const produto = await Produto.findByPk(id);
  
        if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
        }
  
        produto.nome = nome;
        produto.fornecedor = fornecedor;
        produto.endereco_fornecedor = endereco_fornecedor;
        produto.quantidade = quantidade;
        produto.endereco = endereco;
        produto.preco_unitario = preco_unitario;
  
        await produto.save();
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar produto", error });
    }
    });
  
  // Rota DELETE /produtos/:id - Remove um produto pelo ID
    app.delete("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
  
        if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
        }
  
        await produto.destroy();
        res.status(200).json({ message: "Produto removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover produto", error });
    }
    });
  