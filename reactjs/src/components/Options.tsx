import {Button} from "@mui/material";
import useVeloData from "../hooks/useVeloData";

export default function Options() {
    const {selectedStation} = useVeloData()
    return <>
        <div className={"flexElements"}>
            <Button color={"success"}>Login</Button>
        </div>
        {selectedStation !== null && <div>
            Selected station: {selectedStation?.name}
        </div>}
    </>
}
