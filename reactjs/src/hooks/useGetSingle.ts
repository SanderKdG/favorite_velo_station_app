import {useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";

export default function useGetSingle<T>(url: string, defaultValue: T) {
    const [loading, setIsLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("")
    const [fetchedData, setFetchedData] = useState<T>(defaultValue)

    const getData = useCallback(async () => {
        try {
            const {data} = await axios.get<T>(url)
            setFetchedData(data)
            if (errorMsg.length > 0) setErrorMsg("")
        } catch (error: any) {
            setErrorMsg(`${error}`)
        } finally {
            setIsLoading(false)
        }
    }, [url, errorMsg.length])

    useEffect(() => {
        getData()
            .catch(error => setErrorMsg(error.message))
    }, [getData, url]);

    const error = useMemo((): boolean => {
        return errorMsg.length > 0
    }, [errorMsg])

    async function refresh() {
        setIsLoading(true)
        await getData()
        return {loading, "data": fetchedData, refresh, error, errorMsg}
    }

    return {loading, "data": fetchedData, refresh, error, errorMsg}
}
