import React from 'react';
import './media/css/App.css';
import {SnackbarProvider} from "notistack";
import Router from "./routers/Router";

function App() {
    return (
        <SnackbarProvider autoHideDuration={6000}>
            <Router />
        </SnackbarProvider>
    );
}

export default App;
