const navItems = document.querySelectorAll('.main-nav__item[data-target]');
const catalogMenuGroups = document.querySelectorAll('.catalog-menu__group');
const catalogMenu = document.querySelector('.catalog-menu');
let timeoutId;

function handleMouseOver(e) {
  // Очищаем задержку, если она уже была установлена
  clearTimeout(timeoutId);

  const targetId = e.currentTarget.getAttribute('data-target');
  const targetGroup = document.querySelector(targetId);

  if (targetGroup) {
    catalogMenuGroups.forEach(group => group.classList.remove('active'));
    targetGroup.classList.add('active');
  }

  catalogMenu.classList.add('active');
}

function handleMouseOut() {
  // Устанавливаем задержку перед удалением активных классов
  timeoutId = setTimeout(() => {
    catalogMenu.classList.remove('active');
    catalogMenuGroups.forEach(group => group.classList.remove('active'));
  }, 300); // Задержка в 300 миллисекунд
}

navItems.forEach(item => {
  item.addEventListener('mouseover', handleMouseOver);
  item.addEventListener('mouseout', handleMouseOut);
});

catalogMenu.addEventListener('mouseover', () => {
  // Очищаем задержку, если она уже была установлена
  clearTimeout(timeoutId);
  catalogMenu.classList.add('active');
});

catalogMenu.addEventListener('mouseout', () => {
  // Устанавливаем задержку перед удалением активных классов
  timeoutId = setTimeout(() => {
    catalogMenu.classList.remove('active');
    catalogMenuGroups.forEach(group => group.classList.remove('active'));
  }, 300); // Задержка в 300 миллисекунд
});

catalogMenuGroups[0].classList.add('active');
