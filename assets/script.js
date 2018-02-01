$(function () {

    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAuzXsn2yOOvpQOTD_zI9MqnlGM7Fv4VhA",
        authDomain: "cool-project1.firebaseapp.com",
        databaseURL: "https://cool-project1.firebaseio.com",
        projectId: "cool-project1",
        storageBucket: "cool-project1.appspot.com",
        messagingSenderId: "922892748699"
    };
    firebase.initializeApp(config);

    var database = firebase.database();



    var trainCounter = 0;

    $('#run-search').click(function (event) {
        event.preventDefault();
        // takes values from input
        trainCounter++;
        var train = $('#train-name').val().trim();
        var dest = $('#destination').val().trim();
        var time = $('#first-train').val().trim();
        var freq = $('#frequency').val().trim();

        var newTrain = {
            train: train,
            dest: dest,
            time: time,
            freq: freq
        };

        database.ref().push(newTrain);

    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var train = childSnapshot.val().train;
        var dest = childSnapshot.val().dest;
        var time = childSnapshot.val().time;
        var freq = childSnapshot.val().freq;

        console.log(train);
        console.log(dest);
        console.log(time);
        console.log(freq);


        var currentTime = moment().format("hh:mm");

        $("#timekeeper").html("<h1>" + currentTime + "</h1>");


        var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % freq;
        console.log(tRemainder);
        var nextTrain = freq - tRemainder;
        var arrival = moment().add(nextTrain, "minutes");




        // adds them to page
        var trainSection = $("<div>");
        trainSection.addClass("well");
        trainSection.attr("id", "train-well-" + trainCounter);
        $("#train-section").append(trainSection);


        $(trainSection).append("<p class='trainName'>Train: " + train + "</p>" + "<p class='frequency'>Frequency: " + freq + " minutes</p>" + "<p class='trainTime'>Arrival Time: " + time + "</p>" + "<p class='destination'>Destination: " + dest + "<p class='nextTrain'>Time Until Next Train: " + nextTrain + " minutes</p> <p class='arrival'>Next Arrival: " + moment(arrival).format("hh:mm") + "</p>");












    });
});

