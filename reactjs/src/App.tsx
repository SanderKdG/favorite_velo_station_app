import React from 'react';
import './media/css/App.css';
import {VeloDataProvider} from "./hooks/useVeloData";
import {Typography} from "@mui/material";
import Map from "./components/Map";
import List from "./components/List";
import Options from "./components/Options";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <SnackbarProvider autoHideDuration={6000}>
            <VeloDataProvider>
                <>
                    <Map/>
                    <div className={"App"}>
                        <Typography variant={"h4"}>Velo Stations</Typography>
                        <Options/>
                        <List/>
                    </div>
                </>
            </VeloDataProvider>
        </SnackbarProvider>
    );
}

export default App;
