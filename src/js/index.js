const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        return localStorage.setItem("menu", JSON.stringify(menu)); //Json 객체를 문자열로 저장할 수 있도록 함.
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu"));
    }
};

function App(){
    // 상태는 변하는 데이터, 이 앱에서 변하는 것 ? - 메뉴명
    this.menu = { // 카테고리별 각각의 메뉴를 관리하기 위해 메뉴를 하나의 객체를 만들고 카테고리별 속성을 만든다!
        espresso: [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: [],
    };

    this.currentCategory = "espresso"; // 초기 카테고리는 에스프레소로 설정한다!

    this.init = () => { // 초기화 함수
        if(store.getLocalStorage()) {
            this.menu = store.getLocalStorage();
        }
        render();
    }
    
    const render = () => {
        const template = this.menu[this.currentCategory].map((item, index) => {
            return `
                <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name ${ item.soldOut ? "sold-out" : "" } ">${item.name}</span>
                <button 
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                >
                품절
                </button>
                <button 
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                수정
                </button>
                <button 
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"        
                >
                삭제
                </button>
                </li>`;
        }).join("");
             // 새로운 메뉴를 입력하면 덮어씌워지는 문제가 발생한다. 새로운 메뉴명을 추가로 받고 싶으면 insertAdjacentHTML 을 사용하면 된다!
            // $("#menu-list").innerHTML = menuItemTempleate(menuName); 
            $("#menu-list").innerHTML = template;
            updateMenuCount();
    }

    const addMenuName = () => {
        if($("#menu-name").value === "") {
            alert("값을 입력해주세요.");
            return;
        }

        const menuName = $("#menu-name").value;
        this.menu[this.currentCategory].push({ name : menuName });
        store.setLocalStorage(this.menu);
        render();
        $("#menu-name").value = '' ;
    };

    const updateMenuCount = () => {
        const menuCount = $("#menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${this.menu[this.currentCategory].length} 개`
    }
    
    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId; // li data-menu-id="${index}" => menuId 에는 해당 index가 담긴다.
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정해주세요.",$menuName.innerText);
        this.menu[this.currentCategory][menuId].name = updatedMenuName; // 해당 인덱스에 있는 값의 name을 수정된 메뉴명으로 변경시킨다.
        store.setLocalStorage(this.menu);
        render();
    }

    const removeMenuName = (e) => {
        if(confirm("정말 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu[this.currentCategory].splice(menuId, 1);
            store.setLocalStorage(this.menu);
            render();
        }
    }

    const soldOutMenu = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut; // !를 사용하여 품절 상태를 변경시킬 수 있다!
        store.setLocalStorage(this.menu);
        render();
    }
    
    $("#menu-list").addEventListener("click", (e) => {
        if(e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
            return;
        }

        if(e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
            return;
        }

        if(e.target.classList.contains("menu-sold-out-button")) {
            soldOutMenu(e);
            return;
        }
    });

    $("#menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#menu-submit-button").addEventListener("click", addMenuName);

    $("#menu-name").addEventListener("keypress", (e) => {
        if(e.key !== "Enter") {
            return;
        }
        addMenuName(); 
    });

    $("nav").addEventListener("click", (e) => {
        const isCategoryButton = e.target.classList.contains("cafe-category-name")
        if (isCategoryButton) {
            const categoryName = e.target.dataset.categoryName; // 데이터 속성은 HTML의 요소의 'data-'로 시작하는 속성이다. 이 값을 가져올 경우 dataset을 사용하자!
            this.currentCategory = categoryName;
            $("#category-title").innerHTML = `${e.target.innerText} 메뉴 관리`;
            render();
            console.log(categoryName);
        }

    })
}

const app = new App();
app.init();