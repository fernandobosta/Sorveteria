
function mostrar(nome) {
    document.getElementById(nome).style.display = "block";
}

function fechar(nome) {
    document.getElementById(nome).style.display = "none";
}

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function adicionarProduto(nome, preco, opcoes = []) {

    const imagens = {
        "Chocolate": "chocolate.png",
        "Baunilha": "baunilha.png",
        "Mista": "mista.png"
    };

    carrinho.push({
        nome: nome,
        preco: Number(preco),
        opcoes: opcoes,
        quantidade: 1,
        imagem: imagens[nome] || ""
    });

    salvarCarrinho();

mostrarMensagemCarrinho(nome);
}

function adicionarPersonalizado(nome, preco, idOpcoes) {

    const area = document.getElementById(idOpcoes);

    const selecionados = Array.from(
        area.querySelectorAll('input[type="checkbox"]:checked')
    ).map(input => input.value);

    adicionarProduto(nome, preco, selecionados);
}

function mostrarCarrinho() {

    const area = document.getElementById("itens-carrinho");

    if (!area) return;

    area.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, indice) => {

        total += produto.preco * produto.quantidade;

        const caixa = document.createElement("div");
        caixa.className = "item-carrinho";

        

        const nome = document.createElement("h2");
        nome.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.textContent = "R$ " + produto.preco.toFixed(2).replace(".", ",");

        const quantidade = document.createElement("p");
        quantidade.textContent = "Quantidade: " + produto.quantidade;

        caixa.append(nome, preco, quantidade);

        if (produto.opcoes.length > 0) {
            const opcoes = document.createElement("p");
            opcoes.textContent = "Escolhas: " + produto.opcoes.join(", ");
            caixa.appendChild(opcoes);
        }

        const remover = document.createElement("button");
        remover.textContent = "Remover";

        remover.onclick = function () {
            carrinho.splice(indice, 1);
            salvarCarrinho();
            mostrarCarrinho();
        };

        caixa.appendChild(remover);
        area.appendChild(caixa);
    });

    const valorTotal = document.getElementById("valor-total");

    if (valorTotal) {
        valorTotal.textContent = "R$ " + total.toFixed(2).replace(".", ",");
    }
}

document.addEventListener("DOMContentLoaded", mostrarCarrinho);

function confirmarPersonalizacao() {

    adicionarPersonalizado(
        "Milk Shake de Açaí",
        17,
        "opcoes1"
    );

    fechar("opcoes1");
}

function cancelarPersonalizacao() {

    const opcoes = document.getElementById("opcoes1");

    opcoes.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });

    fechar("opcoes1");
}

function confirmarPersonalizacao2() {

    adicionarPersonalizado(
        "Açaí Personalizado",
        17,
        "opcoes2"
    );

    fechar("opcoes2");
}

function cancelarPersonalizacao2() {

    const opcoes = document.getElementById("opcoes2");

    opcoes.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });

    fechar("opcoes2");
}

function mostrarResumoPedido() {

    const area = document.getElementById("resumo-itens");

    if (!area) return;

    area.innerHTML = "";

    let total = 0;

    carrinho.forEach(produto => {

        const quantidade = Number(produto.quantidade) || 1;
        const subtotal = Number(produto.preco) * quantidade;

        total += subtotal;

        const item = document.createElement("div");
        item.className = "resumo-item";

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.textContent = "Preço: R$ " +
            Number(produto.preco).toFixed(2).replace(".", ",");

        const quantidadeTexto = document.createElement("p");
        quantidadeTexto.textContent = "Quantidade: " + quantidade;

        item.append(nome, preco, quantidadeTexto);

        if (produto.opcoes && produto.opcoes.length > 0) {
            const adicionais = document.createElement("p");
            adicionais.textContent =
                "Adicionais: " + produto.opcoes.join(", ");

            item.appendChild(adicionais);
        }

        const subtotalTexto = document.createElement("p");
        subtotalTexto.textContent = "Subtotal: R$ " +
            subtotal.toFixed(2).replace(".", ",");

        item.appendChild(subtotalTexto);

        area.appendChild(item);
    });

    const valorTotal = document.getElementById("resumo-valor-total");

    if (valorTotal) {
        valorTotal.textContent =
            "R$ " + total.toFixed(2).replace(".", ",");
    }
}

