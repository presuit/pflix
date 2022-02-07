import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Link from "./routes/Link";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

export enum routes {
  HOME = "/",
  TV = "/tv",
  SEARCH = "/search",
  SEARCH_DETAIL = "/search/:id",
  MOVIE_DETAIL = "/movie/:id",
  TV_DETAIL = "/tv/:id",
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<Home />}></Route>
        <Route path={routes.MOVIE_DETAIL} element={<Home />}></Route>
        <Route path={routes.TV} element={<Tv />}></Route>
        <Route path={routes.TV_DETAIL} element={<Tv />}></Route>
        <Route path={routes.SEARCH} element={<Search />}></Route>
        <Route path={routes.SEARCH_DETAIL} element={<Search />}></Route>
        <Route path={"/link"} element={<Link />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
