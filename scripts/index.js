const API_KEY = 'c653996b5d43970d3c973842a15453d2'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

const LIST_MOVIES = [
  'tt12801262', 
  'tt10298810', 
  'tt8097030', 
  'tt12412888', 
  'tt7146812', 
  'tt2953050', 
  'tt7504818', 
  'tt4633694', 
  'tt8115900', 
  'tt3470600', 
  'tt4823776'
]
const moviesList = document.getElementById('ul-movie-list')


function getUrlMovie(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}


function setMainMovie(movieId) {
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    const rating = document.querySelector('.rating strong')
    const app = document.getElementById('app')
    const title = document.querySelector('.movie h1')
    const description = document.querySelector('.movie p')
    const info = document.querySelector('.movie span')
  
    const yearRelease = data.release_date.split('-')[0]
  
    rating.innerHTML = data.vote_average
    title.innerHTML = data.title
    description.innerHTML = data.overview
  
    if (data.genres.length < 2) {
      info.innerHTML = yearRelease + ' - ' + data.genres[0].name
    } else {
      info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - ' + data.genres[data.genres.length-1].name
    }
    
    const image = BASE_URL_IMAGE.concat(data.backdrop_path)
    app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`
  })
}

function createButtonMovie(movieId) {
  const button = document.createElement('button')
  button.setAttribute('onclick', `setMainMovie('${movieId}')`)
  button.innerHTML = '<img src="/assets/icon-play-button.png" alt="ìcone play"/>'
  return button
}

function createMovie(movieId) {
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    const movie = document.createElement('li')
    const genre = `<span>${data.genres[0].name}</span>`
    const title = `<strong>${data.title}</strong>`
    const image = BASE_URL_IMAGE.concat(data.backdrop_path)

    movie.innerHTML = genre + title
    movie.appendChild(createButtonMovie(movieId))
    movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${image}')`
    moviesList.appendChild(movie)
  })
}

function loadListMovies() {
  LIST_MOVIES.map(createMovie)
}
loadListMovies()

setMainMovie(LIST_MOVIES[0])