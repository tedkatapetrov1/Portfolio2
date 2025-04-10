// Показва/скрива бутона при скрол
window.onscroll = function() {
    var button = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      button.style.display = "block"; // Показва бутона
    } else {
      button.style.display = "none"; // Скрива бутона
    }
  };
  
  // Скролира към горе при натискане на бутона
  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  