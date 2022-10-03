// - 메뉴의 이름을 입력 받고, 엔터키 입력으로 추가한다.
// 추가되는 메뉴의 마크업은 


const $ = (selector) => document.querySelector(selector);

function App(){
    const addMenuName = () => {
        if($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요.");
            return;
        }

        const espressoMenuName = $("#espresso-menu-name").value;
        const menuItemTempleate = (espressoMenuName) => {
             return `
                <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
            };
             // 새로운 메뉴를 입력하면 덮어씌워지는 문제가 발생한다. 새로운 메뉴명을 추가로 받고 싶으면 insertAdjacentHTML 을 사용하면 된다!
            // $("#espresso-menu-list").innerHTML = menuItemTempleate(espressoMenuName); 
            $("#espresso-menu-list").insertAdjacentHTML(
                "beforeend",
                menuItemTempleate(espressoMenuName)
            );
            updateMenuCount();
            $("#espresso-menu-name").value = '' ;
    };

    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`
    }
    
    const updateMenuName = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt(
            "메뉴명을 수정해주세요.",
            $menuName.innerText
        );
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

App();