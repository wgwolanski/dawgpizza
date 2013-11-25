//document ready function
$(function(){
	var totalPrice = 0;
	pizzaOrderLoop();
	drinkOrderLoop();
	dessertOrderLoop();

    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };


        //push the new item on to the items array
        cart.items.push(newCartItem);

        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-container'));
    });

    $('.remove-btn').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var idxToRemove = this.getAttribute('data-index');
    	cart.items.splice(idxToRemove, 1);


        renderCart(cart, $('.cart-container'));
    });

    $('.place-order').click(function(){
        
        //TODO: validate the cart to make sure all the required
        //properties have been filled out, and that the 
        //total order is greater than $20 (see homework 
        //instructions) 

        postCart(cart, $('.cart-form'));
    });

}); //doc ready

function pizzaOrderLoop() {
    var template = $('.pizza-order-template');
    var container = $('.pizza-order-menu');
    var instance;

	var idx;
	var pizza;
	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
	    pizza = com.dawgpizza.menu.pizzas[idx];
	    instance = template.clone();

	    instance.find('.pizza-name').html(pizza.name);
	    instance.find('.btn-name').attr('data-name', pizza.name);
	    instance.find('.pizza-desc').html(pizza.description);
	    instance.find('.btn-add-small').attr('data-price', pizza.prices[0]);
	    instance.find('.btn-add-medium').attr('data-price', pizza.prices[1]);
	    instance.find('.btn-add-large').attr('data-price', pizza.prices[2]);
	    instance.find('.cost-one').html(pizza.prices[0]);
	    instance.find('.cost-two').html(pizza.prices[1]);
	    instance.find('.cost-three').html(pizza.prices[2]);

	    instance.removeClass('template');
	    container.append(instance);

	    //pizza.name = name of pizza
	    //pizza.description = description of pizza
	    //pizza.prices = array of three numbers, which are prices for small, medium, and large
	    //pizza.prices[0] = price for small
	    //pizza.prices[1] = price for medium
	    //pizza.prices[2] = price for large

	} //for each pizza
}

function drinkOrderLoop() {
    var template = $('.drink-order-template');
    var container = $('.drink-order-menu');
    var instance;

	var idx;
	var drink;
	for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
	    drink = com.dawgpizza.menu.drinks[idx];
	    instance = template.clone();
	    instance.find('.drink-name').html(drink.name);
	    instance.find('.btn-add-drink').attr('data-name', drink.name);
	    instance.find('.drink-cost').html(drink.price);
	    instance.find('.btn-add-drink').attr('data-price', drink.price);

	    instance.removeClass('template');
	    container.append(instance);

	    //drink.name = name of drink
	    //drink.price = price of drink

	} //for each drink
}

function dessertOrderLoop() {
    var template = $('.dessert-order-template');
    var container = $('.dessert-order-menu');
    var instance;

	var idx;
	var dessert;
	for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
	    dessert = com.dawgpizza.menu.desserts[idx];
	    instance = template.clone();
	    instance.find('.dessert-name').html(dessert.name);
	    instance.find('.btn-add-dessert').attr('data-name', dessert.name);
	    instance.find('.dessert-cost').html(dessert.price);
	    instance.find('.btn-add-dessert').attr('data-price', dessert.price);

	    instance.removeClass('template');
	    container.append(instance);

	    //dessert.name = name of dessert
	    //dessert.price = price of dessert

	} //for each dessert
}

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {
	var template = $('.cart-item-template');
    var idx, item;
    totalPrice = 0;
    //empty the container of whatever is there currently
    container.empty();


    //for each item in the cart...
    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];
        instance = template.clone();
        instance.find('.item-name').html(item.name);
        instance.find('.item-cost').html(item.price);
        instance.find('.remove-btn').attr('data-index', idx);
        totalPrice += parseInt(item.price);

        instance.removeClass('template');
        instance.removeClass('cart-item-template');
        container.append(instance);
        //TODO: code to render the cart item


    } //for each cart item
    $('.total-price').html("$" + totalPrice + " +$" + (totalPrice * 0.095).toFixed(2) + "(tax) = " + (totalPrice * 1.095).toFixed(2));
    //TODO: code to render sub-total price of the cart
    //the tax amount (see instructions), 
    //and the grand total

    $('.remove-btn').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var idxToRemove = this.getAttribute('data-index');
    	cart.items.splice(idxToRemove, 1);


        renderCart(cart, $('.cart-container'));
    });

} //renderCart()

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

} //postCart()