import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    genres: [String],
    ratings: [Number],
    poster: String,
    contentRating: String,
    duration: String,
    releaseDate: String,
    averageRating: Number,
    originalTitle: String,
    storyline: String,
    actors: [String],
    imdbRating: String,
    posterurl: String,
});

export default mongoose.model("movie", movieSchema);
