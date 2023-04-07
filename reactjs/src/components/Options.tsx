import LoginButton from "./login/LoginButton";
import LogoutButton from "./login/LogoutButton";

export default function Options() {
    return <>
        <div className={"flexElements"}>
            <LoginButton />
            <LogoutButton />
        </div>
    </>
}
