// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  //Click event for submitting userData
  $(".userForm").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    // Empty Form Field Validation
    if (
      $("#userLocation").val() == "" ||
      $("#userUsage").val() == "" ||
      $("#userOutput").val() == "" ||
      $("#userBrand").val() == ""
    ) {
      // Show error modal.
      $("#errorModal").modal("show");
    } else {
      //Grab user data from form field.
      let userData = {
        userLocation: $("#userLocation").val(),
        userArea: $("#userArea").val(),
        userUsage: $("#userUsage").val()
      };
      $.ajax({
        type: "post",
        url: "/api/userentry",
        data: userData,
        success: function (response) {
          console.log(response[0].dolls_yr);
          let annualUsage = 6 * userData.userUsage;
          let annualSavings = response[0].dolls_yr;
          let annualGen = parseInt(annualSavings / 0.24);
          console.log(annualGen);

          $("#annual-use").text(annualUsage + " kWh");
          $("#solar-gen").text(annualGen + " kWh");
          $("#savings-yr").text("$" + annualSavings);

          //Clear form fields on Submit
          $(".userForm")[0].reset();
        }
      });
    }
  });

  // Log in button function
  $(".logIn").on("click", function (event) {
    // if ($(loggedIn) === false) {
    // Show log in modal.
    $("#logInModal").modal("show");
    // }
  });

  // Register button function
  $(".register").on("click", function (event) {
    // Show Register modal.
    $("#registerModal").modal("show");
  });
});
