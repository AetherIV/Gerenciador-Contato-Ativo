document.addEventListener("DOMContentLoaded", () => {

    const inputRazaoSocial = document.getElementById("inputRazaoSocial");
    const inputObservacao = document.getElementById("inputObservacao");
    const inputCnpj = document.getElementById("inputCnpj");
    const inputTelefone = document.getElementById("inputTelefone");

    const insereContato = document.getElementById("insereContato");

    const listaContatos = document.getElementById("listaContatos");

    let arrayArmazenamento = [];
    let editIndex = null;

    carregarElemento();

    insereContato.addEventListener('click', function () {

        arrayArmazenamento = [`RAZÃO SOCIAL: ${inputRazaoSocial.value}\nOBSERVAÇÕES: ${inputObservacao.value}\nCNPJ: ${inputCnpj.value}\nTELEFONES: ${inputTelefone.value}`];
        const contato = arrayArmazenamento.join(" ")

        if (editIndex !== null) {
            atualizarElemento(contato);
        } else {
            criarElementoLista(contato);
            salvarElemento(contato);
        }

        inputRazaoSocial.value = '';
        inputObservacao.value = '';
        inputCnpj.value = '';
        inputTelefone.value = '';

        editIndex = null;
    });

    function criarElementoLista(contato, index) {

        const elementoLista = document.createElement("li");
        const botaoExcluir = document.createElement("button");
        const botaoEditar = document.createElement("button");

        elementoLista.className = 'contatos';
        elementoLista.textContent = contato;

        botaoExcluir.className = "botoes";
        botaoExcluir.textContent = "Excluir";

        botaoEditar.className = "botoes";
        botaoEditar.textContent = "Editar";

        botaoExcluir.addEventListener('click', function () {
            removerElemento(index);
        });

        botaoEditar.addEventListener('click', function (event) {
            event.preventDefault();
            insereContato.textContent = 'Atualizar'
            carregarContatoParaEdicao(contato, index);
        });

        listaContatos.style.display = 'block';
        elementoLista.appendChild(botaoEditar);
        elementoLista.appendChild(botaoExcluir);
        listaContatos.appendChild(elementoLista);
    }

    function salvarElemento(contato) {
        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

        contatos.push(contato);
        localStorage.setItem('contatos', JSON.stringify(contatos));

        reloadList();
    }

    function atualizarElemento(contato) {
        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

        contatos[editIndex] = contato;
        localStorage.setItem('contatos', JSON.stringify(contatos));

        reloadList();
        insereContato.textContent = 'Inserir Contato'
    }

    function carregarContatoParaEdicao(contato, index) {
        const [razaoSocial, observacao, cnpj, telefone] = contato.split(" - ");

        inputRazaoSocial.value = razaoSocial;
        inputObservacao.value = observacao;
        inputCnpj.value = cnpj;
        inputTelefone.value = telefone;

        editIndex = index;
    }

    function removerElemento(index) {
        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
        
        contatos.splice(index, 1);
        localStorage.setItem('contatos', JSON.stringify(contatos));

        listaContatos.style.display = 'none';
        reloadList();
    }

    function carregarElemento() {
        reloadList();
    }

    function reloadList() {
        listaContatos.innerHTML = '';

        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

        contatos.forEach((contato, index) => {
            criarElementoLista(contato, index);
        });
    }
});
