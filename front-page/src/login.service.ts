import { LoginData } from "./login-data.dto";

export async function authenticate(loginData: LoginData){
    return fetch('/api/login',{
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.ok) return res.json();
        else throw new Error("Invalid username or password");
    });
}