const apiURL = 'https://api.themoviedb.org/3';
const apiKey = '6ed12e064b90ae1290fa326ce9e790ff';

function computeGetURL(apiPath, params) {
  const queryParams = {
    api_key: apiKey,
    ...(params ? { ...params } : {}),
  };
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${apiURL}${apiPath}?${queryString}`;
}

async function getData(url, query) {
  const response = await fetch(computeGetURL(url, query));
  return await response.json();
}

const MovieAPI = {
  movie: {
    search: async (query) => await getData('/search/movie', { query }),
    popular: async (page = 1) => await getData('/movie/popular', { page }),
    details: async (movieId) => await getData(`/movie/${movieId}`),
    images: async (movieId) => await getData(`/movie/${movieId}/images`),
  },
};

export const imageBaseURL = 'https://image.tmdb.org/t/p/';

export default MovieAPI;
