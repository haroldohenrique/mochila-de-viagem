const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itensArray = JSON.parse(localStorage.getItem('itens')) || [];

itensArray.forEach((elemento) => {
    criaElemento(elemento);
})


form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itensArray.find(elemento => elemento.nome === nome.value)
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }


    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itensArray[existe.id] = itemAtual
    } else {
        itemAtual.id = itensArray.length
        criaElemento(itemAtual);
        itensArray.push(itemAtual)
    }


    localStorage.setItem('itens', JSON.stringify(itensArray));



    nome.value = '';
    quantidade.value = '';


})



function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    console.log(novoItem)

    lista.appendChild(novoItem);

}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}