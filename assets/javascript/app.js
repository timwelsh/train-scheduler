$( document ).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHRKPi0VUxfrIYRcERwudayB2eqAOiZBQ",
    authDomain: "trains-adf68.firebaseapp.com",
    databaseURL: "https://trains-adf68.firebaseio.com",
    projectId: "trains-adf68",
    storageBucket: "trains-adf68.appspot.com",
    messagingSenderId: "267982629708"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    var train;
    var destination;
    var trainTime;
    var freq;
    var newTime;

    database.ref().on("child_added", function(snapshot) {

        train = snapshot.val().train;
        destination = snapshot.val().destination;
        trainTime = snapshot.val().trainTime;
        freq = snapshot.val().freq;
        now = moment.now();

        var tFrequency = freq;
        var firstTime = trainTime;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        $("#train-display").append(train + "<br />");
        $("#destination-display").append(destination + "<br />");
        $("#freq-display").append(freq + "<br />");
        $("#trainTime-display").append(trainTime + "<br />");
        $('#next-display').text(moment(nextTrain).format("hh:mm"))
        $('#min-display').text(tMinutesTillTrain)
    
    // }, function(errorObject) {
    // console.log("Error: " + errorObject.code);
    });

    $('#add-train').click(function(event) {
        event.preventDefault()

        train = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = $("#train-time-input").val().trim();
        freq = $("#freq-input").val().trim();

        database.ref().push({
            train : train,
            destination: destination,
            trainTime: trainTime,
            freq: freq,
            date:firebase.database.ServerValue.TIMESTAMP
        })

    });
});