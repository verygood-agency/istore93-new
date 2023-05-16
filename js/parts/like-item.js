const elements = document.querySelectorAll(".flag-product a");
if (elements.length > 0) {
  elements.forEach((element) => {
    element.addEventListener("click", function (event) {
      event.preventDefault();

      const innerElement = element.querySelector("i");

      if (element.classList.contains("active")) {
        element.classList.remove("active");
        innerElement.className = "flaticon-heart";
      } else {
        element.classList.add("active");
        innerElement.className = "flaticon-like";
      }
    });
  });
}

const elements2 = document.querySelectorAll(".heart");
if (elements2.length > 0) {
  elements2.forEach((element) => {
    element.addEventListener("click", function (event) {
      event.preventDefault();

      const innerElement = element.querySelector("i");

      if (element.classList.contains("active")) {
        element.classList.remove("active");
        innerElement.className = "flaticon-heart";
      } else {
        element.classList.add("active");
        innerElement.className = "flaticon-like";
      }
    });
  });
}


