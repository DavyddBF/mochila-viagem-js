// pegando os elementos novoItem e lista pelo id e adicionando eles a uma variável
const form = document.getElementById("novoItem")  
const lista = document.getElementById("lista")

// array que receberá palavras escritas pelo usuário no input
const itens = JSON.parse(localStorage.getItem("itens")) || []

// para cada item elemento ele cria esse elemento
itens.forEach( (elemento) => {
    criaElemento(elemento)
});

// cria um evento quando clicado o botão de submit
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    // constantes que recebe a informação do input. Refatorando.
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value)

    // itemAtual - variável para tranformar o valor do input num objeto. onde nome, após os dois pontos(:) é o parametro de valor recebido, onde o usuário adiciona uma palavra
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // verificação caso exista um elemento na lista, caso tenha chama a função atualizaElemento e atualiza.
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        // Pega o Array e procura nele se o id é igual ao id que existe, caso tenha ele tranforma no valor ditado pelo usuário
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        // caso contrario ele pega o item atual e adiciona um id. Ele pega o id do ultimo e adiciona +1 ao id. Se o o ultimo tiver um id 4 ele somará ao novo item ou o itemAtual +1 ficando com id 5
        itemAtual.id = itens[itens.lenght - 1] ? (itens[itens.lenght-1]).id + 1 : 0

        // cria o elemento conforme as informações ditas pelo usuário, recebendo a constante itemAtual com essas informações
        criaElemento(itemAtual)

        // empurra o itemAtual e seus objetos para o array
        itens.push(itemAtual)
    }

    // Adicionando item e transformando ele numa string por meio do JSON.stringify()
    localStorage.setItem("itens", JSON.stringify(itens))
    
    // deixa os inputs vazios
    nome.value = ""
    quantidade.value = ""
})

// função de criação de elementos, itens novos na lista
function criaElemento(item) {

    // cria uma li e adiciona a classe "item"
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    // cria um strong, pega o strong e modifica ele adicionando o parametro quantidade
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    // pega a li e coloca como filho dentro da li o strong, modifica o strong e após ele adiciona o parametro nome
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    // adiciona o botão dentro da li, ao lado da tag strong
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

// função que seleciona o data-attributes e muda o numero do id no html, atualiza o item na condição if na linha 29
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// função que cria o botao deleta
function botaoDeleta(id) {
    // cria o botão, colocando ele no html e deixando ecrito nele um X
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = "X"

    // evento que ao clicar chama a função deletaElemento que recebe o parametro o ultimo item e o id
    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

// função para deletar um elemento do LocalStorage recebendo a tag do item e o seu id
function deletaElemento(tag, id) {
    tag.remove()

    // splice deleta um item do Array. findIndex ajuda a encontrar o item, fazendo uma validação do parametro elemento
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    // tranforma itens em uma string
    localStorage.setItem("itens", JSON.stringify(itens))
}