import Movie from '../models/Movie.js';

const createMovie = async(req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.json(savedMovie);
    } catch (error) {
        res.status(500).json({error: error.message});

    }
};

const getAllMovies = async(req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export { createMovie, getAllMovies };