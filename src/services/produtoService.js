import ProdutoRepository from "../repository/produtoRepository.js";

const produtoRepository = new ProdutoRepository();
export default class ProdutoService {
  async get() {
    const result = await produtoRepository.getAll();
    return result;
  }

  async getById(id = null) {
    const result = await produtoRepository.getById(id);
    return result;
  }

  async post(produto) {
    const result = await produtoRepository.post(produto);
    return result;
  }

  async put(produto, id) {
    const result = await produtoRepository.put(id, produto);
    return result;
  }

  async delete(id) {
    const result = await produtoRepository.delete(id);
    return result;
  }
}
