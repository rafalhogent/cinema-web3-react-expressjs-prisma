import movies from "../assets/movies.json"

const getAllMovies = () => {
    return movies.map(m => {
        return {
            id: movies.indexOf(m),
            ...m
        }
    })
}

const getMovieById = (id) => {
    try {
        return movies[id]
    } catch (error) {
        return undefined;
    }
}

export {getAllMovies, getMovieById}