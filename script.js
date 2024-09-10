document.addEventListener("DOMContentLoaded", () => {

    const inputRazaoSocial = document.getElementById("inputRazaoSocial");
    const inputObservacao = document.getElementById("inputObservacao");
    const inputCnpj = document.getElementById("inputCnpj");
    const inputTelefone = document.getElementById("inputTelefone");
    const inputData = document.getElementById("inputData");

    const insereContato = document.getElementById("insereContato");

    const listaContatos = document.getElementById("listaContatos");

    let arrayArmazenamento = [];
    let editIndex = null;

    carregarElemento();

    insereContato.addEventListener('click', function () {

        if (inputRazaoSocial.value == "") {
            criarNotif("ERRO", "Informe a razão social do cliente!");
            return;
        }
        else if (inputCnpj.value == "") {
            criarNotif("ERRO", "Informe o CNPJ do cliente!");
            return;
        }
        else if (inputTelefone.value == "") {
            criarNotif("ERRO", "Informe o número de telefone do cliente!");
            return;
        }
        else if (inputData.value == "") {
            criarNotif("ERRO", "Informe a data de contato!");
            return;
        }
        else {

            arrayArmazenamento = [inputRazaoSocial.value, inputObservacao.value, inputCnpj.value, inputTelefone.value, inputData.value]
            const contato = arrayArmazenamento.join("\n\n")

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

            criarNotif("SUCESSO", "Contato Inserido!")
        }
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

        recarregarLista();
    }

    function atualizarElemento(contato) {
        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

        contatos[editIndex] = contato;
        localStorage.setItem('contatos', JSON.stringify(contatos));

        recarregarLista();
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
        recarregarLista();
    }

    function carregarElemento() {
        recarregarLista();
    }

    function recarregarLista() {
        listaContatos.innerHTML = '';

        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

        contatos.forEach((contato, index) => {
            criarElementoLista(contato, index);
        });
    }

    function criarNotif(tipo, texto) {

        var notif = document.getElementById("notif");

        if (!notif) {

            console.log("teste");

            notif = document.createElement("div");
            notif.classList.add(tipo.toLowerCase());
            
            notif.textContent = texto;
            notif.classList.add("slideIn")
            notif.id = "notif";

            setTimeout(() => {
                notif.classList.remove("slideIn");
                notif.classList.add("slideOut");
            }, 5000)

            setTimeout(() => {
                document.body.removeChild(notif);
            }, 6000)

            document.body.appendChild(notif);
        }
        else {
            return
        }

    }
});