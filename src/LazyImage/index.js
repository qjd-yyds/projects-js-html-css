/******* 提取图片的rgba *******/
// const img = new Image();
// img.src = "./1.jpeg";
// img.setAttribute("width", "1");
// img.setAttribute("height", "1");
// img.onload = () => {
//     const canvas = new OffscreenCanvas(1, 1);
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0, 1, 1);
//     const { data } = ctx.getImageData(0, 0, 1, 1);
//     console.log(`rgba(${data.join(",")})`);
// };

/******* svg渐显 *******/
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const img = new Image();
img.src = "R-C.jpeg";
img.onload = () => {
    next.src = "R-C.jpeg";
    next.classList.add("loaded");
    next.addEventListener("transitionend", function callback() {
        prev.classList.add("hidden");
        next.removeEventListener("transitionend", callback);
    });
};
