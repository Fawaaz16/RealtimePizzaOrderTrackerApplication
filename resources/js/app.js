import axios from 'axios'
import initAdmin from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')//Get all the add to cart buttons. addToCart is an array.
let cartCounter = document.querySelector('#cartCounter')//# is for selecting id


function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {//We make an ajax call using axios library here as it is used to send requests to server
        cartCounter.innerText = res.data.totalQty//Analysis required
        // new Noty({
        //     text: "New item added"
        //   }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {   //Click is an event listener
        //console.log(e)
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        //dataset is used for getting data attribute
        //JSON string is converted into object using JSON parse
    })
})

initAdmin()