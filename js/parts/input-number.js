// скрипт автоматически добавляет приставку, указанную в data-prefix, ко всем полям на странице. Вы можете использовать разные приставки для разных полей, добавив атрибут data-prefix:

var inputNumberList = document.querySelectorAll(".input-number");

function updateInputValueWithPrefix(input, value) {
  var prefix = input.dataset.prefix || ""; // Получаем приставку из дата-атрибута
  input.value = value + prefix; // Добавляем приставку к числу
}

inputNumberList.forEach(function (inputNumber) {
  var minusBtn = inputNumber.querySelector(".input-number__button--minus");
  var plusBtn = inputNumber.querySelector(".input-number__button--plus");
  var input = inputNumber.querySelector(".input-number__input");

  input.type = "text"; // Изменяем тип поля на 'text'

  // Запрещаем вводить что-либо, кроме чисел
  input.addEventListener("keypress", function (event) {
    if (!/^\d+$/.test(event.key)) {
      event.preventDefault();
    }
  });

  minusBtn.addEventListener("click", function () {
    var currentValue = parseInt(input.value, 10) || 0;
    if (currentValue > 0) {
      updateInputValueWithPrefix(input, currentValue - 1); // Обновляем значение с приставкой
    }
  });

  plusBtn.addEventListener("click", function () {
    var currentValue = parseInt(input.value, 10) || 0;
    updateInputValueWithPrefix(input, currentValue + 1); // Обновляем значение с приставкой
  });

  // Применяем приставку к текущему значению
  updateInputValueWithPrefix(input, parseInt(input.value, 10) || 0);
});
