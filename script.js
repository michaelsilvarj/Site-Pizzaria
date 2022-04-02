//Encurtador função document .querySelector
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


//Mapeia a lista
pizzaJson.map((item,index)=>{
    //Clona a model
    let pizzaItem = c('.models .pizza-item').cloneNode(true);



        pizzaItem.setAttribute('data-key',index);
        pizzaItem.querySelector('.pizza-item--img img').src= item.img;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}` ;
        pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name ;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
        pizzaItem.querySelector('a').addEventListener('click',(e)=>{
            e.preventDefault();

            //seta o item mais proximo de pizza-item
            let key = e.target.closest('.pizza-item').getAttribute('data-key');

            c('.pizzaBig img').src = pizzaJson[key].img;
            c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
            c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

/*
*/
            c('.pizzaWindowArea').style.opacity=0;
            c('.pizzaWindowArea').style.display='flex';
            setTimeout(()=>{
                c('.pizzaWindowArea').style.opacity=1;
            },200);

        });
       

    // Adiciona elemento
    c('.pizza-area').append(pizzaItem);


});