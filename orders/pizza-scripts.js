


$(function(){
    // $(".sort-ui .btn").removeClass("active");
    // render(Employees.entries);
    // $(".sort-ui .btn").click(function() {
    //     var sortBtn = $(this);
    //     sortObjArray(Employees.entries, sortBtn.attr('data-sortby'));
    //     render(Employees.entries);
    //     sortBtn.addClass("active");
    //     sortBtn.siblings().removeClass("active");
    // });

	pizzaMenuLoop();
	drinkLoop();
	dessertLoop();




}); // document ready

function pizzaMenuLoop() {
    var template = $('.pizza-template');
    var container = $('.pizza-menu');
    var instance;

	var idx;
	var pizza;
	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
	    pizza = com.dawgpizza.menu.pizzas[idx];
	    instance = template.clone();

	    instance.find('.pizza-name').html(pizza.name);
	    instance.find('.pizza-desc').html(pizza.description);
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

function drinkLoop() {
    var template = $('.drink-template');
    var container = $('.drink-menu');
    var instance;

	var idx;
	var drink;
	for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
	    drink = com.dawgpizza.menu.drinks[idx];
	    instance = template.clone();
	    instance.find('.drink-name').html(drink.name);
	    instance.find('.drink-cost').html(drink.price);

	    instance.removeClass('template');
	    container.append(instance);

	    //drink.name = name of drink
	    //drink.price = price of drink

	} //for each drink
}

function dessertLoop() {
    var template = $('.dessert-template');
    var container = $('.dessert-menu');
    var instance;

	var idx;
	var dessert;
	for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
	    dessert = com.dawgpizza.menu.desserts[idx];
	    instance = template.clone();
	    instance.find('.dessert-name').html(dessert.name);
	    instance.find('.dessert-cost').html(dessert.price);

	    instance.removeClass('template');
	    container.append(instance);

	    //drink.name = name of drink
	    //drink.price = price of drink

	} //for each drink
}