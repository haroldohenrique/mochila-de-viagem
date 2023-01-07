const form = document.getElementById('novoItem');
const itens = JSON.parse(localStorage.getItem('itens')) || [];
//JSON.parse vai transformar toda a stringify em javascript de novo
//itens vai ver se tem no local storage 'itens' se não, cria um array vazio.


itens.forEach((elemento) => {
    criaElemento(elemento)
})


form.addEventListener('submit', (evento) => {
    //preventDefalut impede que um comportamento padrão ocorra, exemplo seguir um link
    evento.preventDefault()

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);



    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    if (existe){
        itemAtual.id = existe.id
        itens[existe.id] = itemAtual

        atualizaElemento(itemAtual)
    }else{

        itemAtual.id = itens.length

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }


    localStorage.setItem('itens', JSON.stringify(itens))
    // o dicionario salva como objeto, json.stringify salva como string

    nome.value = '';
    quantidade.value = '';
})

function criaElemento(item) {

    // <li class="item"><strong>1</strong>Adaptador de tomada</li>

    const novoItem = document.createElement('li');
    novoItem.classList.add('item')
    //innerHTML pega o contéudo da div
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    numeroItem.dataset.id = item.id
    //appendChild insere o elemento dentro como se fosse o filho da div
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    console.log(novoItem)

    const lista = document.getElementById('lista')
    lista.appendChild(novoItem)

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+ item.id+"']").innerHTML = item.quantidade
}