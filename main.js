const form = document.getElementById("novoItem")  
const lista = document.getElementById("lista")

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    criaElemento(evento.target.elements['nome'].value, evento.target.elements['quantidade'].value)
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(nome, quantidade) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += nome

    lista.appendChild(novoItem)

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    localStorage.setItem("nome", nome)
    localStorage.setItem("quantidade", quantidade)
}