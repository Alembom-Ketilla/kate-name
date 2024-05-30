import { deliveryOptions } from "./deliveryOption.js";
export let cart= JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=

  [
  {
    productId:'1a',
    quantity:1,
    deliveryOptionsId:'1'
    
  }
  ,
  {
    productId:'1b',
    quantity:1,
    deliveryOptionsId:'1'
  }
];
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function removeFromCart(productId){
  let newCart=[];
  cart.forEach((cartItem)=>{
    if(productId!==cartItem.productId){
      newCart.push(
        cartItem
      )  
    }
  })
  cart=newCart
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId)
{
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem
    }
    matchingItem.deliveryOptionId = deliveryOptionId
    saveToStorage();
  })
}