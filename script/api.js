const API_URL = 'http://localhost:3000/produtos';

export const fetchProdutos = async () => {
    const response = await fetch(API_URL);
    const produtos = await response.json();
    return produtos;
};

export const adicionarProduto = async (produto) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
    });
    return response.json();
};

export const removerProduto = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};
