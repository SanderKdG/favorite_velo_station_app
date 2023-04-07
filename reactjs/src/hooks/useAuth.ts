import {useEffect, useMemo, useState} from "react";
import JwtUserInfo from "../entities/JwtUserInfo";
import {useJwt} from "react-jwt";
import useInterval from "./useInterval";
import {getAuthToken, saveAuthToken} from "../functions/authStorage";
import setupHttp from "../functions/setupHttp";

export default function useAuth() {
    const [token, setToken] = useState<string|null>(getAuthToken())
    const {isExpired, decodedToken, reEvaluateToken} = useJwt<JwtUserInfo>(token ?? "")
    useInterval(() => {
        reEvaluateToken(token ?? "")
    }, 20000)

    const isAuthorized = useMemo(() => {
        return decodedToken !== null && !isExpired
    }, [decodedToken, isExpired])

    useEffect(() => {
        setupHttp()
    })

    function updateToken(value:string|null) {
        saveAuthToken(value)
        setToken(value)
        setupHttp()
    }

    return {
        user : decodedToken,
        setToken : updateToken,
        isAuthorized
    }
}
