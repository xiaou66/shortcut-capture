import dragMove from '../dragmove.js';
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
    $divInput.style.maxHeight = `${this.containerHeight - startY - 12}px`
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
    $divInput.onclick = (e) => {
        if ($divInput.classList.contains('text_input_active')) {
            return;
        }
        const target = e.target;
        target.contentEditable = true;
        target.classList.add('text_input_active');
        target.focus();
    }
    dragMove($divInput, $divInput, {
        onStart: (el) => {
            el.classList.add('text_input_move');
        },
        onCheck: (el, e) => {
            if(!e.ctrlKey) {
                e.preventDefault();
            }
            return !e.ctrlKey;
        },
        onMove: (el, x, y) => {

            return x > 0 && y > 0 &&
                x + el.clientWidth < this.containerWidth && y + el.clientHeight < this.containerHeight;
        },
        onEnd: (el) => {
            el.style.maxHeight = `${this.containerHeight - parseInt(el.style.top) - 12}px`
            el.classList.remove('text_input_move');
        },
        preventDefault: false
    });
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
