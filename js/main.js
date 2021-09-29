import { display_wrapper } from "./fetch.js";

const btn = document.getElementById('btn');

btn.addEventListener('click',(e)=>{
    e = e || window.event;
    const target = e.target;
    display_wrapper(target);
});