document.addEventListener("DOMContentLoaded", mostrarResumoPedido);

function iniciarNovoPedido() {

    carrinho = [];
    salvarCarrinho();

    window.location.href = "index.html";
}

function selecionarTamanho(botao, tamanho, preco) {

    const cartao = botao.closest(".chocolate1, .morango, .ovo");

    cartao.querySelectorAll(".tamanho").forEach(item => {
        item.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    cartao.querySelector(".preco-milk").textContent =
        "R$ " + preco.toFixed(2).replace(".", ",");

    cartao.dataset.tamanho = tamanho;
    cartao.dataset.preco = preco;
}

function adicionarMilkShake(botao, nome) {

    const cartao = botao.closest(".chocolate1, .morango, .ovo");

    const tamanho = cartao.dataset.tamanho || "P";
    const preco = Number(cartao.dataset.preco || 14);

    adicionarProduto(nome + " - Tamanho " + tamanho, preco);
}

function selecionarTamanhoAcai(botao, tamanho, preco) {

    const cartao = document.querySelector(".milkacai");

    cartao.querySelectorAll(".tamanhos-milk-acai .tamanho")
        .forEach(item => {
            item.classList.remove("ativo");
        });

    botao.classList.add("ativo");

    cartao.querySelector(".preco-milk-acai").textContent =
        "R$ " + preco.toFixed(2).replace(".", ",");

    cartao.dataset.tamanho = tamanho;
    cartao.dataset.preco = preco;
}

// Adicionar Milk Shake de Açaí com tamanho escolhido
function adicionarMilkShakeAcai() {

    const cartao = document.querySelector(".milkacai");

    const tamanho = cartao.dataset.tamanho || "P";
    const preco = Number(cartao.dataset.preco || 14);

    adicionarProduto(
        "Milk Shake de Açaí - Tamanho " + tamanho,
        preco
    );
}

// Confirmar adicionais mantendo o tamanho selecionado
function confirmarPersonalizacao() {

    const cartao = document.querySelector(".milkacai");

    const tamanho = cartao.dataset.tamanho || "P";
    const preco = Number(cartao.dataset.preco || 14);

    const area = document.getElementById("opcoes1");

    const adicionais = Array.from(
        area.querySelectorAll('input[type="checkbox"]:checked')
    ).map(input => input.value);

    adicionarProduto(
        "Milk Shake de Açaí - Tamanho " + tamanho,
        preco,
        adicionais
    );

    fechar("opcoes1");
}

function mostrarNumeroPedido() {
    const elemento = document.getElementById("numero-pedido");

    if (!elemento) return;

    let numero = Number(localStorage.getItem("ultimoNumeroPedido")) || 0;

    numero++;

    localStorage.setItem("ultimoNumeroPedido", numero);

    elemento.textContent = "#" + String(numero).padStart(4, "0");
}

document.addEventListener("DOMContentLoaded", mostrarNumeroPedido);

function mostrarMensagemCarrinho(nome) {
    const mensagem = document.getElementById("mensagem-carrinho");

    if (!mensagem) return;

    const texto = document.getElementById("mensagem-produto");
    texto.textContent = nome + " adicionado ao carrinho!";

    mensagem.style.display = "flex";
}

function fecharMensagemCarrinho() {
    const mensagem = document.getElementById("mensagem-carrinho");

    if (!mensagem) return;

    mensagem.style.display = "none";
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById("contador-carrinho");

    if (!contador) return;

    const produtos = JSON.parse(localStorage.getItem("carrinho")) || [];

    const quantidade = produtos.reduce((total, produto) => {
        return total + (Number(produto.quantidade) || 1);
    }, 0);

    contador.textContent = quantidade;
}

document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);