// pegando os elementos novoItem e lista pelo id e adicionando eles a uma variável
const form = document.getElementById("novoItem")  
const lista = document.getElementById("lista")

// array que receberá palavras escritas pelo usuário no input
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
});

// cria um evento quando clicado o botão de submit
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    // constantes que recebe a informação do input. Refatorando.
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // itemAtual - variável para tranformar o valor do input num objeto. onde nome, após os dois pontos(:) é o parametro de valor recebido, onde o usuário adiciona uma palavra
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    criaElemento(itemAtual)
    // empurra o itemAtual e seus objetos para o array
    itens.push(itemAtual)

    // Adicionando item e transformando ele numa string por meio do JSON.stringify()
    localStorage.setItem("itens", JSON.stringify(itens))
    
    // deixa os inputs vazios
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {

    // cria uma li e adiciona a classe "item"
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    // cria um strong, pega o strong e modifica ele adicionando o parametro quantidade
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    // pega a li e coloca como filho dentro da li o strong, modifica o strong e após ele adiciona o parametro nome
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)
}