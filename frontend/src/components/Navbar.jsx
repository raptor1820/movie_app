import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Stack,
    Button,
} from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar
            position="sticky"
            style={{
                top: "20px",
                border: "3px solid #e8e0d5",
                boxShadow: "3px 4px 0px 1px #e8e0d5",
                backgroundColor: "#1f1d1c",
                width: "80%",
            }}>
            <Toolbar>
                <IconButton
                    component={Link}
                    to="/"
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="logo">
                    <MovieFilterIcon />
                    <Typography variant="h6" component="div">
                        MovieDB
                    </Typography>
                </IconButton>
                <Typography sx={{ flexGrow: 1 }} y></Typography>
                <Stack spacing={2} direction="row">
                    <Button component={Link} color="inherit" to="/movies/all">
                        All Movies
                    </Button>
                    <Button component={Link} to="/genres" color="inherit">
                        Genres
                    </Button>
                    <Button component={Link} to="/manage" color="inherit">
                        Manage Movies
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;
