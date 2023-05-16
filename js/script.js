// Функции
// функция подключения скриптов
function includeFiles(url) {
  var script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

// Основная рабочая область
document.addEventListener("DOMContentLoaded", () => {

  // подключаем файлы тут
  includeFiles("./js/parts/catalog-menu.js");
  includeFiles("./js/parts/yandex.map.js");
  includeFiles("./js/parts/sliders-collection.js");
  includeFiles("./js/parts/show-details.js");
  includeFiles("./js/parts/input-number.js");
  includeFiles("./js/parts/custom-header-cart.js");
  includeFiles("./js/parts/like-item.js");
  includeFiles("./js/parts/promocode-enter.js");
  includeFiles("./js/parts/cust-under-price.js");

});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));
