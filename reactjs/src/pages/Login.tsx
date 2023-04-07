import {Box, Button, TextField, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import useAuth from "../hooks/useAuth";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const {setToken} = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleClick() {
        try {
            const response = await axios.post<string>("/auth/login", {email, password})
            setToken(response.data)
            enqueueSnackbar(`Successfully logged in.`, {variant: "success"})
            navigate("/")
        } catch(e) {
            enqueueSnackbar(`${e}`, {variant: "error"})
        }
    }

    return <Box sx={{m: "auto", maxWidth: "400px", p: 10}}>
            <Typography variant={"h4"}>Login</Typography>
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
            <Button onClick={() => navigate("/")} color={"error"}>Go back</Button>
    </Box>
}
