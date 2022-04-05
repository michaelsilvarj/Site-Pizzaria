const qS = (el)=>document.querySelector(el);
const qSA = (el)=>document.querySelectorAll(el);
let modalKey = 0;
let modalQT = 1;
let cart = [];
pizzaJson.map(function(item, index) {
    let pizzaItem = qS('.models .pizza-item').cloneNode(true);
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault()
        modalKey = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQT = 1;
        qS('.pizzaBig img').src = item.img;
        qS('.pizzaInfo h1').innerHTML = item.name;
        qS('.pizzaInfo--desc').innerHTML = item.description;
        qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price[2].toFixed(2)}`;
        qS('.pizzaInfo--size.selected').classList.remove('selected')
        qSA('.pizzaInfo--size').forEach(function(size, sizeIndex) {
            if(sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = item.sizes[sizeIndex]
        });
        qS('.pizzaInfo--qt').innerHTML = modalQT
        qS('.pizzaWindowArea').style.opacity = 0;
        qS('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qS('.pizzaWindowArea').style.opacity = 1;
        }, 200); 
    });
    qS('.pizza-area').append(pizzaItem);
});

function closeModal() {
    qS('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        qS('.pizzaWindowArea').style.display = 'none';
    }, 500);     
};

qSA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(function(item){
    item.addEventListener('click', closeModal)
});

qSA('.pizzaInfo--size').forEach(function(size, sizeIndex){
    size.addEventListener('click', ()=>{
       qS('.pizzaInfo--size.selected').classList.remove('selected')
       size.classList.add('selected')
    });
    size.addEventListener('click', ()=>{
        qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalKey].price[sizeIndex].toFixed(2)}`
    })
});

qS('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQT++
    qS('.pizzaInfo--qt').innerHTML = modalQT;
})
qS('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQT > 1){
        modalQT--
        qS('.pizzaInfo--qt').innerHTML = modalQT;
    }
})

qS('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(qS('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=> item.identifier == identifier);
    if(key > - 1){
        cart[key].qt += modalQT;
    }else{
        cart.push({
            id: pizzaJson[modalKey].id,
            size,
            price: pizzaJson[modalKey].price[size],
            qt: modalQT,
            identifier
        });
    }

    closeModal();
    updateCart();
});

qS('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        qS('aside').style.left = 0
    }
});

qS('.menu-closer').addEventListener('click', ()=>{
    qS('aside').style.left = '100vw'
});

function updateCart(){
    qS('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0){
        qS('aside').classList.add('show')
        qS('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        for(let i in cart){
            let pizzaItem = pizzaJson.find(function(item){
                return item.id == cart[i].id
            });
            subtotal += cart[i].price * cart[i].qt
            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let = pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
            let cartItem = qS('.models .cart--item').cloneNode(true);
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--
                }else{
                    cart.splice(i, 1);
                }
                updateCart();
            });
            qS('.cart').append(cartItem)
        };
        desconto = subtotal * 0.1
        total = subtotal - desconto
        qS('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        qS('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        qS('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    }else {
        qS('aside').classList.remove('show')
        qS('aside').style.left = '100vw';
    } 
};




