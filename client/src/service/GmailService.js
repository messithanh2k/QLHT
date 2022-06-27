class GmailService {
    setLocalGmail(gmail) {
        localStorage.setItem('gmail', gmail);
    }

    getLocalGmail() {
        return localStorage.getItem('gmail');
    }
    updateLocalGmail(gmail) {
        localStorage.setItem('gmail', gmail);
    }
    removeLocalGmail() {
        localStorage.removeItem('gmail');
    }
}

export default new GmailService();
