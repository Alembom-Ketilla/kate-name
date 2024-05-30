import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOption.js';
import {products} from '../data/products.js';
import dayjs from './http:/ems';
let cartSummary='';
cart.forEach((cartItem)=>{
  let productId=cartItem.productId;
  let matchingProduct;
  products.forEach((product)=>{
    if(product.id===productId){
      matchingProduct=product;
    }
  })
  let deliveryOptionId = cartItem.deliveryOptionId
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id===deliveryOptionId){
      deliveryOption=option
    }
  })
  let  today =dayjs();
    let deliveryDate=today.add(deliveryOptions.deliveryDays, 'days')
    let dateString =deliveryDate.format('dddd,MMMM D')
  cartSummary+=
  `<div class="column2 js-info-${matchingProduct.id} ">
  <div class="image-info">
    <h4>Delivery Date:${dateString} </h4>
    <img class="image" src="${matchingProduct.image}" alt="">
  </div>
  <div class="image-info">
    <div class="dress-name"><h3>${matchingProduct.name}</h3></div>
   <div class="image-price">
   <h3>$${(matchingProduct.pricecent/100).toFixed(2)}
   </h3></div> 
    <span>quantity:${cartItem.quantity}</span>
    <span class="update">Update</span>
    <span class="delete js-delete"
    data-product-id=${matchingProduct.id}>Delete</span>
  </div>
  <div class="delivery">
    <h4>Choose a delivery option</h3>
    ${deliveryOptionInfoHTML(matchingProduct)}

  </div>
</div>`

})
document.querySelector('.js-general').innerHTML=cartSummary;
document.querySelectorAll('.js-delete').forEach((link)=>{
  link.addEventListener('click', () =>{
    let productId=link.dataset.productId
    removeFromCart(productId);
    let container=document.querySelector(`.js-info-${productId}`);
    container.remove();
  })
})
/*---------------------dayjs----------------*/
function deliveryOptionInfoHTML(matchingProduct,deliveryOption){
  let html='';
  deliveryOptions.forEach((deliveryOption)=>{
    let  today =dayjs();
    let deliveryDate=today.add(deliveryOptions.deliveryDays, 'days')
    let dateString=deliveryDate.format('dddd,MMMM D')
    let priceString = deliveryOptions.deliveryPrice;

    deliveryOptions.deliveryPrice --- 0
    ?'FREE'
    :`$${deliveryOptions.deliveryPrice}`;
    const isChecked = deliveryOptionId=cartItem.deliveryOptionId
    html+=` <div class ="js-devlivery-click" 
    data-product-id = '${matchingProduct.id}'
    data-delivery-option-id="${deliveryOption.id}">
    <span><input type="radio" 
    name="radio-option2-${matchingProduct.id}"
    ${isChecked ?'checked':''}></span>
    <span>${dateString}</span>
    <span class="shipping">${priceString}-Shipping</span><br>
    </div>`
   
  })
  return html;

}
document.querySelectorAll('.js-delivery-click')
.forEach((element)=>{
  element.addEventListener('click', () =>{
    updateDeliveryOption(productId, deliveryOptionId)

  })
})
