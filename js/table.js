
let this_tr;

export function display_table(myJson){
    for(let key in myJson){
        make_table(key,myJson);
    }//for
}//display_table

function make_table(key,myJson){
    const what_tbl = document.querySelector(`[data-tbl_name="${key}"]`);
    const {info, content} = {...myJson[key]};

    //colgroup 넣기
    add_colgroup(info,what_tbl);

    //caption,thead,tbody,tfoot
    add_table_content(content,what_tbl);
}//make_table

function add_colgroup(info,what_tbl){
    const col_group = document.createElement('COLGROUP');
    for(let styl of info.styles){
        const col = document.createElement('COL');
        if(styl){col.style.width = styl;}
        col_group.appendChild(col);
    }//for
    what_tbl.appendChild(col_group);
}//add_colgroup

function add_table_content(content,what_tbl){
    for(let obj of content){
        switch(obj.EL){
            case "CAPTION" :
                add_caption(obj,what_tbl);
                break;
            default:
                add_thead_to_tfoot(obj,what_tbl);
                break;
        }//switch
    }//for
}//add_table_content

function add_caption(obj,what_tbl){
    const caption = document.createElement('CAPTION');
    caption.innerText = obj.ctnt;
    what_tbl.appendChild(caption);
}//add_caption

function add_thead_to_tfoot(obj,what_tbl){
    const el_type = document.createElement(`${String(obj.EL)}`);
    add_th_td(obj.ctnt,el_type);
    what_tbl.appendChild(el_type);
}//add_thead_to_tfoot;

function add_th_td(content,el_type){
    for(let ctn of content){
        //시작 TD/TH면 TR 만들고
        if(ctn.row_START){this_tr = document.createElement('TR');}
        
        //TD 생성하고 내용 채워넣고
        const this_el = document.createElement(`${ctn.EL}`);
        this_el.innerHTML = ctn.ctnt;
        
        //colspan이나 rowspan 있음 적용하고
        if(ctn["isSpan"]){
            const span_type = ctn["isSpan"]; 
            const span_num = String(ctn["spanNum"]);
            this_el.setAttribute(span_type,span_num);
        }//if

        //텍스트 정렬 스타일 있으면 적용하고
        if(ctn["textAlign"]){this_el.style.textAlign = "left";}

        //TR에 TD/TH append
        this_tr.appendChild(this_el);

        //마지막 TD/TH면 TR을 부모에 append
        if(ctn.row_END){
            el_type.appendChild(this_tr);}
    }//for
}//add_th_td
