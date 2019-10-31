//Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCdUHBG_V4TYgYI64w3PFkoAicNarLrQq8",
    authDomain: "train-schedule-data-440ed.firebaseapp.com",
    databaseURL: "https://train-schedule-data-440ed.firebaseio.com",
    projectId: "train-schedule-data-440ed",
    storageBucket: "train-schedule-data-440ed.appspot.com",
    messagingSenderId: "890570955785",
    appId: "1:890570955785:web:dc8fad985ad566e260ecd8"
  };

  firebase.initializeApp(firebaseConfig);

  let database = firebase.database();

//Button to add trains
$("#addTrainButton").on("click", function(event) {
    event.preventDefault();

    //Get user inputs and store in variable
    let trainName = $("#TrainNameInput").val().trim();
    let trainDestination = $("#DestinationInput").val().trim();
    let trainFrequency = $("#FrequencyInput").val().trim();
    let firstTrainDeparture = $("#DepartureTimeInput").val().trim();

    //Temporary object to hold input data
    let newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        rate: firstTrainDeparture
    };

    //Send new train info to Firebase database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.rate);

    alert("Train successfully added!");

    $("#TrainNameInput").val("")
    $("#DestinationInput").val("");
    $("#FrequencyInput").val("");
    $("#DepartureTimeInput").val("");

});