//Encurtador função document .querySelector
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


//Mapeia a lista
pizzaJson.map((item,index)=>{
    //Clona a model
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

        pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name ;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = item.price;

    // Adiciona elemento
    c('.pizza-area').append(pizzaItem);


});