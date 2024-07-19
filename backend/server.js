import mongoose from "mongoose";
import dotenv from "dotenv";
import movies from "./models/moviesmodel.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const port = process.env.PORT ?? 3000;
const app = express();
const checkMovie = async (req, res, next) => {
    if (await movies.find()) {
        next();
    } else {
        return res.status(404).json({ message: "Movies DB is empty" });
    }
};
app.use(checkMovie);
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/movies/all", async (req, res) => {
    return res.status(200).json(await movies.find());
});

app.get("/movies/:id", async (req, res) => {
    const id = req.params.id;
    const movie = await movies.findOne({ id: id });
    if (movie) {
        return res.status(200).json(movie);
    } else {
        return res.status(404).json({ message: "Movie not found" });
    }
});

app.get("/genre/all", async (req, res) => {
    const genres = await movies.find().distinct("genres").sort().exec();
    return res.status(200).json(genres);
});

app.get("/genre/:type", async (req, res) => {
    const type = req.params.type.toLowerCase();

    if (type === "everything") {
        return res.status(200).json(await movies.find());
    }
    const filtered = await movies.find({ genres: type });

    if (filtered.length === 0) {
        return res.status(404).json({ message: "Genre not found" });
    }
    return res.status(200).json(filtered);
});
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, (error) => {
            if (error) console.log(error);
            else console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
