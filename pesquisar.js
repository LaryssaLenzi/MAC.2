// Função para filtrar os itens da lista conforme o nome da instituição e os filtros de estado e mensalidade
function filtrar() {
    // Obtendo o valor da busca (nome da instituição)
    let inputBusca = document.getElementById("inputbusca").value.toLowerCase();

    // Obtendo os checkboxes de estado e mensalidade
    let estadosSelecionados = getCheckboxValues('filtro-checkbox');
    let mensalidadeSelecionada = getCheckboxValues('mensalidade-checkbox');

    // Obtendo a lista de itens (instituições)
    let lista = document.getElementById("listainsti");
    let itens = lista.getElementsByTagName("li");

    // Iterando sobre os itens da lista
    for (let i = 0; i < itens.length; i++) {
        let item = itens[i];

        // Obter o nome da instituição (para comparar com a busca)
        let nomeInstituicao = item.getElementsByClassName("item-name")[0].textContent.toLowerCase();

        // Obter os estados e mensalidade do item
        let estadosItem = item.getAttribute("data-estado")?.toLowerCase().split(",") || [];
        let mensalidadeItem = item.getAttribute("data-mensalidade")?.toLowerCase() || "";

        // Verificar se o nome da instituição contém o texto da busca
        let correspondeBusca = nomeInstituicao.includes(inputBusca);

        // Verificar se o item corresponde aos filtros de estado e mensalidade
        let correspondeEstado = estadosSelecionados.length === 0 || estadosSelecionados.some(estado => estadosItem.includes(estado.toLowerCase()));
        let correspondeMensalidade = mensalidadeSelecionada.length === 0 || mensalidadeSelecionada.some(mensalidade => mensalidadeItem.includes(mensalidade.toLowerCase()));

        // Exibir ou esconder o item dependendo se ele corresponde aos critérios
        if (correspondeBusca && correspondeEstado && correspondeMensalidade) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
}

// Função para obter os valores selecionados dos checkboxes
function getCheckboxValues(className) {
    let checkboxes = document.querySelectorAll('.' + className);
    let valores = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            valores.push(checkbox.value);
        }
    });
    return valores;
}

// Função para inicializar os eventos de filtro e pesquisa
function inicializarFiltros() {
    // Quando a pesquisa for realizada, chama a função filtrar
    document.getElementById("inputbusca").addEventListener("keyup", filtrar);

    // Quando qualquer checkbox de filtro for alterado, chama a função filtrar
    let checkboxes = document.querySelectorAll('.filtro-checkbox, .mensalidade-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filtrar);
    });
}

// Chama a função de inicialização assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarFiltros);
