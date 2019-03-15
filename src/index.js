const $ = require("jquery");

var TheMovieDb = require('themoviedb');
var api = new TheMovieDb('4128a2073fea17df96a911e65892a328');



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


// displays movies
function displayMovies(data) {

    for (var i = 0; i < data.length; i++) {
        html += "<div><h1>" + data[i].title + "</h1>" + data[i].rating + "</div>"
        $(".delete").val(i)
    }
    $("#movie").html(html)
    console.log(html);


    // deletes movies
    $("h1").dblclick(function () {
        var check = alert("Would you like to delete the movie?")
        var id = 0;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            if ($(this).text().toString() === data[i].title) {
                id = (data[i].id)
            }
        }
        const deleteMovie = {
            method: "DELETE"
        };
        fetch("/api/movies/" + id, deleteMovie)
        html = ""
        getMoviesfunc() // call API Again to refresh list
    })
    // edits movie rating
    $("#edit").click(function () {
        let id = 0;

        let movie = {title: $("#movie-titles").val(), rating: $("#edit-rating").val()}
        console.log($("#movie-titles").val())
        for (var i = 0; i < data.length; i++) {
            if ($("#movie-titles").val().toString() === data[i].title) {
                id = (data[i].id)
            }
        }
        const editRating = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        };
        fetch("/api/movies/" + id, editRating)
        html = ""
        getMoviesfunc();

    })
    return html
}
// adds movie to database
$("#submit").click(function () {
    let movie = {title: $("#name").val(), rating: $("#rating").val()}
    const addMovie = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    };
    fetch("/api/movies", addMovie)
    html = ""
    setTimeout(function(){
        getMoviesfunc();
    }, 2000)
    // getMoviesfunc();
})


// calls database
function getMoviesfunc() {
    getMovies().then((movies) => {
        displayMovies(movies)
        select(movies)
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
    return ;
}
// adds options to select
const select = (data) => {
    let movieOptions = "";
    for (var i = 0; i < data.length; i++) {
        movieOptions += "<option>" + data[i].title + "</option>"
    }
    $("#movie-titles").html(movieOptions)

}

getMoviesfunc();


















