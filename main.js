// Показва/скрива бутона при скрол
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      button.style.display = "block"; // Показва бутона
    } else {
      button.style.display = "none"; // Скрива бутона
    }
  };
  
  // Скролира към горе при натискане на бутона
  function topFuncion() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  