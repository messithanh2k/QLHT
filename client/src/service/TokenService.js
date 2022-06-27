class TokenService {
    setLocalAccessToken(accessToken) {
        localStorage.setItem('token', accessToken);
    }

    getLocalAccessToken() {
        return localStorage.getItem('token');
    }
    updateLocalAccessToken(accessToken) {
        localStorage.setItem('token', accessToken);
    }
    removeLocalAccessToken() {
        localStorage.removeItem('token');
    }
}

export default new TokenService();
