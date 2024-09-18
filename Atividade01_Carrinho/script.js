const produtos = [
    {
        id: 0,
        img: 'https://brunxind.com/wp-content/uploads/2022/04/camiseta-basic-surfwear-brunx-ind-preta-mockup-costas.jpg',
        nome: 'Camiseta',
        valor: 29.99,
        quantidade: 2
    },
    {
        id: 1,
        img: 'https://tuticountry.com.br/image/cache/catalog/produtos/1161%20Calca%20Jeans%20Masculina%20Azul%20Medio%20com%20Elastano%20West%20Country%20(1)%20(Copy)-910x910.JPG',
        nome: 'Calça Jeans',
        valor: 99.90,
        quantidade: 1
    },
    {
        id: 2,
        img: 'https://cdnv2.moovin.com.br/deckeronline/imagens/produtos/det/tenis-jogging-esportivo-adidas-swift-run-feminino--dcbbbc5f5c7d64697a5e8c9b0f97e722.jpg',
        nome: 'Tênis',
        valor: 149.90,
        quantidade: 1
    }
]

function inserirCarrinhoSelect() {
    const selectCarrinho = document.getElementById('select-carrinho');
    const btnAddSelect = document.getElementById('btnAddSelect');
    btnAddSelect.addEventListener('click', () => {
        let selectValue = selectCarrinho.options[selectCarrinho.selectedIndex].value;
        produtos.forEach(produto => {
            if (produto.id == selectValue) {
                adicionarProduto(produto.id, produto.nome, produto.valor, produto.quantidade)
            }
        })
    })
}

const cardsProdutos = document.getElementById('produtos');

function renderizarProdutos() {
    cardsProdutos.innerHTML = '';
    produtos.forEach(produto => {
        const cardProduto = document.createElement('div');
        cardProduto.classList.add('produto');
        cardProduto.innerHTML = `
            <img src=${produto.img} alt=${produto.nome}>
            <p>Id: ${produto.id}</p>
            <p>Nome: ${produto.nome}</p>
            <p>Valor: R$${produto.valor.toFixed(2)}</p>
            <p>Quantidade: ${produto.quantidade}</p>
            <button onclick="adicionarProduto(${produto.id}, '${produto.nome}', ${produto.valor}, ${produto.quantidade})">Adicionar ao carrinho</button>
        `
        cardsProdutos.appendChild(cardProduto);
    })
}

inserirCarrinhoSelect();
exibirCarrinho();
renderizarProdutos();


// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    // Obter os produtos do localStorage ou criar um novo array vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adicionar o novo produto ao array
    carrinho.unshift({ id, nome, valor, quantidade });

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
}
// Função para remover um produto do carrinho
function removerProduto(id) {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Filtrar os produtos, removendo o produto com o id especificado
    carrinho = carrinho.filter(produto => carrinho.indexOf(produto) !== id);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
}
// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    let total = 0;
    const pTotal = document.createElement('p');
    
    // Verificar se o carrinho está vazio
    if (carrinho && carrinho.length > 0) {
        // Exibir os produtos em um elemento HTML (ajuste conforme sua estrutura HTML)
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = '';

        carrinho.forEach(produto => {
            const div = document.createElement('div');
            const li = document.createElement('li');
            const btnRemove = document.createElement('button');
            btnRemove.innerText = 'Remover';
            btnRemove.addEventListener('click', () => removerProduto(carrinho.indexOf(produto)));
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor}`;
            listaProdutos.append(div);
            div.appendChild(li);
            div.appendChild(btnRemove);

            total += produto.valor;
            
            pTotal.innerHTML = `<strong>Total: R$${total.toFixed(2)}</strong>`;
        });
        listaProdutos.appendChild(pTotal);

    } else {
        // Exibir a mensagem de carrinho vazio
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}
// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los