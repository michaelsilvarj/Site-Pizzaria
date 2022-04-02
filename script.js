//Encurtador função document .querySelector
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


//Mapeia a lista
pizzaJson.map((item,index)=>{
    //Clona a model
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    // Adiciona elemento
    c('.pizza-area').append(pizzaItem);


});