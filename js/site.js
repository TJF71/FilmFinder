const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTgxYTU4OGIxMGE3ZTllNzRjMGFhYjUwNWQ5MWExZiIsInN1YiI6IjY1MmVlMWExMDI0ZWM4MDExZTM1OWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hmug88MC6q75pV1WJhGLU0seYmOOnKzQYuzX_KY5c4U"

async function getMovies() {      // calls API and gets movies
    try {

        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {  // get the movie db from the net
            headers: {
                'Authorization':`Bearer ${API_KEY}`
            }
        });

        let data = await response.json();  // assingn the db to variable 'data'

        /*
            data = {
                page: 1,
                results: [ {}, {}, {}...]
                total_pages: 29045,
                total_results: 817902
            }
        */ 

        return data;

    } catch (error) {
        console.error(error);
    }
}

async function getMovie() {      // calls API and gets movies
    try {

        let response = await fetch('https://api.themoviedb.org/3/movie/575264', {  // get the movie db from the net
            headers: {
                'Authorization':`Bearer ${API_KEY}`
            }
        });

        let data = await response.json();  // assingn the db to variable 'data'


        return data;

    } catch (error) {
        console.error(error);
    }
}


async function displayMovies() {

    let data = await getMovies();  // call the movies from the getMovies function

    const movieListDiv = document.getElementById('movie-list');
    const moviePosterTemplate = document.getElementById('movie-card-template');

    let movies = data.results;   // create a variable from the results


    for (let i = 0; i < movies.length; i++) {
        
        let movie = movies[i];  // cycle through each movie one at a time

        let movieCard = moviePosterTemplate.content.cloneNode(true);  // get a copy of template and assign it

        let movieImageElement = movieCard.querySelector('.card-img-top');  // lock onto .card-img-top template
        movieImageElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;  //load the image to movieImageElement
        
        let movieTitleElement = movieCard.querySelector('.card-body > h5');  // get the move title from app.html
        movieTitleElement.textContent = movie.title;  // target movie title only and apply it

        let movieParagraphElement = movieCard.querySelector('.card-text')  // target the element of .card-text
        movieParagraphElement.textContent =  movie.overview;  // target movie overview and apply it
        
        let movieButton = movieCard.querySelector('.btn-primary');
        movieButton.setAttribute('data-movieId', movie.id);

        movieListDiv.appendChild(movieCard); // adding movie details to the card movieListDiv
        

    }
}


async function showMovieDetails(clickedBtn){

    // get the ID of the movie that was clicked
    let movieId = clickedBtn.getAttribute('data-movieId');

    //TESTING: put the movie ID in the modal
    let modalBody = document.querySelector('#movieModal .modal-body');
    modalBody.textContent = `Movie ID is: ${movieId}`;

    // get theg details of the movie with that ID from TMDB API

    // put thos details into my modal
}