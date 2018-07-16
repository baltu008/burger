$(document).ready(function() {
  $("body").on("submit", ".create-update-form", function(e) {
    e.preventDefault();
    var burgerName = $(this)
    .find("input")
    .val()

    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
      data: {
        burger_name: burgerName
      }
    }).done((response) => {
      var id = response.id;
      $("#not-eaten").append(`
              <li>
                  <span>    
                      ${burgerName}
                  </span>
                  <div class="row row-burgerBtn">
                    <form class="burgerBtnEat col-6" action="burgers/update/${id}?_method=PUT" method="POST" data-id="${id}">
                      <input type="hidden" name="devoured" value="true">
                      <a href="#not-eaten"><button class="btn btn-primary float-right" type="submit">Eat</button></a>
                    </form>
                    <form class="burgerBtnDelete col-6" action="burgers/delete/${id}?_method=DELETE" method="POST" data-id="${id}">
                      <button href="#not-eaten" class="btn btn-danger float-left" type="submit">Remove</button>
                    </form>
                  </div>
                </li>`);
    });
    $(this).find('input').val('');
  });

  $("body").on("submit", ".burgerBtnEat", function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
      data: { devoured: true }
    });
    var eatToDevour = $(this).closest("li");
    $(this)
      .closest("li")
      .remove();
    var id = eatToDevour.find("[data-id]").attr("data-id");
    $("#eaten").append(`
        <li>
            <span>    
                ${eatToDevour.find("span").text()}
            </span>
            <form class="regurgitate" action="burgers/update/${id}?_method=PUT" method="POST" data-id="${id}">
              <input type="hidden" name="devoured" value="false">
              <button class="btn btn-primary" type="submit">Regurgitate?</button>
            </form>
          </li>`);
  });
  $("body").on("submit", ".regurgitate", function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
      data: { devoured: false }
    });
    var regurgitate = $(this).closest("li");
    $(this)
      .closest("li")
      .remove();
    var id = regurgitate.find("[data-id]").attr("data-id");
    $("#not-eaten").append(`
        <li>
            <span>    
                ${regurgitate.find("span").text()}
            </span>
            <div class="row row-burgerBtn">
              <form class="burgerBtnEat col-6" action="burgers/update/${id}?_method=PUT" method="POST" data-id="${id}">
                <input type="hidden" name="devoured" value="true">
                <a href="#not-eaten"><button class="btn btn-primary float-right" type="submit">Eat</button></a>
              </form>
              <form class="burgerBtnDelete col-6" action="burgers/delete/${id}?_method=DELETE" method="POST" data-id="${id}">
                <button href="#not-eaten" class="btn btn-danger float-left" type="submit">Remove</button>
              </form>
            </div>
          </li>`);
  });
  $("body").on("submit", ".burgerBtnDelete", function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr("action"),
      method: "POST"
    });
    var deleteBurger = $(this).closest("li");
    $(this)
      .closest("li")
      .remove();
  });
});
