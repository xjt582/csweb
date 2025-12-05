// header.js
const navbarHTML = `
<div class="navbar">
    <div class="logo">我的网站</div>
    <span class="menu-btn" onclick="toggleMenu()">☰</span>
    <ul id="navMenu">
        <li><a href="index.html">首页</a></li>
        <li><a href="mysql.html">MySQL命令</a></li>
        <li><a href="linux-command-cheatsheet.html">Linux命令</a></li>
        <li><a href="about.html">关于</a></li>
    </ul>
</div>
`;

document.addEventListener("DOMContentLoaded", () => {
    const placeholder = document.getElementById("navbar-placeholder");
    if (placeholder) placeholder.innerHTML = navbarHTML;
});

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
}
