import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/books" element={<Books />}/>
                <Route path={"/books/book/new"} element={<NewBook />} />
            </Routes>
        </BrowserRouter>
    );
}