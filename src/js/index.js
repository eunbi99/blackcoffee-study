const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu)); //Json 객체를 문자열로 저장할 수 있도록 함.
    },
    getLocalStorage() {
        localStorage.getItem("menu");
    }
};

function App(){
    // 상태는 변하는 데이터, 이 앱에서 변하는 것 ? - 메뉴명
    this.menu = [];

    const addMenuName = () => {
        if($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요.");
            return;
        }

        const espressoMenuName = $("#espresso-menu-name").value;
        this.menu.push({ name : espressoMenuName });
        store.setLocalStorage(this.menu);
        const template = this.menu.map((item, index) => {
            return `
                <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${item.name}</span>
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
            // $("#espresso-menu-list").innerHTML = menuItemTempleate(espressoMenuName); 
            $("#espresso-menu-list").innerHTML = template;
            updateMenuCount();
            $("#espresso-menu-name").value = '' ;
    };

    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`
    }
    
    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId; // li data-menu-id="${index}" => menuId 에는 해당 index가 담긴다.
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정해주세요.",$menuName.innerText);
        this.menu[menuId].name = updatedMenuName; // 해당 인덱스에 있는 값의 name을 수정된 메뉴명으로 변경시킨다.
        store.setLocalStorage(this.menu);
        $menuName.innerText = updatedMenuName;
    }

    const removeMenuName = (e) => {
        if(confirm("정말 삭제하시겠습니까?")) {
            e.target.closest("li").remove();
            updateMenuCount();
        }
    }
    
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if(e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }

        if(e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    });

    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if(e.key !== "Enter") {
            return;
        }
        addMenuName(); 
    });
}

const app = new App();