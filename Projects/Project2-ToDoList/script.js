const addBtn = document.getElementById('addBtn');
const itemInput = document.getElementById('itemInput');
const categorySelect = document.getElementById('categorySelect');

window.addEventListener('DOMContentLoaded', () => {
  const savedList = JSON.parse(localStorage.getItem('shoppingList')) || {};
  for (const category in savedList) {
    savedList[category].forEach(item => {
      createListItem(item.text, category, item.checked);
    });
  }
});

addBtn.addEventListener('click', () => {
  const itemText = itemInput.value.trim();
  const category = categorySelect.value;

  if (itemText !== '') {
    createListItem(itemText, category, false);
    saveList();
    itemInput.value = '';
  }
});

itemInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addBtn.click();
  }
});

function createListItem(text, category, isChecked) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isChecked;

  const span = document.createElement('span');
  span.textContent = text;
  span.style.textDecoration = isChecked ? 'line-through' : 'none';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.classList.add('deleteBtn');

  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveList();
  });

  checkbox.addEventListener('change', () => {
    span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    saveList();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  const categoryList = document.getElementById(category);
  categoryList.appendChild(li);
}

function saveList() {
  const data = {};
  const categoryElements = document.querySelectorAll('ul');

  categoryElements.forEach(ul => {
    const categoryId = ul.id;
    const items = [];

    ul.querySelectorAll('li').forEach(li => {
      const text = li.querySelector('span').textContent;
      const checked = li.querySelector('input[type="checkbox"]').checked;
      items.push({ text, checked });
    });

    if (items.length > 0) {
      data[categoryId] = items;
    }
  });

  localStorage.setItem('shoppingList', JSON.stringify(data));
}

const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
  const confirmClear = confirm('Are you sure you want to clear the entire shopping list?');

 if (confirmClear){
  document.querySelectorAll('ul').forEach(ul => {
    ul.innerHTML = '';
  });

  localStorage.removeItem('shoppingList')
 }
});
