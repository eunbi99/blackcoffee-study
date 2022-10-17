const store = {
    setLocalStorage(menu) {
        return localStorage.setItem("menu", JSON.stringify(menu)); //Json 객체를 문자열로 저장할 수 있도록 함.
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu"));
    },
};

export default store;

