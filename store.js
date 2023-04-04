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
    alert(`${title} added to cart`)

}
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement("div")
    cartRow.classList.add("cart-row", "row")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for (var items of cartItemNames) {
        if (items.innerText == title) {
            alert("You have already added this item to your cart")
            return
        }
    }
    var cartRowContents = ` 
    <div class="cart-item cart-column col-lg-3 col-3">
        <div class="cart-item-title">${title}</div>
        <img class="cart-item-image mb-5 rounded" src="${imageSrc}" width="70" height="70">
    </div>
    <div class="cart-price cart-column col-lg-3 col-3">${price}</div>
    <div class="cart-quantity cart-column col-lg-3 col-3">
        <input class="cart-quantity-input form-control"  type="number" value="1" size="4"/>
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
    button.addEventListener("click", function (event) {
        var buttonClicked = event.target;
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
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace("₹", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = "₹" + total;
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

async function generatePDF() {
    document.getElementById("downloadButton").innerHTML = "currently downloading, please wait";
    var downloading = document.getElementById("whatToPrint");
    var doc = new jsPDF("l", "pt");
    await html2canvas(downloading, {
        // allowTaint: true,
        // useCORS: true,
    }).then((canvas) => {
        doc.addImage(canvas.toDataURL("image/png"), "PNG", 5, 5);
    })
    doc.save("Catalogue.pdf");
    document.getElementById("downloadButton").innerHTML = "Click to download";
}