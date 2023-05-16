

// Проверяем, есть ли такой элемент на странице
if (document.querySelector('.custom-header-cart')) {
  // Находим элемент с классом '.custon-header-cart' на странице
  const customHeaderCart = document.querySelector('.custom-header-cart');

  // Добавляем обработчик события 'mouseover' для добавления активного класса .active
  customHeaderCart.addEventListener('mouseover', () => {
    customHeaderCart.classList.add('active');
  });

  // Добавляем обработчик события 'mouseout' для удаления активного класса .active
  customHeaderCart.addEventListener('mouseout', () => {
    customHeaderCart.classList.remove('active');
  });
}
