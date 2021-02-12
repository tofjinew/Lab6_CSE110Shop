// Script.js

window.addEventListener('DOMContentLoaded', () => {
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function(data) {
    data.forEach(function(item, index) {
      localStorage.setItem(index,JSON.stringify(item));
    });
  });
  
  let count = document.getElementById('cart-count');

  if(localStorage.getItem('cart') == null) {
    localStorage.setItem('cart','[]');
  } else {
    var cart = JSON.parse(localStorage.getItem('cart'));
    count.textContent = cart.length;
  }

  for (var i = 0; i < localStorage.length-1; i++) {
    const iobj = JSON.parse(localStorage.getItem(i));
    let item = document.createElement('product-item');

    item.shadowRoot.firstChild.childNodes[0].src = iobj.image;
    item.shadowRoot.firstChild.childNodes[0].alt = iobj.title;
    item.shadowRoot.firstChild.childNodes[1].textContent = iobj.title;
    item.shadowRoot.firstChild.childNodes[2].textContent = '$'+ iobj.price;
    
    let add = item.shadowRoot.firstChild.childNodes[3];
    add.addEventListener('click', function() {
      let count = document.getElementById('cart-count');
      
      if(add.textContent == 'Add to Cart') {
        cart.push(iobj.id);
        localStorage.setItem('cart',JSON.stringify(cart));
        alert('Added to Cart!');
        add.textContent = 'Remove from Cart';
        count.textContent = count.textContent - 0 + 1;
      }

      else {
        cart.splice(cart.indexOf(iobj.id),1);
        localStorage.setItem('cart',JSON.stringify(cart));
        alert('Removed from Cart!')
        add.textContent = 'Add to Cart';
        count.textContent = count.textContent - 1;
      }
    });
    
    if(cart.indexOf(iobj.id) != -1) {
      item.shadowRoot.firstChild.childNodes[3].textContent = 'Remove from Cart';
    }

    document.getElementById("product-list").appendChild(item);
  }

  
});
