import MovieCard from "../components/MovieCard";
import "./MoviesPage.css";
import { useEffect, useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
export default function MoviesPage() {
    let [chunks, setChunks] = useState([]);
    let [page, setPage] = useState(0);
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(
                "http://localhost:3000/movies/all"
            ).then((res) => res.json());
            let x = [];
            for (let i = 0; i < response.length; i += 8) {
                x.push(response.slice(i, i + 8));
            }
            setChunks(x);
        };
        fetchMovies();
    }, []);

    return (
        <div className="outer-div">
            {chunks[page] ? (
                <div className="movies-page">
                    {chunks[page].map((data) => {
                        return (
                            <MovieCard
                                key={data.id}
                                id={data.id}
                                posterurl={data.posterurl}
                                title={data.title}
                            />
                        );
                    })}
                </div>
            ) : (
                <div>
                    <CircularProgress style={{ color: "#e8e0d5" }} />
                </div>
            )}
            <div className="buttons-div">
                <Button
                    className="buttons"
                    onClick={() => {
                        if (!page == 0) {
                            setPage(page - 1);
                        }
                    }}>
                    <Typography className="button-text" variant="h5">
                        Previous
                    </Typography>
                </Button>
                <Button
                    className="buttons"
                    onClick={() => {
                        if (page < chunks.length - 1) {
                            setPage(page + 1);
                        }
                    }}>
                    <Typography className="button-text" variant="h5">
                        Next
                    </Typography>
                </Button>
            </div>
        </div>
    );
}
