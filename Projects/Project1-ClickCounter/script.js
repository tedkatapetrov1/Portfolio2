let count = 0;

const countE1 = document.getElementById('count')
const clickBtn = document.getElementById('clickBtn')
const resetBtn = document.getElementById('resetBtn')

// counting when clicking the button

clickBtn.addEventListener('click', () => {
    count++;
    countE1.textContent = count;
});

resetBtn.addEventListener('click', () => {
    count = 0
    countE1.textContent = count;
})