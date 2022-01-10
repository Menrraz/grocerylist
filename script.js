const button = document.getElementById('button');
const listDiv = document.getElementById('list-div')
const warning = document.getElementById('warning')
const quantitySelect = document.getElementById('quantity-select')
let k = 0


function addItem(keyItem, keyQuantity) {
    let i = () => k++
    if (localStorage.getItem(keyItem) && localStorage.getItem(keyItem) !== 'null' && localStorage.getItem(keyItem)[0] !== '-') {
        listDiv.insertAdjacentHTML('beforeend', `
        <div class='item-div' id='item${k}'>
            <p class='item-p item-p1'>${localStorage.getItem(keyItem)}</p>
            <p class='item-p item-p2'>${localStorage.getItem(keyQuantity)}</p>
            <div class='div-icons'>
                <i class="fas fa-shopping-cart icon" onclick="addToCart('${'item' + k}','${'quantity' + k}', 'icon')">
                </i>
                <i class="fas fa-trash-alt icon" id='removeButton' onclick="removeItem('${'item' + k}', '${'quantity' + k}')" title='Remove Item'></i>
            </div>
        </div>`)
        i()
    }
}
const progressBar = document.getElementById('progressBar')
const bar = document.getElementById('bar')

function itemOn() {
    var itemOnList = 0
    var itemOnCart = 0
    for (let i = 0; i < localStorage.length/2; i++) {
        if (localStorage.getItem(`item${i}`)[0] !== '-' && localStorage.getItem(`item${i}`) !== 'null') {
            itemOnList++
        } else {
            if (localStorage.getItem(`item${i}`)[0] == '-') {
                itemOnCart++
            }
        }
        bar.style.width = `${ (itemOnCart / (itemOnList+itemOnCart) ) * 100 }%`
    }
    return [itemOnList, itemOnCart]
} 

function barProgress() {return bar.style.width = `${ (itemOn()[1] / (itemOn()[0] + itemOn()[1] ) ) * 100 }%`}
barProgress()

function removeItem(item, quantity) {
    localStorage.removeItem(item)
    localStorage.removeItem(quantity)
    rewrite()
    barProgress()
    writeResult()
    document.getElementById(item).remove()
} 

function removeItemCart(item, quantity) {
    document.getElementById(`cart_${item}`).remove()
    localStorage.removeItem(item)
    localStorage.removeItem(quantity)
    rewrite()
    barProgress()
    writeResult()
}
const body = document.getElementsByTagName('body')[0]
const cartDiv = document.getElementById('cart-div')
const backgroundWindow = document.getElementById('backgroundWindow')
const cartWindow = document.getElementById('cartWindow')
const addToCartForm = document.getElementById('add-to-cart-form')
const buttonToCart = document.createElement('input')

function addToCart(item, quantity) {
    backgroundWindow.style.display = 'flex'
    cartWindow.style.display = 'block'
    body.style = 'overflow-y: hidden'
    buttonToCart.setAttribute('type', 'button')
    buttonToCart.setAttribute('value', 'TO CART')
    buttonToCart.setAttribute('onclick', `toCart('${item}', '${quantity}', origin='icon')`)
    addToCartForm.appendChild(buttonToCart)
}
function toCart(item, quantity, origin) {
    const price = document.getElementById('price')
    if (localStorage.getItem(item) && origin == 'icon' && localStorage.getItem(item)[0] !== '-') {
        localStorage.setItem(item, `-${price.value}-` + localStorage.getItem(item))
        document.getElementById(item).remove()
        addDiv(item, quantity)
    } else {
        if (localStorage.getItem(item) && localStorage.getItem(item)[0] == '-') {
            addDiv(item, quantity)
        }
    } 
    writeResult()
    closeWindow() 
    buttonToCart.remove() // Otherwise it will create a new button every time addToCart() is called
}


function addDiv(item, quantity) {
    cartDiv.insertAdjacentHTML('beforeend', `
        <div class='cart-item' id='cart_${item}'>
            <p class='cart-p cart-p1'>${localStorage.getItem(item).split('-')[2]}</p>
            <p class='cart-p cart-p2'>${localStorage.getItem(quantity)}</p>
            <p class='cart-p cart-p3'>$${localStorage.getItem(item).split('-')[1]*localStorage.getItem(quantity)}</p>
            <i class="fas fa-trash-alt icon" onclick="removeItemCart('${item}', '${quantity}')" title='Remove Item'></i>
        </div>
        `
    )
}
function closeWindow(item) {
    cartWindow.style.display = 'none'
    backgroundWindow.style.display = 'none'
    body.style = 'overflow-y: auto'
    buttonToCart.remove()
}
function rewrite() {
    for (let i = 0; i < localStorage.length / 2; i++) {
        let itemValue = localStorage.getItem('item' + i)
        let quantityValue = localStorage.getItem('quantity' + i)
        localStorage.removeItem('item' + i)
        localStorage.removeItem('quantity' + i)
        localStorage.setItem('item' + i, itemValue)
        localStorage.setItem('quantity' + i, quantityValue)
    }
    barProgress()
}
let keyItem = 'item'
let keyQuantity = 'quantity'
function add() {
    const itemName = document.getElementById('itemName')
    const quantity = document.getElementById('quantity')

    if (itemName.value == '' || quantity.value == 0) {
        warning.innerHTML = 'Preencha todos os dados, por favor.'
    } else {
        for (let k = 0; k <= localStorage.length / 2; k++) {
            keyItem = 'item' + k;
            keyQuantity = 'quantity' + k;
        }
        localStorage.setItem(keyItem, itemName.value)
        localStorage.setItem(keyQuantity, quantitySelect.value == 'KG' ? quantity.value + 'kg' : quantity.value)
        warning.innerHTML = ''
        addItem(keyItem, keyQuantity)
        barProgress()
        writeResult()
    }
}
for (let k = 0; k <= localStorage.length / 2; k++) {
    keyItem = 'item' + k
    keyQuantity = 'quantity' + k
    addItem(keyItem, keyQuantity)
    toCart(keyItem, keyQuantity)
    barProgress()
    writeResult()
}

function writeResult() {
    let array = []
    if (itemOn()[1] > 0) {
        for (let i = 0; i < localStorage.length/2; i++) {
            let arrayItem = localStorage.getItem(`item${i}`).split('-')[1]*localStorage.getItem(`quantity${i}`)
            if (localStorage.getItem(`item${i}`) && localStorage.getItem(`item${i}`)[0] == '-') {
                document.getElementById('result').style.display = 'flex'
                document.getElementById('result-p1').innerHTML = `Itens faltando: ${itemOn()[0]}`
                document.getElementById('result-p2').innerHTML = `Itens no carrinho: ${itemOn()[1]}`
                array.push(Number(arrayItem))
            }
        }
        let sum = array.reduce( (a, b) => a + b )
        document.getElementById('result-p3').innerHTML = `Preço final: $${sum}`
        return sum
    }   
}
function finalize() {
    localStorage.clear()
}
