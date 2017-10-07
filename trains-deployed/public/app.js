/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4Hp_g0ErPg_l1lB9BFY0IYxYDHkDivJo",
    authDomain: "train-8321b.firebaseapp.com",
    databaseURL: "https://train-8321b.firebaseio.com",
    projectId: "train-8321b",
    storageBucket: "train-8321b.appspot.com",
    messagingSenderId: "663376530123"
  };
  
  firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = "";
  var trainDest = ""
  var trainFirst = "";
  var trainRate = 0;
  var currentTime = moment();
var index = 0;

 trainName = $("#train-name-input").val().trim();
  trainDest = $("#destination-input").val().trim();
  trainFirst = $("#first-input").val().trim();
  trainRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    rate: trainRate
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#rate-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFirst = childSnapshot.val().first;
  var trainRate = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainRate);

// Show current time
var datetime = null,
date = null;

var update = function () {
  date = moment(new Date())
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
  datetime = $('#current-status')
  update();
  setInterval(update, 1000);
});
  
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
  //console.log("FTC: "+firstTimeConverted);

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //console.log("Difference in time: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainRate;
  //console.log(tRemainder);

  // Minute Until Train
  var minutesAway = trainRate - tRemainder;
  //console.log("Minutes away: " + minutesAway);

  // Next Train
  var nextTrain = moment().add(minutesAway, "minutes");
  //console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

  // Arrival time
  var nextArrival = moment(nextTrain).format("HH:mm a");

  var nextArrivalUpdate = function() {
    date = moment(new Date())
    datetime.html(date.format('HH:mm a'));
  }

  

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainRate + "</td><td>" +
  nextArrival + "</td><td>" + minutesAway + "</td><td>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
