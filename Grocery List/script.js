const button = document.getElementById('button');
const listDiv = document.getElementById('list-div')
const cartDiv = document.getElementById('cart-div')
const itemList = document.createElement('divList')
const itemCart = document.createElement('divCart')
const warning = document.getElementById('warning')

function addItem(keyItem, keyQuantity) {
    localStorage.getItem(keyItem) ?
    listDiv.insertAdjacentHTML('beforeend', `
        <div class='item-div'>
            <p class='item-p item-p1'>${localStorage.getItem(keyItem)}</p>
            <p class='item-p item-p2'>${localStorage.getItem(keyQuantity)}</p>
            <i class="fas fa-trash-alt trash-icon" onclick="removeItem(keyItem)" title='Remove Item'></i>
        </div>`): '' // To not create useless divs and get in my way on CSS styles
}
function removeItem(keyItem) {
    localStorage.removeItem(keyItem)
    console.log(localStorage.removeItem(`${keyItem + 1}`))
}

let keyItem = 'item'
let keyQuantity = 'quantity'
function add() {
    const name = document.getElementById('name')
    const quantity = document.getElementById('quantity')
    if (name.length == 0 || quantity.value == 0) {
        warning.innerHTML = 'Preencha todos os dados, por favor.'
    } else {
        console.log(0 <= localStorage.length)
        console.log(`localStorage.length = ${localStorage.length}`)
        for (let k = 0; k < localStorage.length; k++) {
            console.log(`k = ${k} localStorage.length = ${localStorage.length}`)
            keyItem = 'item' + (k == 0? '': k) ; // console.log(`Key + k = ${k}`)
            keyQuantity = 'quantity' + (k == 0? '': k) ; // console.log(`keyQuantity + k = ${keyQuantity}`)
        }
        for (let k = 0; k < localStorage.length; k++) {
            
        }
        localStorage.setItem(keyItem, name.value)
        localStorage.setItem(keyQuantity, quantity.value)
        console.log(`The item #${name.value} (${quantity.value}) was added.`)
        warning.innerHTML = ''
        addItem(keyItem, keyQuantity)
    }
}
for (let k = 0; k < localStorage.length; k++) {
    keyItem = 'item' + (k == 0? '': k) ; // console.log(`Key + k = ${k}`)
    keyQuantity = 'quantity' + (k == 0? '': k) ; // console.log(`keyQuantity + k = ${keyQuantity}`)
    //console.log(k)
    addItem(keyItem, keyQuantity)
}
function clear() {return localStorage.clear()} // Make my life easier