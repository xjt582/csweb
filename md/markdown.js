<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
// 加载 Markdown 并渲染
function loadMarkdown(mdFile) {
    fetch(mdFile)
        .then(res => res.text())
        .then(text => {
            document.getElementById("content").innerHTML = marked.parse(text);
            buildToc();
        });
}

// 生成目录
function buildToc() {
    const content = document.getElementById("content");
    const headers = content.querySelectorAll("h1, h2, h3");
    let tocHtml = "<ul>";

    headers.forEach(h => {
        const id = h.textContent.replace(/\s+/g, "-");
        h.id = id;
        tocHtml += `<li><a href="#${id}">${h.textContent}</a></li>`;
    });

    tocHtml += "</ul>";
    document.getElementById("toc").innerHTML = tocHtml;
}
</script>
