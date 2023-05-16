const tabs = document.querySelectorAll('.custom-tabs__list button');
const tabContents = document.querySelectorAll('.custom-tabs__details-content');
const showDetailBtn = document.querySelector('.show-details');

if (showDetailBtn) {
  showDetailBtn.addEventListener('click', () => {
    // Прокручиваем к блоку с классом .custom-tabs
    const customTabsBlock = document.querySelector('.custom-tabs');
    customTabsBlock.scrollIntoView({ behavior: 'smooth' });

    // Удаляем класс .active у предыдущей активной вкладки и контента
    document.querySelector('.custom-tabs__list button.active').classList.remove('active');
    document.querySelector('.custom-tabs__details-content.active').classList.remove('active');

    // Добавляем класс .active текущей вкладке и контенту
    tabs[2].classList.add('active');
    tabContents[2].classList.add('active');
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Удаляем класс .active у предыдущей активной вкладки и контента
    document.querySelector('.custom-tabs__list button.active').classList.remove('active');
    document.querySelector('.custom-tabs__details-content.active').classList.remove('active');

    // Добавляем класс .active текущей вкладке и контенту
    tab.classList.add('active');
    tabContents[index].classList.add('active');

    // Если текущая вкладка не первая, прокручиваем к блоку с классом .custom-tabs
    if (index !== 0) {
      const customTabsBlock = document.querySelector('.custom-tabs');
      customTabsBlock.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
