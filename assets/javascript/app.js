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
        formattedFirstTime = moment(trainTime, 'hh:mm').format("x")
        interval = freq * 60000;  // take frequency in minutes and multiple to get the unix number for minutes in milliseconds
        newTime = now - formattedFirstTime + interval
        minAway = moment.duration(newTime).humanize()
        console.log(formattedFirstTime + " formattedFirstTime " + trainTime)
        // while(now > formattedFirstTime) {
        //     var newTime = formattedFirstTime + interval
        // }
        //
        $('#next-display').text(formattedFirstTime)
        $('#min-display').text(minAway)
        // while(moment.now() < (formattedFirstTime + interval)) {
        //     $('#next-display').text(moment.now())  //.text(duration.hours()+ 'h:' + duration.minutes()+ 'm:');
        // } 
        //     // add another freq to the start time
        //     $('#next-display').text(moment.now())
        // }
        // formattedTime = (moment(trainTime, 'hh:mm').format("x") / 60000)
        // fromNow = (moment.now() / 60000)
        // minutesRemaining = formattedTime + (freq )
        // console.log(formattedTime + " here " + trainTime + " from now " + fromNow)
        // console.log(calcDuration + " calc Duration " + freq)
        
        // var convertedTrainTime = '1366549200';
        // var currentTime = '1366547400';
        // var leftTime = eventTime - currentTime;//Now i am passing the left time from controller itself which handles timezone stuff (UTC), just to simply question i used harcoded values.
        // var duration = moment.duration(leftTime, 'seconds');
        // var interval = calcDuration;
    
        // setInterval(function(){
        //   // Time Out check
        //   if (duration.asSeconds() <= 0) {
        //     clearInterval(intervalId);
        //     // window.location.reload(true); //#skip the cache and reload the page from the server
        //   }

        //   //Otherwise
        //   duration = moment.duration(duration.asSeconds() - 1, 'seconds');
        //   $('#next-display').text(duration.hours()+ 'h:' + duration.minutes()+ 'm:');
        // }, interval);


        $("#train-display").append(train + "<br />");
        $("#destination-display").append(destination + "<br />");
        $("#freq-display").append(freq + "<br />");
        $("#trainTime-display").append(trainTime + "<br />");
        // $("#next-display").append(months + "<br />");
    
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