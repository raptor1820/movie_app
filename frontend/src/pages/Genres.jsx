import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { CircularProgress, Chip, Typography } from "@mui/material";
import "./Genres.css";
const Genres = () => {
    // const base = import.meta.env.VITE_API_URL;
    const [genres, setGenres] = useState();
    const [currentGenre, setCurrentGenre] = useState("Everything");
    const [movies, setMovies] = useState();
    const [currentChip, setCurrentChip] = useState("Everything");
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(
                `http://localhost:3000/genre/all`
            ).then((res) => res.json());
            response.unshift("Everything");
            setGenres(response);
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(
                `http://localhost:3000/genre/${currentGenre}`
            ).then((res) => res.json());
            setMovies(response);
        };
        fetchMovies();
    }, [currentGenre]);
    return (
        <div className="genres-page">
            {genres ? (
                <div className="genres-div">
                    {genres.map((data) => {
                        return (
                            <Chip
                                clicked="false"
                                variant="outlined"
                                clickable="true"
                                key={data}
                                label={data}
                                style={{
                                    fontSize: "1.75rem",
                                    color: "#e8e0d5",
                                    ...(currentChip === data && {
                                        color: "#1f1d1c",
                                        backgroundColor: "#e8e0d5",
                                    }),
                                    margin: "10px",
                                }}
                                onClick={() => {
                                    setCurrentChip(data);
                                    setCurrentGenre(data);
                                }}
                            />
                        );
                    })}
                </div>
            ) : (
                <div>
                    <CircularProgress style={{ color: "#e8e0d5" }} />
                </div>
            )}
            <div>
                <Typography variant="h3" style={{ color: "#e8e0d5" }}>
                    Select a genre to see all the movies
                </Typography>
            </div>
            <div>
                {movies ? (
                    <div className="movies-page">
                        {movies.map((data) => {
                            return <MovieCard key={data.id} {...data} />;
                        })}
                    </div>
                ) : (
                    <div style={{ marginTop: "100px" }}>
                        <CircularProgress style={{ color: "#e8e0d5" }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Genres;
