import dragMove from '../dragmove.js';
const config = {
    group: 1,
    position: 8,
    icon: '&#xe63e;',
    name: 'serialNumberBox',
    useKeyword: 'ctrl+y',
    settingBox: 'textBox',
    canvas: false,
    hint: '序号工具',
}
const $fontSize = document.getElementById('fontSize');
const $fontColor = document.getElementById('fontColor');
// 序号容器
const $serialNumberBox = document.getElementById('serial_number_box');

function realignment() {
    for (let i = 0; i < $serialNumberBox.children.length; i++) {
        const $children = $serialNumberBox.children.item(i);
        $children.querySelector('span').innerText = `${i + 1}`;
    }
}
function mouseDown(e) {
    let {startX, startY} = this.startPosition;
    const $divInput = document.createElement('div');
    const $textBox = document.createElement('div');
    const $number = document.createElement('span');
    $divInput.append($textBox);
    $divInput.append($number);

    $textBox.contentEditable = true;
    console.log($serialNumberBox.children)
    $number.innerText = `${$serialNumberBox.children.length + 1}`;
    // x轴 边缘判断是否需要反方向
    console.log(startX, this.containerWidth);
    if (startX + 80 > this.containerWidth) {
        $divInput.classList.add('right')
        $divInput.style.right = `${this.containerWidth - startX + 20}px`;
        $divInput.dataset.right = 'true';
    } else {
        $divInput.style.left = `${startX + 20}px`;
    }
    if (startY + 45 > this.containerHeight) {
        startY -= 42;
    }
    // 基本样式
    $textBox.style.maxHeight = `${this.containerHeight - startY - 16}px`;

    $divInput.style.top = `${startY - 15}px`;
    $divInput.style.fontFamily = 'Microsoft YaHei,Sans Serif,System UI';
    $divInput.style.fontSize = `${$fontSize.value}px`;

    $number.style.background = $fontColor.value;

    $serialNumberBox.append($divInput);

    const onMove = (el, x, y) => {
        if (el.classList.contains('right')){
            return x > 0 && y > 0 && x + 30 < this.containerWidth - el.offsetWidth
                && y < this.containerHeight - el.offsetHeight;
        }
        return x > 30 && y > 0 &&
            x < this.containerWidth - el.offsetWidth && y < this.containerHeight - el.offsetHeight;
    }
    dragMove($divInput,$number, {
        onStart: (el) => {
            if (el.classList.contains('right')) {
                const right = parseInt(el.style.right);
                el.style.right = '';
                el.style.left = `${this.containerWidth - right - el.clientWidth}px`;
            }
        },
        onMove,
        onEnd: (el) => {
            $textBox.style.maxHeight = `${this.containerHeight - parseInt(el.style.top) - 16}px`;
            if (el.dataset.right) {
                const left = parseInt(el.style.left);
                el.style.left = '';
                el.style.right = `${this.containerWidth - left - el.clientWidth}px`;
            }
        }
    });
    $textBox.onblur = (e) => {
        if (!e.target.innerText) {
            $divInput.remove();
            realignment();
        }
    }
    setTimeout(() => {
        $textBox.focus();
    }, 200);
    this.isDown = false;
}
function init(priorToolName, toolName) {
    for (let i = 0; i < $serialNumberBox.children.length; i++) {
        const $children = $serialNumberBox.children.item(i);
        $children.contentEditable = true;
        $children.style.pointerEvents = 'auto';
    }
}
function destroy() {
    for (let i = 0; i < $serialNumberBox.children.length; i++) {
        const $children = $serialNumberBox.children.item(i);
        $children.contentEditable = false;
        $children.style.pointerEvents = 'none';
    }
}
export default {
    init,
    mouseDown,
    destroy,
    config,
}
