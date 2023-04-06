import {Button} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

export default function LoginButton() {
    const {isAuthorized} = useAuth()
    const navigate = useNavigate()

    if(isAuthorized) return <></>

    return <>
        <Button color={"success"} onClick={() => navigate("/login")}>
            Login
        </Button>
    </>
}
