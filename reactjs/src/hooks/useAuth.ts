import {useMemo, useState} from "react";
import JwtUserInfo from "../entities/JwtUserInfo";
import {useJwt} from "react-jwt";
import useInterval from "./useInterval";

const tokenKey = "velo_token"
export default function useAuth() {
    const [token, setToken] = useState<string|null>(localStorage.getItem(tokenKey))
    const {isExpired, decodedToken, reEvaluateToken} = useJwt<JwtUserInfo>(token ?? "")
    useInterval(() => {
        console.log(decodedToken)
        reEvaluateToken(token ?? "")
    }, 1000)

    const isAuthorized = useMemo(() => {
        console.log(`Is authorized: ${decodedToken !== null && !isExpired}`)
        return decodedToken !== null && !isExpired
    }, [decodedToken, isExpired])

    function updateToken(value:string|null) {
        if(value !== null) localStorage.setItem(tokenKey, value)
        else localStorage.removeItem(tokenKey)
        setToken(value)
    }

    return {
        user : decodedToken,
        setToken : updateToken,
        isAuthorized
    }
}
