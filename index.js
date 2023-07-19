const baseUrl = 'http://localhost:3000/menu'

let currentObject;

fetchItems()
updateServer()

function fetchItems() {
    fetch(baseUrl)
        .then(r => r.json())
        .then(items => getDetails(items))
}

function getDetails(items) {
    currentObject = items[0]
    showDetails(items[0])
    for (let key in items) {
        const singleItem = items[key]
        createSpan(singleItem)
    }
}

function createSpan(singleItem) {
    const span = document.createElement('SPAN')
    span.setAttribute("id", "menu-item-name")
    span.addEventListener("click", (e) => {
        e.preventDefault();
        showDetails(singleItem)
        currentObject = singleItem
    });

    const p = document.createElement('p').innerText = singleItem.name
    span.append(p)
    document.getElementById('menu-items').append(span)
}

function showDetails(item) {
    document.getElementById('dish-image').src = item.image
    document.getElementById('dish-name').innerText = item.name
    document.getElementById('dish-description').innerText = item.description
    document.getElementById('dish-price').innerText = item.price
}

function updateServer() {
    const button = document.getElementById('button')
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const input = document.getElementById('cart-amount').value
        fetch(baseUrl + '/' + currentObject.id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "number_in_bag": currentObject.number_in_bag += parseInt(input)
            })
        })
        .then(r => r.json())
        .then(item => updateCart(item))
        document.getElementById('cart-form').reset()
    })
}

function updateCart(item) {
    document.getElementById('number-in-cart').innerText = item.number_in_bag
}