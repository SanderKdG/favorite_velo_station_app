
const tokenKey = "velo_token"
export function saveAuthToken(val:string|null) {
    if(val !== null) localStorage.setItem(tokenKey, val)
    else localStorage.removeItem(tokenKey)
}

export function getAuthToken() {
    return localStorage.getItem(tokenKey)
}
