import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import CreateApplication from './CreateApplication.jsx'
import ApplicationDetails from "./ApplicationDetails.jsx";
import CreateNote from "./CreateNote.jsx"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

function ProtectedRoute({children}) {
    const currentUser = localStorage.getItem("token");

    if (!currentUser) {
        return <Navigate to="/login" replace/>;
    }

    return children;
}

function PublicRoute({children}) {
    const currentUser = localStorage.getItem("username");

    if (currentUser) {
        return <Navigate to="/" replace/>;
    }

    return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>}/>
            <Route path="/signup" element={
                <PublicRoute>
                    <Signup />
                </PublicRoute>}/>
            <Route path="/" element={
                <ProtectedRoute>
                    <App />
                </ProtectedRoute>}/>
            <Route path="/create" element={
                <ProtectedRoute>
                    <CreateApplication />
                </ProtectedRoute>}/>
            <Route path="/applications/:id" element={
                <ProtectedRoute>
                    <ApplicationDetails />
                </ProtectedRoute>}/>
            <Route path="/notes/create" element={
                <ProtectedRoute>
                    <CreateNote />
                </ProtectedRoute>}/>
        </Routes>
    </BrowserRouter>
)