/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import "./Manage.css";
import { useState, useEffect } from "react";
import {
    InputLabel,
    Select,
    MenuItem,
    Typography,
    TextField,
    Button,
    Chip,
    Input,
    FormControl,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
const Manage = () => {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const [action, setAction] = useState("Update");
    const [url, setUrl] = useState("http://localhost:3000/updatemovie");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState();
    const [genres, setGenres] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [poster, setPoster] = useState("");
    const [contentRating, setContentRating] = useState();
    const [duration, setDuration] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [averageRating, setAverageRating] = useState();
    const [originalTitle, setOriginalTitle] = useState("");
    const [storyline, setStoryline] = useState("");
    const [actors, setActors] = useState([]);
    const [imdbRating, setImdbRating] = useState();
    const [posterurl, setPosterurl] = useState("");
    const [id, setId] = useState();
    const [status, setStatus] = useState();
    const [currValue, setCurrValue] = useState("");
    const [currRating, setCurrRating] = useState([]);

    const paramAction = searchParams.get("action");
    const paramId = searchParams.get("id");
    const paramTitle = searchParams.get("title");
    const paramYear = searchParams.get("year");
    const paramGenres = searchParams.get("genres");
    const paramRatings = searchParams.get("ratings");
    const paramPoster = searchParams.get("poster");
    const paramContentRating = searchParams.get("contentRating");
    const paramDuration = searchParams.get("duration");
    const paramReleaseDate = searchParams.get("releaseDate");
    const paramAverageRating = searchParams.get("averageRating");
    const paramOriginalTitle = searchParams.get("originalTitle");
    const paramStoryline = searchParams.get("storyline");
    const paramActors = searchParams.get("actors");
    const paramImdbRating = searchParams.get("imdbRating");
    const paramPosterurl = searchParams.get("posterurl");
    useEffect(() => {
        if (paramAction) {
            setAction(paramAction);
        }
        if (paramId) {
            setId(paramId);
        }
        if (paramTitle) {
            setTitle(paramTitle);
        }
        if (paramYear) {
            setYear(paramYear);
        }
        if (paramGenres) {
            setGenres(paramGenres.split(","));
        }
        if (paramRatings) {
            setRatings(paramRatings.split(",").map((item) => parseInt(item)));
        }
        if (paramPoster) {
            setPoster(paramPoster);
        }
        if (paramContentRating) {
            setContentRating(paramContentRating);
        }
        if (paramDuration) {
            setDuration(paramDuration);
        }
        if (paramReleaseDate) {
            setReleaseDate(paramReleaseDate);
        }
        if (paramAverageRating) {
            setAverageRating(paramAverageRating);
        }
        if (paramOriginalTitle) {
            setOriginalTitle(paramOriginalTitle);
        }
        if (paramStoryline) {
            setStoryline(paramStoryline);
        }
        if (paramActors) {
            setActors(paramActors.split(","));
        }
        if (paramImdbRating) {
            setImdbRating(paramImdbRating);
        }
        if (paramPosterurl) {
            setPosterurl(paramPosterurl);
        }
        if (paramImdbRating) {
            setImdbRating(paramImdbRating);
        }
    }, [searchParams]);
    const clearFields = () => {
        setTitle("");
        setYear();
        setGenres([]);
        setRatings([]);
        setPoster("");
        setContentRating();
        setDuration("");
        setReleaseDate("");
        setAverageRating();
        setOriginalTitle("");
        setStoryline("");
        setActors([]);
        setImdbRating();
        setPosterurl("");
    };
    const [currActor, setCurrActor] = useState([]);
    const handleChange = (event) => {
        setStatus("");
        setAction(event.target.value);
        if (event.target.value === "Delete") {
            setUrl("http://localhost:3000/deletemovie");
        } else if (event.target.value === "Update") {
            setUrl("http://localhost:3000/updatemovie");
        } else {
            setUrl("http://localhost:3000/addmovie");
        }
    };
    const handleKeyUp = (e) => {
        if (e.keyCode == 32) {
            setGenres((oldState) => [...oldState, e.target.value]);
            setCurrValue("");
        }
    };
    const handleKeyUpRating = (e) => {
        if (e.keyCode == 32) {
            if (!isNaN(e.target.value)) {
                setRatings((oldState) => [
                    ...oldState,
                    parseInt(e.target.value),
                ]);
            }
            setCurrRating("");
        }
    };
    const handleKeyUpActors = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            setActors((oldState) => [...oldState, e.target.value]);
            setCurrActor("");
        }
    };

    const handleGenreChange = (e) => {
        setCurrValue(e.target.value);
    };
    const handleRatingChange = (e) => {
        setCurrRating(e.target.value);
    };
    const handleActorChange = (e) => {
        setCurrActor(e.target.value);
    };
    const handleGenreDelete = (item, index) => {
        let arr = [...genres];
        arr.splice(index, 1);
        setGenres(arr);
    };
    const handleRatingDelete = (item, index) => {
        let arr = [...ratings];
        arr.splice(index, 1);
        setRatings(arr);
    };
    const handleActorDelete = (item, index) => {
        let arr = [...actors];
        arr.splice(index, 1);
        setActors(arr);
    };
    const handleDelete = async (event) => {
        event.preventDefault();
        const response = await fetch(url + "/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                return resp.message;
            });
        setStatus(response);
    };
    const handleAdd = async (event) => {
        event.preventDefault();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                return resp.message;
            });
        setStatus(response);
        clearFields();
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                return resp.message;
            });
        setStatus(response);
        clearFields();
    };
    const formType = () => {
        if (action === "Add") {
            return (
                <FormControl fullWidth>
                    <form
                        onSubmit={handleAdd}
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <TextField
                            fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            required
                            label="Title"
                            placeholder="Enter Title"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            type="number"
                            required
                            label="Year"
                            placeholder="Enter Year"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <div style={{ width: "100%" }}>
                            <div style={{ marginTop: "10px" }}>
                                <Typography>Genres</Typography>
                                {genres.map((item, index) => (
                                    <Chip
                                        style={{ color: "#e8e0d5" }}
                                        variant="outlined"
                                        size="small"
                                        onDelete={() =>
                                            handleGenreDelete(item, index)
                                        }
                                        label={item}
                                    />
                                ))}
                            </div>
                            <Input
                                fullWidth
                                sx={{
                                    ":before": { borderBottomColor: "#e8e0d5" },
                                    ":after": { borderBottomColor: "#e8e0d5" },
                                    color: "#e8e0d5",
                                }}
                                value={currValue}
                                onChange={handleGenreChange}
                                onKeyDown={handleKeyUp}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <div style={{ marginTop: "10px" }}>
                                <Typography>Ratings</Typography>
                                {ratings.map((item, index) => (
                                    <Chip
                                        style={{ color: "#e8e0d5" }}
                                        variant="outlined"
                                        size="small"
                                        onDelete={() =>
                                            handleRatingDelete(item, index)
                                        }
                                        label={item}
                                    />
                                ))}
                            </div>
                            <Input
                                fullWidth
                                sx={{
                                    ":before": { borderBottomColor: "#e8e0d5" },
                                    ":after": { borderBottomColor: "#e8e0d5" },
                                    color: "#e8e0d5",
                                }}
                                value={currRating}
                                onChange={handleRatingChange}
                                onKeyDown={handleKeyUpRating}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <div style={{ marginTop: "10px" }}>
                                <Typography>Actors</Typography>
                                {actors.map((item, index) => (
                                    <Chip
                                        style={{ color: "#e8e0d5" }}
                                        variant="outlined"
                                        size="small"
                                        onDelete={() =>
                                            handleActorDelete(item, index)
                                        }
                                        label={item}
                                    />
                                ))}
                            </div>
                            <Input
                                fullWidth
                                sx={{
                                    ":before": { borderBottomColor: "#e8e0d5" },
                                    ":after": { borderBottomColor: "#e8e0d5" },
                                    color: "#e8e0d5",
                                }}
                                value={currActor}
                                onChange={handleActorChange}
                                onKeyDown={handleKeyUpActors}
                            />
                        </div>
                        <TextField
                            fullWidth
                            onChange={(e) => setPoster(e.target.value)}
                            type="text"
                            required
                            label="Poster"
                            placeholder="Enter Poster"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) =>
                                setContentRating(parseInt(e.target.value))
                            }
                            type="number"
                            required
                            label="Content Rating"
                            placeholder="Enter Content Rating"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) => setDuration(e.target.value)}
                            type="text"
                            required
                            label="Duration"
                            placeholder="Enter Duration"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) => setReleaseDate(e.target.value)}
                            type="text"
                            required
                            label="Release Date"
                            placeholder="Enter Release Date"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) =>
                                setAverageRating(parseInt(e.target.value))
                            }
                            type="number"
                            required
                            label="Average Rating"
                            placeholder="Enter Average Rating"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) => setOriginalTitle(e.target.value)}
                            type="text"
                            required
                            label="Original Title"
                            placeholder="Enter Original Title"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) => setStoryline(e.target.value)}
                            type="text"
                            required
                            multiline
                            rows={4}
                            label="Storyline"
                            placeholder="Enter Storyline"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            inputProps={{
                                style: { color: "#e8e0d5" },
                            }}
                            sx={{
                                color: "#e8e0d5",
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) =>
                                setImdbRating(parseInt(e.target.value))
                            }
                            type="number"
                            required
                            label="Imdb Rating"
                            placeholder="Enter Imdb Rating"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            onChange={(e) => setPosterurl(e.target.value)}
                            type="url"
                            required
                            label="Poster URL"
                            placeholder="Enter Poster URL"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <Button type="submit">Add Movie</Button>
                    </form>
                </FormControl>
            );
        } else if (action === "Delete") {
            return (
                <form
                    onSubmit={handleDelete}
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <TextField
                        type="number"
                        onChange={(e) => setId(e.target.value)}
                        required
                        helperText="Enter the ID of the movie you want to delete"
                        placeholder="Enter ID"
                        variant="outlined"
                        FormHelperTextProps={{
                            sx: { color: "#e8e0d5" },
                        }}
                        sx={{
                            input: { color: "#e8e0d5" },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e8e0d5",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "#e8e0d5",
                            },
                        }}
                    />
                    <Button type="submit">Delete Movie</Button>
                </form>
            );
        } else if (action === "Update") {
            return (
                <FormControl fullWidth>
                    <form
                        onSubmit={handleUpdate}
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <TextField
                            value={id}
                            fullWidth
                            onChange={(e) => setId(e.target.value)}
                            type="number"
                            required
                            label="ID"
                            placeholder="Enter ID"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={title}
                            fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            required
                            label="Title"
                            placeholder="Enter Title"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={year}
                            fullWidth
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            type="number"
                            required
                            label="Year"
                            placeholder="Enter Year"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <div style={{ width: "100%" }}>
                            <div style={{ marginTop: "10px" }}>
                                <Typography>Genres</Typography>
                                {genres.map((item, index) => (
                                    <Chip
                                        style={{ color: "#e8e0d5" }}
                                        variant="outlined"
                                        size="small"
                                        onDelete={() =>
                                            handleGenreDelete(item, index)
                                        }
                                        label={item}
                                    />
                                ))}
                            </div>
                            <Input
                                fullWidth
                                sx={{
                                    ":before": { borderBottomColor: "#e8e0d5" },
                                    ":after": { borderBottomColor: "#e8e0d5" },
                                    color: "#e8e0d5",
                                }}
                                value={currValue}
                                onChange={handleGenreChange}
                                onKeyDown={handleKeyUp}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <div style={{ marginTop: "10px" }}>
                                <Typography>Ratings</Typography>
                                {ratings.map((item, index) => (
                                    <Chip
                                        style={{ color: "#e8e0d5" }}
                                        variant="outlined"
                                        size="small"
                                        onDelete={() =>
                                            handleRatingDelete(item, index)
                                        }
                                        label={item}
                                    />
                                ))}
                            </div>
                            <Input
                                fullWidth
                                sx={{
                                    ":before": { borderBottomColor: "#e8e0d5" },
                                    ":after": { borderBottomColor: "#e8e0d5" },
                                    color: "#e8e0d5",
                                }}
                                value={currRating}
                                onChange={handleRatingChange}
                                onKeyDown={handleKeyUpRating}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <div style={{ marginTop: "10px" }}>
                                <Typography>Actors</Typography>
                                {actors.map((item, index) => (
                                    <Chip
                                        style={{ color: "#e8e0d5" }}
                                        variant="outlined"
                                        size="small"
                                        onDelete={() =>
                                            handleActorDelete(item, index)
                                        }
                                        label={item}
                                    />
                                ))}
                            </div>
                            <Input
                                fullWidth
                                sx={{
                                    ":before": { borderBottomColor: "#e8e0d5" },
                                    ":after": { borderBottomColor: "#e8e0d5" },
                                    color: "#e8e0d5",
                                }}
                                value={currActor}
                                onChange={handleActorChange}
                                onKeyDown={handleKeyUpActors}
                            />
                        </div>
                        <TextField
                            value={poster}
                            fullWidth
                            onChange={(e) => setPoster(e.target.value)}
                            type="text"
                            required
                            label="Poster"
                            placeholder="Enter Poster"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={contentRating}
                            fullWidth
                            onChange={(e) =>
                                setContentRating(parseInt(e.target.value))
                            }
                            type="number"
                            required
                            label="Content Rating"
                            placeholder="Enter Content Rating"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={duration}
                            fullWidth
                            onChange={(e) => setDuration(e.target.value)}
                            type="text"
                            required
                            label="Duration"
                            placeholder="Enter Duration"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={releaseDate}
                            fullWidth
                            onChange={(e) => setReleaseDate(e.target.value)}
                            type="text"
                            required
                            label="Release Date"
                            placeholder="Enter Release Date"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={averageRating}
                            fullWidth
                            onChange={(e) =>
                                setAverageRating(parseInt(e.target.value))
                            }
                            type="number"
                            required
                            label="Average Rating"
                            placeholder="Enter Average Rating"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={originalTitle}
                            fullWidth
                            onChange={(e) => setOriginalTitle(e.target.value)}
                            type="text"
                            required
                            label="Original Title"
                            placeholder="Enter Original Title"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={storyline}
                            fullWidth
                            onChange={(e) => setStoryline(e.target.value)}
                            type="text"
                            required
                            multiline
                            rows={4}
                            label="Storyline"
                            placeholder="Enter Storyline"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            inputProps={{
                                style: { color: "#e8e0d5" },
                            }}
                            sx={{
                                color: "#e8e0d5",
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={imdbRating}
                            fullWidth
                            onChange={(e) =>
                                setImdbRating(parseInt(e.target.value))
                            }
                            type="number"
                            required
                            label="Imdb Rating"
                            placeholder="Enter Imdb Rating"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <TextField
                            value={posterurl}
                            fullWidth
                            onChange={(e) => setPosterurl(e.target.value)}
                            type="url"
                            required
                            label="Poster URL"
                            placeholder="Enter Poster URL"
                            variant="outlined"
                            FormHelperTextProps={{
                                sx: { color: "#e8e0d5" },
                            }}
                            sx={{
                                marginTop: "10px",
                                label: { color: "#e8e0d5" },
                                input: { color: "#e8e0d5" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e8e0d5",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "#e8e0d5",
                                },
                            }}
                        />
                        <Button type="submit">Update Movie</Button>
                    </form>
                </FormControl>
            );
        }
    };

    return (
        <div className="manage-main-div">
            <div
                style={{
                    color: "#e8e0d5",
                    width: "80vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <InputLabel
                    style={{ color: "#e8e0d5" }}
                    id="demo-simple-select-label">
                    Action
                </InputLabel>
                <Select
                    fullWidth
                    sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e8e0d5",
                        },
                        "& .MuiSvgIcon-root": {
                            color: "#e8e0d5",
                        },
                    }}
                    style={{ color: "#e8e0d5", borderBlockColor: "#e8e0d5" }}
                    value={action}
                    label="Action"
                    onChange={handleChange}>
                    <MenuItem value={"Add"}>Add</MenuItem>
                    <MenuItem value={"Delete"}>Delete</MenuItem>
                    <MenuItem value={"Update"}>Update</MenuItem>
                </Select>
                {formType()}
                <Typography
                    variant="h5"
                    style={{ margin: "30px", color: "#e8e0d5" }}>
                    {status}
                </Typography>
            </div>
        </div>
    );
};

export default Manage;
