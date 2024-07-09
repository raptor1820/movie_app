import {
    Typography,
    CircularProgress,
    Chip,
    Rating,
    Button,
    Modal,
    Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import MovieCard from "../components/MovieCard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link, useNavigate } from "react-router-dom";

const modalStyle = {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "200px",
    backgroundColor: "#1f1d1c",
    border: "2px solid #e8e0d5",
    boxShadow: "3px 4px 0px 1px #e8e0d5",
    p: 4,
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [modalValue, setModalValue] = useState(
        "Are you sure that you want to delete this movie?"
    );
    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch(
                `http://localhost:3000/movies/${id}`
            ).then((res) => res.json());
            setMovie(response);
        };
        fetchMovie();
    }, [id]);
    const handleDelete = (id) => {
        fetch("http://localhost:3000/deletemovie/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setModalValue(data.message);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            });
    };
    const handleModal = () => {
        setModalOpen(!modalOpen);
    };
    return (
        <>
            <div className="movie-details-div">
                {movie ? (
                    <div className="movie-details-inner">
                        <MovieCard
                            id={movie.id}
                            key={movie.id}
                            title={movie.title}
                            posterurl={movie.posterurl}
                        />
                        <div className="title-and-content">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                <Typography
                                    variant="h4"
                                    className="movie-title">
                                    {movie.title}
                                </Typography>
                                <Chip
                                    variant="outlined"
                                    label={movie.year}
                                    style={{
                                        color: "#e8e0d5",
                                        marginLeft: "10px",
                                    }}
                                />
                                {movie.contentRating ? (
                                    <Chip
                                        variant="outlined"
                                        label={movie.contentRating}
                                        style={{
                                            color: "#e8e0d5",
                                            marginLeft: "10px",
                                        }}
                                    />
                                ) : (
                                    <Chip
                                        variant="outlined"
                                        label="U"
                                        style={{
                                            color: "#e8e0d5",
                                            marginLeft: "10px",
                                        }}
                                    />
                                )}
                                <Rating
                                    style={{ marginLeft: "10px" }}
                                    value={
                                        movie.ratings.reduce(
                                            (sum, elem) => sum + elem
                                        ) / movie.ratings.length
                                    }
                                    precision={0.1}
                                    readOnly
                                    max={10}
                                    emptyIcon={
                                        <StarBorderIcon
                                            style={{ color: "#e8e0d5" }}
                                        />
                                    }
                                />
                            </div>
                            <Typography variant="h6" className="movie-title">
                                {movie.storyline}
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: "20px",
                                }}>
                                {movie.genres.map((genre) => (
                                    <Chip
                                        key={genre}
                                        variant="outlined"
                                        label={genre}
                                        style={{
                                            color: "#e8e0d5",
                                            marginLeft: "10px",
                                        }}
                                    />
                                ))}
                                {movie.actors.map((actor) => (
                                    <Chip
                                        key={actor}
                                        variant="outlined"
                                        label={actor}
                                        style={{
                                            color: "#e8e0d5",
                                            marginLeft: "10px",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <CircularProgress style={{ color: "#e8e0d5" }} />
                )}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "20px",
                    }}>
                    {movie ? (
                        <>
                            <Button
                                style={{ marginRight: "10px" }}
                                component={Link}
                                to={`/manage?action=Update&id=${movie.id}&title=${movie.title}&year=${movie.year}&contentRating=${movie.contentRating}&storyline=${movie.storyline}&genres=${movie.genres}&actors=${movie.actors}&ratings=${movie.ratings}&posterurl=${movie.posterurl}&releaseDate=${movie.releaseDate}&duration=${movie.duration}&imdbRating=${movie.imdbRating}&averageRating=${movie.averageRating}&originalTitle=${movie.originalTitle}&poster=${movie.poster}`}>
                                Update Details
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                style={{ marginLeft: "10px" }}
                                onClick={handleModal}>
                                Delete
                            </Button>
                        </>
                    ) : (
                        <CircularProgress
                            style={{ color: "#e8e0d5" }}></CircularProgress>
                    )}
                </div>
            </div>
            <div>
                <Modal open={modalOpen} onClose={handleModal}>
                    <Box style={modalStyle}>
                        <Typography
                            variant="h4"
                            style={{ color: "#e8e0d5", textAlign: "center" }}>
                            {modalValue}
                        </Typography>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "20px",
                            }}>
                            <Button
                                onClick={handleModal}
                                style={{ marginRight: "10px" }}
                                size="large">
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => handleDelete(movie.id)}
                                style={{ marginLeft: "10px" }}
                                size="large"
                                color="error">
                                Delete
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default MovieDetails;
