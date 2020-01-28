// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  //Click event for submitting userData
  $(".userForm").on("submit", function(event) {
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
        success: function(response) {
          console.log(response[0].dolls_yr);
          let annualUsage = 6 * userData.userUsage;
          let annualSavings = response[0].dolls_yr;
          let annualGen = parseInt(annualSavings / 0.24);
          console.log(annualGen);

          $("#annual-use").prepend(annualUsage);
          $("#solar-gen").prepend(annualGen);
          $("#savings-yr").append(annualSavings);

          // $(".userForm")[0].reset();
        }
      });
      //Clear form fields on Submit
    }
  });

  // Log in button function
  $(".logIn").on("click", function(event) {
    // if ($(loggedIn) === false) {
    // Show log in modal.
    $("#logInModal").modal("show");
    // }
  });

  // Register button function
  $(".register").on("click", function(event) {
    // Show Register modal.
    $("#registerModal").modal("show");
  });
});

// ALL EXAMPLE CODE BELOW HERE COMMENTED OUT

// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
