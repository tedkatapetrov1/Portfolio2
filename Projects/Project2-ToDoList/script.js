const addBtn = document.getElementById('addBtn');
const itemInput = document.getElementById('itemInput');
const shoppingList = document.getElementById('categorySelect');

addBtn.addEventListener('click', () => {
  const itemText = itemInput.value.trim();
  const category = categorySelect.value;

  if (itemText !== '') {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = itemText;

    checkbox.addEventListener('change', () => {
      span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    
    const categoryList = document.getElementById(category);
    categoryList.appendChild(li)

    itemInput.value = '';
  }
});


itemInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addBtn.click();
  }
});