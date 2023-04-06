import {Button} from "@mui/material";
import {useState} from "react";
import LoginDialog from "./LoginDialog";

export default function LoginButton() {
    const [open, setOpen] = useState(false)

    return <>
        <LoginDialog open={open} handleClose={() => setOpen(false)} />
        <Button color={"success"} onClick={() => setOpen(true)}>
            Login
        </Button>
    </>
}
