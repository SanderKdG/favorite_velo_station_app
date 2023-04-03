import React from 'react';
import './media/css/App.css';
import {VeloDataProvider} from "./hooks/useVeloData";
import {Container, Typography} from "@mui/material";

function App() {
    return (
        <VeloDataProvider>
            <Container fixed className={"App"}>
                <Typography variant={"h4"}>Velo Stations</Typography>
                <section>
                    <>Map</>
                    <>
                        <>Filter field</>
                        <>List</>
                    </>
                </section>
            </Container>
        </VeloDataProvider>
    );
}

export default App;
