import React from 'react';
import './media/css/App.css';
import {VeloDataProvider} from "./hooks/useVeloData";
import {Container, Typography} from "@mui/material";
import Map from "./components/Map";
import List from "./components/List";
import Options from "./components/Options";

function App() {
    return (
        <VeloDataProvider>
            <Container fixed className={"App"}>
                <div className={"flexElements centerElements"}>
                    <div>
                        <Typography variant={"h4"}>Velo Stations</Typography>
                        <Options />
                        <section className={"flexElements centerElements"}>
                            <Map/>
                            <div>
                                <List />
                            </div>
                        </section>
                    </div>
                </div>
            </Container>
        </VeloDataProvider>
    );
}

export default App;
