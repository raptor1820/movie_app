import express from "express";
import movies_data from "./movies_data.json";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = process.env.PORT ?? 3000;
dotenv.config();

const checkMovie = (req, res, next) => {
    try {
        if (!movies_data)
            return res.status(404).json({ message: "Movies DB is empty" });
        next();
    } catch (error) {
        return res.status(404).json({ message: "Movies DB not found" });
    }
};
app.use(checkMovie);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/movies/all", (req, res) => {
    return res.status(200).json(movies_data);
});

app.get("/movies/:id", (req, res) => {
    const id = req.params.id;
    if (id < 1 || id > movies_data.length) {
        return res.status(404).send("Movie not found");
    } else {
        return res.status(200).json(movies_data[id - 1]);
    }
});

app.get("/genre/all", (req, res) => {
    const genres = movies_data
        .map((movie) => movie.genres)
        .flat()
        .filter((genre, index, self) => self.indexOf(genre) === index);
    return res.status(200).json(genres);
});

app.get("/genre/:type", (req, res) => {
    const type = req.params.type.toLowerCase();

    if (type === "everything") {
        return res.status(200).json(movies_data);
    }

    const filtered = movies_data.filter((movie) => {
        return movie.genres.map((genre) => genre.toLowerCase()).includes(type);
    });

    if (filtered.length === 0) {
        return res.status(404).send("Genre not found");
    }
    res.status(200).json(filtered);
});

app.post("/addmovie", (req, res) => {
    const {
        title,
        year,
        genres,
        ratings,
        poster,
        contentRating,
        duration,
        releaseDate,
        averageRating,
        originalTitle,
        storyline,
        actors,
        imdbRating,
        posterurl,
    } = req.body;

    if (
        !title ||
        !year ||
        !genres ||
        !ratings ||
        !poster ||
        !contentRating ||
        !duration ||
        !releaseDate ||
        !averageRating ||
        !originalTitle ||
        !storyline ||
        !actors ||
        !imdbRating ||
        !posterurl
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newMovie = {
        id: movies_data.length + 1,
        title,
        year,
        genres,
        ratings,
        poster,
        contentRating,
        duration,
        releaseDate,
        averageRating,
        originalTitle,
        storyline,
        actors,
        imdbRating,
        posterurl,
    };
    movies_data.push(newMovie);
    fs.writeFileSync("movies_data.json", JSON.stringify(movies_data));
    return res.status(200).json({ message: "Movie added successfully" });
});

app.post("/updatemovie", (req, res) => {
    const {
        id,
        title,
        year,
        genres,
        ratings,
        poster,
        contentRating,
        duration,
        releaseDate,
        averageRating,
        originalTitle,
        storyline,
        actors,
        imdbRating,
        posterurl,
    } = req.body;

    if (
        !id ||
        !title ||
        !year ||
        !genres ||
        !ratings ||
        !poster ||
        !contentRating ||
        !duration ||
        !releaseDate ||
        !averageRating ||
        !originalTitle ||
        !storyline ||
        !actors ||
        !imdbRating ||
        !posterurl
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newMovie = {
        id,
        title,
        year,
        genres,
        ratings,
        poster,
        contentRating,
        duration,
        releaseDate,
        averageRating,
        originalTitle,
        storyline,
        actors,
        imdbRating,
        posterurl,
    };
    movies_data[id - 1] = newMovie;
    fs.writeFileSync("movies_data.json", JSON.stringify(movies_data));
    return res.status(200).json({ message: "Movie updated successfully" });
});

app.delete("/deletemovie/:id", (req, res) => {
    const id = req.params.id;
    if (id < 1 || id > movies_data.length) {
        return res.status(404).json({ message: "Movie not found" });
    } else {
        movies_data.splice(id - 1, 1);
        movies_data.forEach((movie, index) => {
            movie.id = index + 1;
        });
        fs.writeFileSync("movies_data.json", JSON.stringify(movies_data));
        return res
            .status(200)
            .json({ message: `Movie with ID ${id} deleted successfully` });
    }
});

app.all("*", (req, res) => {
    return res.status(404).json({ message: "Route not found" });
});

app.listen(port, (error) => {
    if (error) {
        console.log("error");
    } else {
        console.log(`listening on port ${port}`);
    }
});
