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
$("#addTrainButton").on("click", function (event) {
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

    //Clear input fields
    $("#TrainNameInput").val("")
    $("#DestinationInput").val("");
    $("#FrequencyInput").val("");
    $("#DepartureTimeInput").val("");

});

//Firebase event to add trains to the database and a row in the HTML for new trains added
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    let trainName = childSnapshot.val().name;
    let trainDestination = childSnapshot.val().destination;
    let trainFrequency = childSnapshot.val().frequency;
    let firstTrainDeparture = childSnapshot.val().rate;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(firstTrainDeparture);

    //Variable for train frequency
    let tFreq = trainFrequency;

    let firstTrain = firstTrainDeparture;

    //Time of first train is pushed back one year to make sure it's before the current time
    let firstTrainConvert = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConvert);

    //Current Time Variable
    let currentTime = moment();
    console.log("This is the current time: " + moment(currentTime).format("hh:mm"));

    let timeDiff = moment().diff(moment(firstTrainConvert), "minutes");
    console.log("The difference in current time and first train time: " + timeDiff);

    //Remainder of time
    let timeRemainder = timeDiff % tFreq;
    console.log(timeRemainder);

    //Minutes until next train
    let minNextTrain = tFreq - timeRemainder;
    console.log("Next train comes in: " + minNextTrain + " minutes");

    let nextTrainTime = moment().add(minNextTrain, "minutes");
    console.log("Train arrival: " + moment(nextTrainTime).format("hh:mm"));

    //Create new rows in table

    let newTrainRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(firstTrainDeparture),
        $("<td>").text(nextTrainTime),
        $("<td>").text(minNextTrain)
    );

    $("#train-table").append(newTrainRow);
});