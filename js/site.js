const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTgxYTU4OGIxMGE3ZTllNzRjMGFhYjUwNWQ5MWExZiIsInN1YiI6IjY1MmVlMWExMDI0ZWM4MDExZTM1OWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hmug88MC6q75pV1WJhGLU0seYmOOnKzQYuzX_KY5c4U"

async function getMovies() {      // calls API and gets movies
    try {

        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                'Authorization':`Bearer ${API_KEY}`
            }
        });

        let data = await response.json();

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

async function displayMovies() {

    let data = await getMovies();
    let movies = data.results; 

    const movieListDiv = document.getElementById('movie-list');
    const moviePosterTemplate = document.getElementById('movie-card-template');


    for (let i = 0; i < movies.length; i++) {
        
        let movie = movies[i];  // cycle through each movie one at a time

        let movieCard = moviePosterTemplate.content.cloneNode(true);  // copy of template

        let movieImageElement = movieCard.querySelector('.card-img-top');  // lock onto .card-img-top
        movieImageElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;  //change the path to the URL of the current movie with .src
        
        let movieTitleElement = movieCard.querySelector('.card-body > h5');  // get the move title from app.html
        movieTitleElement.textContent = movie.title;  // target movie.title

        let movieParagraphElement = movieCard.querySelector('.card-text')  // target the element of .card-text
        movieParagraphElement.textContent =  movie.overview;  // 

        movieListDiv.appendChild(movieCard); // adding movie list
        


    }

}
