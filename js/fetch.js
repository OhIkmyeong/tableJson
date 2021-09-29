import { display_table } from "./table.js";

export async function display_wrapper(target){
    const wrapper = document.getElementById('wrapper');
    
    const data = await fetch_wrapper(target);
    wrapper.innerHTML = data;
    
    const myJson = await fetch_json(target);
    display_table(myJson);
}//display_wrapper

function fetch_wrapper(target){
    const URL = target.dataset.url;
    const full_url = `./include/${URL}.html`;

    const data = fetch(full_url).then(res=>res.text());
    return data;
}//fetch_wrapper

function fetch_json(target){
    const URL = target.dataset.tbl;
    const full_url = `./data/${URL}.json`;

    const data = fetch(full_url).then(res => res.json());
    return data;
}//fetch_json