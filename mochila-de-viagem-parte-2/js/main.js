const form = document.getElementById('novoItem');
const lista = document.querySelector('.lista');
const itensArray = []

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    
    criaElemento(nome.value, quantidade.value)

    nome.value = ''
    quantidade.value = ''
    
    

})

function criaElemento(nome,quantidade){
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;
    
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    
    lista.appendChild(novoItem);
    console.log(lista);

// dicionário aqui em baixo, ela cria um object
    const itemAtual = {
        'nome': nome,
        'quantidade': quantidade
    }

    itensArray.push(itemAtual)


    localStorage.setItem('item', JSON.stringify(itensArray))


}