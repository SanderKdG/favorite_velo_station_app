import useAuth from "../../hooks/useAuth";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function LogoutButton() {
    const {isAuthorized, setToken} = useAuth()
    const navigate = useNavigate()

    if(!isAuthorized) return <></>

    return <>
        <Button color={"warning"} onClick={() => {
            setToken(null)
            navigate("/login")
        }}>
            Logout
        </Button>
    </>
}
