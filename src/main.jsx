import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreateApplication from './CreateApplication.jsx'
import ApplicationDetails from "./ApplicationDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create" element={<CreateApplication />} />
            <Route path="/applications/:id" element={<ApplicationDetails />} />
        </Routes>
    </BrowserRouter>
)