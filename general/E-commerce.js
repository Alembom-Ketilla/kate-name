
import {cart, saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';
//--------------HTML DATA----------------------------------
 let productsHTML='';
 products.forEach((product)=>{
  productsHTML +=`<div class="dress-one" id="1a">
  <img class="image" src="${product.image}" alt="">
  <h3>${product.name}</h3>
  <h3>$${(product.pricecent/100).toFixed(2)}</h3>
  <select name="" id="">
    <label for="">Add</label>
    <option value="one">1</option>
    <option value="two">2</option>
    <option value="three">3</option>
    <option value="four">4</option>
    <option value="five">5</option>
  </select>
  <button class="add-button js-active-button " 
  data-product-id="${product.id}">Add to cart</button>
</div>` 
 });
 document.querySelector('.dresses-info').innerHTML=productsHTML;

 //---------------MAKING THE ADD TO CART BUTTON INTERACTIVE--
 document.querySelectorAll('.js-active-button')
 .forEach((button)=>{
  button.addEventListener('click',()=>{
   let productId= button.dataset.productId;
   let matchingItem;
   cart.forEach((cartItem)=>{
    if(productId==cartItem.productId){
      matchingItem=cartItem;
    }
   })
   if(matchingItem){
    matchingItem.quantity++;
   }
   else
   {cart.push({
    productId:productId,
    quantity:1
   });
}
saveToStorage();
   let cartquantity=0;
   cart.forEach((cartItem)=>{
    cartquantity+=cartItem.quantity;
   })
   document.querySelector('.add-cart-info')
   .innerHTML=cartquantity;
  })
 })
