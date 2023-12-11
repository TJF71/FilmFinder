const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTgxYTU4OGIxMGE3ZTllNzRjMGFhYjUwNWQ5MWExZiIsInN1YiI6IjY1MmVlMWExMDI0ZWM4MDExZTM1OWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hmug88MC6q75pV1WJhGLU0seYmOOnKzQYuzX_KY5c4U"

async function getMovies() {      // calls API and gets movies
    try {

        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {  // get the movie db from the net
            headers: {
                'Authorization': `Bearer ${API_KEY}`
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
        Swal.fire({
            backdrop: false,
            title: 'Ooops!',
            text: 'Something went wrong reaching the TMDV API.',
            icon: 'error'
        })
    }
}

async function getMovie(movie_id) {      // calls API and gets movies


    try {

        let response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, {  // get the movie db from the net
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json();  // assingn the db to variable 'data'


        return data;

    } catch (error) {
        Swal.fire({
            backdrop: false,
            title: 'Ooops!',
            text: 'Something went wrong reaching the TMDV API.',
            icon: 'error'
        })
    }
}


async function displayMovies() {

    let data = await getMovies();  // call the movies from the getMovies function

    const movieListDiv = document.getElementById('movie-list');
    movieListDiv.innerHTML = '';  // prevents repeats of adds of movie list
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
        movieParagraphElement.textContent = movie.overview;  // target movie overview and apply it

        let movieButton = movieCard.querySelector('.btn-primary');
        movieButton.setAttribute('data-movieId', movie.id);

        movieListDiv.appendChild(movieCard); // adding movie details to the card movieListDiv


    }
}

// get the movie genres
async function getGenres() {

    // attempting to get genre dae from the movie database
    try {

        // wait for async response from URL
        let response = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        // take the string returned back adn convert it to JSON object
        let data = await response.json();

        return data;

        // if something goes wrong, run this backup code
    } catch (error) {
        console.error(error);
    }

}

async function showMovieDetails(clickedBtn) {

    // get the ID of the movie that was clicked
    let movieId = clickedBtn.getAttribute('data-movieId');

    let moviedata = await getMovie(movieId);


    //TESTING: put the movie ID in the modal

    let poster = document.querySelector('#movieModal .poster');
    poster.src = `https://image.tmdb.org/t/p/w500${moviedata.poster_path}`;


    let movieTagline = document.querySelector('#movieTagline');
    movieTagline.innerHTML = `<strong>Tagline: </strong> "<em>${moviedata.tagline}</em>"`;

    let movieOverview = document.querySelector('#movieOverview');
    movieOverview.innerHTML = `<strong>Overview: </strong> ${moviedata.overview}`;

    
    let format = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      };


    let movieBudget = document.querySelector('#movieBudget');
    movieBudget.innerHTML = `<strong>Budget: </strong> ${moviedata.budget.toLocaleString('en-US', format)}`;



    let movieRuntime = document.querySelector('#movieRuntime');
    movieRuntime.innerHTML = `<strong>Runtime: </strong> ${moviedata.runtime} minutes` ;


    // let url = document.querySelector('#movieModal .url')
    // url.textContent = `The Movie site is located at : ${moviedata.homepage}`


    // let country = document.querySelector('#moveModal .prodCountry');
    // country.textContent = `Procudtion country: ${moviedata.production_companie}`;


    let movieHomepage = document.getElementById('movieHomepageBtn');
    movieHomepage.href = moviedata.homepage;






}