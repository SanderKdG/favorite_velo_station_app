import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import { useSnackbar } from 'notistack';
import axios from "axios";

export default function LoginDialog({handleClose, open}:{handleClose:() => void, open:boolean}) {
    const {enqueueSnackbar} = useSnackbar()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleClick() {
        try {
            const response = await axios.post<string>("http://localhost:8080/auth/login", {email, password})
            console.log(response.data)
            enqueueSnackbar(`Successfully logged in.`, {variant: "success"})
        } catch(e) {
            enqueueSnackbar(`${e}`, {variant: "error"})
        }
    }

    return <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Login</DialogTitle>
        <Box sx={{m:1}}>
            <TextField margin={"dense"}
                       fullWidth
                       value={email}
                       label={"Email"}
                       onChange={(e) => setEmail(e.target.value)}
            />
            <TextField margin={"dense"}
                       fullWidth
                       value={password}
                       label={"Password"}
                       type={"password"}
                       onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleClick}>Login</Button>
            <Button onClick={handleClick} color={"error"}>Close</Button>
        </Box>
    </Dialog>
}
