const form = document.getElementById('novoItem');
const lista = document.querySelector('.lista');
const itensArray = JSON.parse(localStorage.getItem('itens')) || []
//conferindo no local storage(itens) se ele tem algo lá, se não cria uma array vazio
//JSON.parse ta transformando toda a string em js

itensArray.forEach((elemento) => {
    criaElemento(elemento)
    //aqui é onde deixa as coisas salvas quando recarrega a página
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itensArray.find(elemento => elemento.nome === nome.value)
    //olhando todos os elementos do array na posição nome e quero que seja exatamente igual
    //a nome.value


    // dicionário aqui em baixo, ela cria um object
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }


    //criando um elemento de controle (id)
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itensArray[itensArray.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        //aqui atualiza o localstorage
    } else {

        itemAtual.id = itensArray[itensArray.length - 1] ? (itensArray[itensArray.length - 1]).id + 1 : 0
        //o id vai ser o tamanho do array de itens

        criaElemento(itemAtual)
        //ao inves de o criaElemento esperar receber 2 valores(nome, quantidade)
        //vai receber o itemAtual



        itensArray.push(itemAtual)

    }




    localStorage.setItem('itens', JSON.stringify(itensArray))
    //escreve no localStorage


    nome.value = ''
    quantidade.value = ''



})

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    //indo na posição itemAtual.quantidade

    numeroItem.dataset.id = item.id
    //ta criando um data-id(o que vem apos o dataset. é o nome do data atribute)

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade

}


//criando uma função para aparecer o botao de deletar os itens
function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';
    //o elementoBotao recebe um TEXTO em X

    elementoBotao.addEventListener('click', function () {
        console.log(this)
        //o this é para saber qual foi o elemento clicado
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao;
    //retorna os valores de elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itensArray.splice(itensArray.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem('itens', JSON.stringify(itensArray))
}