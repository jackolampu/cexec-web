'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});

$(document).ready(function() {
  // Initialize cart and total cost
  let cart = [];
  let totalCost = 0;


  // Check if there is cart data in local storage
  const savedCart = localStorage.getItem('cart');
  const savedTotalCost = localStorage.getItem('totalCost');
  
  if (savedTotalCost) totalCost = parseFloat(savedTotalCost);
  if (savedCart) {
      cart = JSON.parse(savedCart);
      $('.cart-badge').text(cart.length)
      updateCart()
  }

  // Add to Cart Button Click Event
  $('.add-to-cart').click(function() {
      let card = $(this).closest('.card');
      let title = card.find('.card-title').text();
      let image = card.find('img').attr('src');
      let price = parseFloat(card.find('.price').text().replace('₹', ''));

      // Add the product to the cart
      cart.push({ title: title, price: price, image: image });
      totalCost += price;

      // Update the cart and total cost
      updateCart();
      
      // Save the updated cart and total cost to local storage
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('totalCost', totalCost.toString());
  });

  // Update Cart
  function updateCart() {
      $('#cart').empty();
      cart.forEach(function(item, index) {
          $('#cart').append(`
              <li class="d-flex gap-2 align-items-center justify-content-between list-group-item">
                  <div class="mr-2 flex w-25 font-semibold">
                      <img src=${item.image} class="object-contain rounded-lg border img-thumbnail bg-white shadow-lg h-16 w-16">
                  </div>
                  <div class="w-2/3 font-semibold flex items-center capitalize">${item.title}</div>
                  <span>₹${item.price}</span>
                  <button type="button" class="remove-from-cart btn-close" data-index="${index}" aria-label="Close"></button>
              </li>
          `);
      });
  
      $('#cart-total').text(`$${totalCost.toFixed(2)}`);
  
      $('.cart-badge').text(cart.length);
  }
  

  // remove items from the cart
  $('#cart').on('click', '.remove-from-cart', function() {
      const index = $(this).data('index');
      const removedItem = cart.splice(index, 1)[0];
      totalCost -= removedItem.price;
      updateCart();
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('totalCost', totalCost.toString());
  });

  // navbar
  $(window).scroll(function() {
      $(this).scrollTop() > 0 ? $('.navbar').addClass('bg-body-tertiary') : $('.navbar').removeClass('bg-body-tertiary');
  });


  // form submission
  $('#book form').submit(function (event) {
      event.preventDefault(); 
      $('.toast').toast('show');
      $('#book form .btn').text('Table Booked');
      $('#book form .btn').prop('disabled', true);
  });


  // filtering food items
  let $filterBtn = $('.filter-btn');
  let $item = $('.food-item');
  
  $filterBtn.click(function() {
      $filterBtn.removeClass('active');
      $(this).addClass('active');
      
      let dataFilter = $(this).attr('data-filter');
      
      $item.removeClass('active').addClass('hide');
      
      $item.each(function() {
          let categories = $(this).data('categories').split(' ');
          if (dataFilter === 'all' || categories.includes(dataFilter)) {
              $(this).removeClass('hide').addClass('active');
          }
      });
  });

});