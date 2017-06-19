$(document).ready(function() {

  //readies the javascript upon running the page

  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  //array of buttons to be cerated

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

  //function calling the classes in the html

    for (var i = 0; i < arrayToUse.length; i++) {
      //referencing where the for loop will dump the buttons
      var a = $("<button>");
      //creating a variable that is a button
      a.addClass(classToAdd);
      //adding a class to the variable/button
      a.attr("data-type", arrayToUse[i]);
      //adding an attribute to the arrayToUse array
      a.text(arrayToUse[i]);
      //adding the button to the array
      $(areaToAddTo).append(a);
      //bringing the buttons into the html
    }

  }

  $(document).on("click", ".animal-button", function() {
    //calling when the buttons are clicked
    $("#animals").empty();
    //empty out the search area
    $(".animal-button").removeClass("active");
    //removing the active class from the animal buttons
    $(this).addClass("active");
    //adding the active class to the button that was clicked

    var type = $(this).attr("data-type");
    //adding the attribute of data-type to the variable "type"
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
    //creating the api variable to be called later

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    //calling the ajax functions for the api
    .done(function(response) {
      var results = response.data;
      //creating a results variable that that will call the data of the function's response

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class=\"animal-item\">");
        //making a new for loop that will take the results and produce the gifs

        var rating = results[i].rating;
        //calling the rating for the gifs

        var p = $("<p>").text("Rating: " + rating);
        //creating a variable for the p tag that'll display the ratings

        var animated = results[i].images.fixed_height.url;
        //variable for moving gifs
        var still = results[i].images.fixed_height_still.url;
        //variable for still gifs

        var animalImage = $("<img>");
        //creating a variable for the image tag that will be called
        animalImage.attr("src", still);
        //making the gifs active
        animalImage.attr("data-still", still);
        //making the gifs still
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);
      }
    });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    populateButtons(animals, "animal-button", "#animal-buttons");

  });

  populateButtons(animals, "animal-button", "#animal-buttons");
});