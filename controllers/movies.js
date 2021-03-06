const MovieSchema = require('../models/Movie.js');
const RatingSchema = require('../models/Rating.js');

module.exports.controller = (app) => {
    // fetch all movies
    app.get('/movies', (req, res) => {
        MovieSchema.find({}, 'name description release_year genre', (error, movies) => {
            if (error) { console.log(error); }
            res.send({
                movies,
            });
        });
    });

    // fetch all ratings
    app.get('/ratings', (req, res) => {
        RatingSchema.find({}, 'movie_id user_id rate', (error, ratings) => {
            if (error) { console.log(error); }
            res.send({
                ratings,
            });
        });
    });

    // fetch a single movie
    app.get('/api/movies/:id', (req, res) => {
        MovieSchema.findById(req.params.id, 'name description release_year genre', (error, movie) => {
            if (error) { console.log(error); }
            res.send(movie);
        });
    });

    // fetch a single rating
    app.get('/api/ratings/:id', (req, res) => {
        RatingSchema.findById(req.params.id, 'movie_id user_id rate', (error, rating) => {
            if (error) { console.log(error); }
            res.send(rating);
        });
    });


    // delete a single movie
    app.delete('/api/movies/:id', (req, res) => {
        MovieSchema.remove({
            _id: req.params.id
        },
            (error, user) => {
                if (error) { console.error(error); } res.send({ success: true })
            });
    });


    // rate a movie
    app.post('/movies/rate/:id', (req, res) => {
        const newRating = new RatingSchema({
            movie_id: req.params.id,
            user_id: req.body.user_id,
            rate: req.body.rate,
        })

        newRating.save((error, rating) => {
            if (error) { console.log(error); }
            res.send({
                movie_id: rating.movie_id,
                user_id: rating.user_id,
                rate: rating.rate,
            });
        });
    });


    // add a new movie
    app.post('/movies', (req, res) => {
        const newMovie = new MovieSchema({
            name: req.body.name,
            description: req.body.description,
            release_year: req.body.release_year,
            genre: req.body.genre,
        });

        newMovie.save((error, movie) => {
            if (error) { console.log(error); }
            res.send(movie);
        });
    });
};