const $ = require("jquery");

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

var html = ""
var buttons = $(".delete").length

function displayMovies(data){
  for(var i = 0; i < data.length; i++){
    $(".delete").val(i)
    html += "<div>" + data[i].title + data[i].rating +"<button class='delete'>" + "Delete" + "</button>"+ "</div>"
    $("#movie").html(html)
  }
  $(".delete").click(function(){
    console.log($(this).val())
    // $.ajax({
    //   url: `/api/movies/{i + 1}`,
    //   type: 'DELETE',
    // });
  })
  return html
}

// var buttons = document.getElementsByClassName('delete');
// for (var i=0 ; i < buttons.length ; i++){
//   (function(index){
//     buttons[index].onclick = function(){
//       alert("I am button " + index);
//     };
//   })(i)
// }

function getMoviesfunc() {
  getMovies().then((movies) => {
    displayMovies(movies)
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}

getMoviesfunc();

$("#submit").click(function(){
  console.log("test")
  $.ajax("/api/movies", {
    type: "POST",
    data: {
      title: $("#name").val(),
      rating: $("#rating").val()
    }
  });
  html=""
  getMoviesfunc();
})












