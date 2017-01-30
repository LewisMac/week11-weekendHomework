var characters = null;
var charactersNamesList = [];
var charactersHouseList = [];
var charactersActorList = [];
var charactersAncestryList = [];
var studentsList = [];
var staffList = [];
var charactersWandList = [];


var populateCharacterNames = function(){
  characters.forEach(function(character){
    if(!charactersNamesList.includes(character.name)){
      charactersNamesList.push(character.name);
    }
  });
}
var populateCharacterHouse = function(){
  characters.forEach(function(character){
    if(!charactersHouseList.includes(character.house) && character.house !== ""){
      charactersHouseList.push(character.house);
    } else if (!charactersHouseList.includes("Unknown") && character.house === ""){
      charactersHouseList.push("Unknown")
    }
  });
}
var populateCharacterActors = function(){
  characters.forEach(function(character){
    if(!charactersActorList.includes(character.actor)){
      charactersActorList.push(character.actor);
    }
  });
}
var populateCharacterAncestry = function(){
  characters.forEach(function(character){
    if(!charactersAncestryList.includes(character.ancestry) && character.ancestry !== ""){
      charactersAncestryList.push(character.ancestry);
    } else if(!charactersAncestryList.includes("Unknown") && character.ancestry === ""){
      charactersAncestryList.push("Unknown");
    }
  });
}
var populateStudents = function(){
  characters.forEach(function(character){
    if(!studentsList.includes(character.name) && character.hogwartsStudent){
      studentsList.push(character.name);
    }
  });
}
var populateStaff = function(){
  characters.forEach(function(character){
    if(!staffList.includes(character.name) && character.hogwartsStaff){
      staffList.push(character.name);
    }
  });
}
var populateCharacterWands = function(){
  characters.forEach(function(character){
    if(!charactersWandList.includes(character.wand) && (character.wand.core || character.wand.length || character.wand.wood !== "")){
      charactersWandList.push(character.wand);
    }
  });
}

var buildNewColumnChart = function(title, dataSeries, columnNames){
  var div = document.createElement("div");
  var body = document.querySelector("body");
  body.appendChild(div);
  var data = {title: title, series: dataSeries, columnNames: columnNames, container: div};
  new ColumnChart(data);
}

var buildNewPieChart = function(title, dataSeries){
  var div = document.createElement("div");
  var body = document.querySelector("body");
  body.appendChild(div);
  var data = {title: title, series: [{name: "Blood Type", data: dataSeries}], container: div};
  // console.log(dataSeries)
  new PieChart(data);
}

var createChartOfCharactersInHouse = function(){
  var chartTitle = "Number of characters in each Hogwarts House";
  var dataSeries = [];
  var houseSizes = [];

  charactersHouseList.forEach(function(house){
    var house = house;
    var houseList = characters.filter(function(character){
      return (character.house === house) || (character.house === "" && house === "Unknown");
    });
    houseSizes.push(houseList.length);
    dataSeries.push({name: house, data: [houseList.length]})
  });

  buildNewColumnChart(chartTitle, dataSeries, ["Houses"])
}

var createChartOfNumbersOfBloodlines = function(){
  var chartTitle = "Number of each blood type";
  var dataSeries = [];
  var bloodCount = [];
  charactersAncestryList.forEach(function(blood){
    var bloodType = blood;
    var noOfBlood = characters.filter(function(character){
      return (character.ancestry === bloodType) || (character.ancestry === "" && bloodType === "Unknown");
    })
    // bloodCount.push(noOfBlood.length);
    dataSeries.push({name: bloodType, y: noOfBlood.length})
  })
  buildNewPieChart(chartTitle, dataSeries);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if(this.status != 200) return;
  var jsonString = this.responseText;
  characters = JSON.parse(jsonString);
  populateCharacterNames();
  populateCharacterHouse();
  populateCharacterActors();
  populateCharacterAncestry();
  populateStudents();
  populateStaff();
  populateCharacterWands();
  createChartOfNumbersOfBloodlines();
  createChartOfCharactersInHouse();
}

var app = function(){
  var url = "http://hp-api.herokuapp.com/api/characters";
  makeRequest(url, requestComplete);
}

// window.onload = function(){
//   app();
// }