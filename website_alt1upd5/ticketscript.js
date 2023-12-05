if (document.readyState == 'loading') { //if java is loading then get the javascript ready
    document.addEventListener('DOMContentLoaded', ready)
} else { //if javascript is not loading, load the javascript
    ready()
}

function ready() { //when javascript is loaded load all these functions
    var removeCartItemButtons = document.getElementsByClassName('btn-danger') //creating a variable for removing cart items
    for (var i = 0; i < removeCartItemButtons.length; i++) { 
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem) //creates an event called removeCartItem when removeCartItemButtons is clicked
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input') //creates var for quantity
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged) //makes an event for when the quanity is changed
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button') //creates var for when the shop item button is pressed
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked) //creates event for when button is clicked
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked) //makes an event for when purchase button is pressed
}

function purchaseClicked() { //function for when purchase button is pressed
    alert('Payment accepted') //page gives an altert with the message
    var cartItems = document.getElementsByClassName('cart-items')[0] //cart items set back to none
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild) //removes all from cart
    }
    updateCartTotal() //updaye to total
}

function removeCartItem(event) //creates an event
{ 
    var buttonClicked = event.target 
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal() //update the cart's total price
}

function quantityChanged(event) { //function for quainty change
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1 //adding the values on the prices
    }
    updateCartTotal() //update the total
}

function addToCartClicked(event) { //event for when something is added to cart
    var button = event.target 
    var shopItem = button.parentElement.parentElement //put item in cart
    var title = shopItem.getElementsByClassName('ticket-title')[0].innerText //put item name in cart
    var price = shopItem.getElementsByClassName('ticket-price')[0].innerText //put item price in cart
    addItemToCart(title, price) //add them both to cart
    updateCartTotal() //update total
}

function addItemToCart(title, price)  {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
    } //adding the total
    var cartRowContents = `
        <div class="cart-item cart-column"> 
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>` //cart display
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem) //creates event for when remove buttom it clicked
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged) //creates event for when quanity chnages
}

function updateCartTotal() //creates functiom for cart total {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity) //cart display and math for totals
    }
    total = Math.round(total * 100) / 100 
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total
}
