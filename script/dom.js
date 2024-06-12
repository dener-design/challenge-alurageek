import { fetchProdutos, adicionarProduto, removerProduto } from './api.js';

const formulario = document.getElementById('produto-formulario');
const nomeInput = document.getElementById('nome');
const precoInput = document.getElementById('preco');
const imagemInput = document.getElementById('imagem');
const listaProdutos = document.getElementById('lista-produtos');


export const exibirErro = (input, mensagem) => {
    const erroSpan = document.getElementById(`${input.id}-erro`);
    erroSpan.textContent = mensagem;
    erroSpan.style.display = 'block';
};

export const limparErro = (input) => {
    const erroSpan = document.getElementById(`${input.id}-erro`);
    erroSpan.textContent = '';
    erroSpan.style.display = 'none';
};

export const validarInputs = () => {
    let isValid = true;

    if (nomeInput.value.trim().length === 0) {
        exibirErro(nomeInput, 'Nome é obrigatório.');
        isValid = false;
    } else {
        limparErro(nomeInput);
    }

    if (precoInput.value.trim().length === 0 || isNaN(precoInput.value)) {
        exibirErro(precoInput, 'Digite um valor em reais corretamente, apenas números, sem o símbolo R$.');
        isValid = false;
    } else {
        limparErro(precoInput);
    }

    if (imagemInput.value.trim().length === 0) {
        exibirErro(imagemInput, 'Endereço (URL) da imagem é obrigatória.');
        isValid = false;
    } else {
        limparErro(imagemInput);
    }

    return isValid;
};

export const renderizarProdutos = (produtos) => {
    listaProdutos.innerHTML = '';
    produtos.forEach((produto) => {
        const produtoCard = document.createElement('div');
        produtoCard.className = 'produto-card';
        produtoCard.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="nome">${produto.nome}</div>
            <div class="preco-remover">
                <div class="preco">${parseFloat(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                <button class="remover-btn" data-id="${produto.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        listaProdutos.appendChild(produtoCard);
    });

    document.querySelectorAll('.remover-btn').forEach((button) => {
        button.addEventListener('click', async (e) => {
            const produtoId = e.target.closest('button').dataset.id;
            await removerProduto(produtoId);
            alert('Produto removido com sucesso!');
            const produtos = await fetchProdutos();
            renderizarProdutos(produtos);
        });
    });
};

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validarInputs()) {
        const novoProduto = {
            nome: nomeInput.value,
            preco: precoInput.value,
            imagem: imagemInput.value,
        };
        await adicionarProduto(novoProduto);
        const produtos = await fetchProdutos();
        renderizarProdutos(produtos);
        alert('Produto adicionado com sucesso!');
        formulario.reset();
    }
});

export function inserirAnoAtual() {
    const anoAtual = new Date().getFullYear().toString();
    const spanAnoAtual = document.querySelector('.ano-atual');
    if (spanAnoAtual) {
        spanAnoAtual.textContent = anoAtual;
    }
}

export const inicializar = async () => {
    const produtos = await fetchProdutos();
    renderizarProdutos(produtos);
    inserirAnoAtual();
};


