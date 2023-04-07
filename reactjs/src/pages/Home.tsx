import Map from "../components/Map";
import {Typography} from "@mui/material";
import Options from "../components/Options";
import List from "../components/List";
import {VeloDataProvider} from "../hooks/useVeloData";
import React from "react";

export default function Home() {
    return <VeloDataProvider>
        <>
            <div className={"App"}>
                <Typography variant={"h4"}>Velo Stations</Typography>
                <Options/>
                <List/>
            </div>
            <Map/>
        </>
    </VeloDataProvider>
}
