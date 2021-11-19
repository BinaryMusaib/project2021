
export default class StorageService {

    private static TOKEN_KEY = "token";

    static setToken(token: string) {
        window.localStorage.setItem(this.TOKEN_KEY, token);
    }

    static getToken() {
        return window.localStorage.getItem(this.TOKEN_KEY);
    }

    static clear() {
        window.localStorage.clear();
    }

}
