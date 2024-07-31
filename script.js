$(function () {
  const accordion = $(".accordion");
  const loadButton = $(".todos > button");
  const lists = $("ul");
  accordion.find("h3").on("click", function () {
    const result = $(this).next().css("display");
    if (result === "none") {
      accordion.find(".accordion-content").slideUp(200);
      $(this).next().slideDown(200);
    } else if (result === "block") {
      $(this).next().slideUp(200);
    }
  });

  function getData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://dummyjson.com/todos`,
        type: `GET`,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  loadButton.on("click", () => {
    getData()
      .then((res) => {
        $.each(res.todos, function (idx, el) {
          lists.append(`<li>${el.todo}</li>`);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
