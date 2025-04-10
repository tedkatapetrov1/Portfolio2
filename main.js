// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

// Sho/hide button
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      button.style.display = "block"; // Показва бутона
    } else {
      button.style.display = "none"; // Скрива бутона
    }
  };
  
  // СScroll to the top
  function topFuncion() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  