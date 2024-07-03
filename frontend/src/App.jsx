import Layout from "./components/Layout";
import MovieDetails from "./pages/MovieDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import Genres from "./pages/Genres";
import Manage from "./pages/Manage";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<MoviesPage />} />
                    <Route path="movies/all" element={<MoviesPage />} />
                    <Route
                        path="movies/details/:id"
                        element={<MovieDetails />}
                    />
                    <Route path="genres" element={<Genres />} />
                    <Route path="manage" element={<Manage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
