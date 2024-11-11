/*
GNTK - GTG Notes ToolKit for creating UI of GTG Notes app
*/
// constants for definations
const GNTK_NODE_2D = 1;

// Popup window dev class
class GNTK_Popup_Window{
    constructor(title="Popup Window", html="Popup Window html content", gntk_node_2d=null){
        const Ehtml = `<div class="window">
                <div class="disable-bg"></div>
                <div class="centered">
                <div class="popup-window">
                    <div class="window-title">
                        ${title} <button id="close">x</button>
                    </div>
                    <div class="content">
                        ${html}
                    </div>
                </div>
                </div>
            </div>
        </div>`;
        const elm = document.createElement('gntk_node_2d');
        elm.innerHTML = Ehtml;
        gntk_node_2d = elm;
        document.body.appendChild(elm);
        document.getElementById('close').addEventListener('click',()=>{elm.remove()})
    }
}


// function for destroying widgets
function GNTK_Destroy(destroyer){
    if (destroyer == GNTK_NODE_2D){
        const fetch = document.querySelectorAll('gntk_node_2d');
        for (var i = 0;i < fetch.length;i++){
            fetch[i].remove();
        }
    }
    else {
        console.error('GNTK cannot remove an unknown destroyer');
    }
}