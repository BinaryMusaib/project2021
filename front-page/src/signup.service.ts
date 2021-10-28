import { SignupData } from "./signup-data.dto";

export async function authenticate(signupData: SignupData){
    return fetch('/api/user/signup',{
        method: 'POST',
        body: JSON.stringify(signupData),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.ok) return res.json();
        else throw new Error("Invalid username or password");
    }).catch((res) => console.log(res));
}

