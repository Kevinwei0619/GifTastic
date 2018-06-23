var topic = ["Cat", "Dog", "Bird", "Corgi", "Sea otter", "Red Panpa"];
var count = 1;



function readButton() {

    $("#viewButton").empty();


    for (var i = 0; i < topic.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("test-button");
        newButton.text(topic[i]);
        newButton.attr("data-val", topic[i]);
        $("#viewButton").append(newButton);

    }
}



function displayGif() {

    $("img").remove(".dataImg");
    count = 1;


    var newDataVal = $(this).attr("data-val");

    console.log(newDataVal);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        newDataVal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (respone) {


        for (var i = 0; i < respone.data.length; i++) {

            console.log(respone);
            console.log(queryURL);
            var newImage = $("<img>");

            newImage.attr("src", respone.data[i].images.fixed_height_still.url).addClass("dataImg");
            newImage.attr("data-animate", respone.data[i].images.fixed_height.url);
            newImage.attr("data-still", respone.data[i].images.fixed_height_still.url);
            newImage.attr("data-state", "still");
            newImage.attr("id" , "img"+count);

            $("#test" + count).append(newImage);
            count++
            console.log("test");
            console.log(count);


        }
    })
}





$("#addSomething").on("click", function (event) {
    event.preventDefault();

    var newdata = $("#newData").val().trim();



    if (newdata == "") {
        alert("add something");

    } else {
        topic.push(newdata);
        readButton();

    }
});

readButton();
$(document).on("click", ".test-button", displayGif);


$(document).on("click" ,".dataImg",function () {
    console.log("in the click function");

    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("in the if");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log("in the else");
    }
});