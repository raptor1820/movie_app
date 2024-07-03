/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "./MovieCard.css";
export default function MovieCard(props) {
    return (
        <Link to={`/movies/details/${props.id}`} className="card-div">
            <div className="card-div">
                <img
                    src={props.posterurl}
                    alt={props.title}
                    className="poster"
                />
                <div className="card-content">
                    <Typography className="movie-title" variant="h4">
                        {props.title}
                    </Typography>
                </div>
            </div>
        </Link>
    );
}
