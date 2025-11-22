let cardContainer = document.querySelector("main");
let searchButton = document.querySelector("#botao-busca");
let searchInput = document.querySelector("div input"); // Seleciona o campo de busca
let dados = [];

// Função para carregar os dados do JSON apenas uma vez
async function carregarDados() {
    if (dados.length === 0) { // Carrega os dados apenas se o array estiver vazio
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }
}

function realizarBusca() {
    const termoBusca = searchInput.value.toLowerCase(); // Pega o valor do input em minúsculas

    if (termoBusca.trim() === "") {
        renderizarCards(dados); // Se a busca estiver vazia, mostra todos os cards
        return;
    }

    const resultadosFiltrados = dados.filter(dado => {
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        // Verifica se o termo de busca está no nome ou na descrição
        return nome.includes(termoBusca) || descricao.includes(termoBusca);
    });

    renderizarCards(resultadosFiltrados);
}

function renderizarCards(dados) {
    // Limpa o container antes de adicionar novos cards
    cardContainer.innerHTML = ""; 

    if (dados.length === 0) {
        cardContainer.innerHTML = `<p style="text-align: center;">Nenhum resultado encontrado para sua busca.</p>`;
        return;
    }

    for (let dado of dados) {
        let card = document.createElement("article");
        card.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.descricao}</p>
        <p><strong>Ano de criação:</strong> ${dado.data_criacao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(card);
    }
}

// Inicializa a aplicação
async function inicializar() {
    await carregarDados(); // Garante que os dados estão carregados
    renderizarCards(dados); // Mostra todos os cards inicialmente

    // Adiciona o evento de clique ao botão de busca
    searchButton.addEventListener("click", realizarBusca);

    // Opcional: Realiza a busca ao pressionar "Enter" no campo de input
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            realizarBusca();
        }
    });
}

inicializar();