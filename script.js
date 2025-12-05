// script.js

// 菜单切换
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    if (menu) menu.classList.toggle("active");
}

// 可添加其他 JS 功能，如按钮点击事件
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("clickButton");
    if (btn) {
        btn.addEventListener("click", () => {
            alert("Hello! You clicked the button.");
        });
    }
});
