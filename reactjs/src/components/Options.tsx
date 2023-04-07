import LoginButton from "./login/LoginButton";
import LogoutButton from "./login/LogoutButton";

export default function Options() {
    return <>
        <div className={"flexElements"} style={{marginBottom: "5px"}}>
            <LoginButton />
            <LogoutButton />
        </div>
    </>
}
