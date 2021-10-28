const config = {
    group: 1,
    position: 7,
    icon: '&#xe652;',
    name: 'textBox',
    useKeyword: 'ctrl+t',
    settingBox: 'textBox',
    canvas: false,
    hint: '文本工具',
}
const $fontSize = document.getElementById('fontSize');
const $fontColor = document.getElementById('fontColor');
function setFontSize ($inputText) {
    $inputText.style.fontSize = `${$fontSize.value}px`;
}
function setFontColor($inputText) {
    $inputText.style.color = $fontColor.value;
}
function mouseDown(e) {
    let {startX, startY} = this.startPosition;
    const $divInput = document.createElement('div');
    $divInput.contentEditable = true;
    $divInput.classList.add('text_input')
    if (startX + 23 > this.containerWidth) {
        startX -= 25;
    }
    if (startY + 45 > this.containerHeight) {
        startY -= 42;
    }
    // 基本样式
    $divInput.style.maxHeight = `${this.containerHeight - startY}px`
    $divInput.style.left = startX + 'px';
    $divInput.style.top = startY + 'px';
    $divInput.style.fontFamily = 'Microsoft YaHei,Sans Serif,System UI';

    $divInput.style.fontSize = `${$fontSize.value}px`;
    $divInput.style.color = $fontColor.value;
    this.$mainContainer.append($divInput);
    // 自动获取焦点
    setTimeout(() =>{
        $divInput.focus();
    }, 250);
    $divInput.onfocus = (e) => {
        $divInput.classList.add('text_input_active')
    }
    $divInput.onblur = (e) => {
        if (!e.target.innerText) {
            e.target.remove();
            return;
        }
        e.target.classList.remove('text_input_active', 'text_input_move')
        // this.pushHistory(config.name, $divInput);
        // console.log(this.history)
    }
    let posX = 0, posY = 0;
    let offsetLeft = 0, offsetTop = 0;
    $divInput.onmousedown = (e) => {
        $divInput.contentEditable = !e.altKey;
        if (e.altKey) {
            // 移动
            const {clientX, clientY, offsetY, offsetX} = e;
            posX = clientX;posY = clientY;
            offsetLeft = offsetX;offsetTop = offsetY;
            console.log(posX, posY);
            console.log(offsetX, offsetY);
            e.target.classList.add('text_input_active', 'text_input_move');
            return;
        }
        e.target.classList.remove('text_input_move');

        // window.textBoxFontSize = ($divInput) => setFontSize($divInput);
        // window.textBoxFontColor = ($divInput) => setFontColor($divInput);
        // $fontColor.addEventListener('change', window.textBoxFontSize);
        // $fontSize.addEventListener('change', window.textBoxFontColor);
    }
    $divInput.onmousemove = (e) => {
        const $target = e.target;
        console.log($target.classList.contains('text_input_move'))
        if (!$target.classList.contains('text_input_move')) {
            return;
        }
        let moveX = e.clientX -  offsetLeft;
        let moveY = e.clientY -  offsetTop;
        // 边界判断
        if (moveX < 0) {
            moveX = 0;
        }
        if (moveX > this.containerWidth - $target.offsetWidth) {
            moveX = this.containerWidth - $target.offsetWidth;
        }
        if (moveY < 0) {
            moveY = 0;
        }
        if (moveY > this.containerHeight - $target.offsetHeight) {
            moveY = this.containerHeight - $target.offsetHeight;
        }
        //-------------
        $target.style.left =  moveX + "px";
        $target.style.top =  moveY + "px";
        $fontColor.onchange = undefined;
    }
    $divInput.onmouseup = (e) => {
        const $target = e.target;
        if ($target.classList.contains('text_input_move')) {
            e.target.classList.remove('text_input_move')
        }
        // $fontColor.removeEventListener('change', window.textBoxFontSize);
        // $fontSize.removeEventListener('change', window.textBoxFontColor);
        // delete window.textBoxFontColor;
        // delete window.textBoxFontSize;
    }
}
function init(priorToolName, toolName) {
    document.querySelectorAll('.text_input')
        .forEach($div => {
            $div.className = 'text_input';
            $div.contentEditable = true;
            console.log($div)
        })
}
function destroy() {
    document.querySelectorAll('.text_input')
        .forEach($div => {
            $div.className = 'text_input stopEvents';
            $div.contentEditable = false;
        })
}
// function rollBack($div) {
//     const index = this.history.findIndex(item => item.data === $div);
//     this.history[index].remove();
//     this.history.splice(index, 1);
// }
export default {
    init,
    mouseDown,
    destroy,
    config,
}
