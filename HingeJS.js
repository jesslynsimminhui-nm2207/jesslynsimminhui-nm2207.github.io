

console.log("yo"); 

window.onload = function() {

    Array.from(document.getElementsByClassName("menu-items"))
    .forEach((item,index) => {
        item.onmouseover = () => {
            menu.dataset.activeIndex = index;
        }
    });

}
const menu = document.getElementById("menu");

console.log(Array.from(document.getElementsByClassName("menu-item")).length);

