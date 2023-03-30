var addToCartButtons = document.getElementsByClassName("shop-item-button");
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked)
}
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()

}
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement("div") //creates a div but doesnt add it to the html document
    cartRow.classList.add("cart-row", "row")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for (var items of cartItemNames) {
        if (items.innerText == title) {
            alert("You have already added this item to your cart")
            return //code stops after this line
        }
    }
    var cartRowContents = ` 
    <div class="cart-item cart-column col-lg-3 col-3">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <div class="cart-item-title mb-5">${title}</div>
    </div>
    <div class="cart-price cart-column col-lg-3 col-3">${price}</div>
    <div class="cart-quantity cart-column col-lg-3 col-3">
        <input class="cart-quantity-input" type="text" value="1" size="4"/>
    </div>
    <div class="col-3 col-lg-3">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

var removeCartItemButtons = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    //when the button is clicked, let this function be executed
    button.addEventListener("click", function (event) {
        //event listener always returns an event object inside of the function it calls
        //this event object has a property on it called target
        //target is whatever button we clicked on

        var buttonClicked = event.target;
        //we used parentElement twice because our button was inside a div which was inside another div
        // and it was this grandparent div we wanted to remove
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal()
    })
}


var quantityInputs = document.getElementsByClassName("cart-quantity-input")
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged)
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0] //we use 0 here because we only want the first div with the cart-items class 
    var cartRows = cartItemContainer.getElementsByClassName("cart-row") //gets the cart-row divs from inside the cart-items and puts it inside cartRows variable
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace("$", "")) //replace the dollar sign with an empty string
        //the parseFloat converts the string of price into a number with decimals
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100 //to round off the total to a decimal number with two decimals
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total;
}

document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked)
function purchaseClicked() {
    alert("Thank for purchasing. Keep shopping");
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
}


function downloadCatalogue() {
    const element = this.document.getElementById("catalogue")
    console.log(element)
    html2pdf().from(element).save();
}