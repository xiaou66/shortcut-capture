// https://github.com/knadh/dragmove.js
// Kailash Nadh (c) 2020.
// MIT License.

let _loaded = false;
let _callbacks = [];
const _isTouch = window.ontouchstart !== undefined;
/**
 *
 * @param target         移动对象
 * @param handler        拖动对象
 * @param onStart        开始拖动处理回调函数
 * @param onEnd          停止拖动处理回调函数
 * @param onMove         移动时处理回调函数
 * @param onCheck        进行检查是否允许拖动
 * @param preventDefault 是否禁止默认事件
 */
export const dragMove = function(target, handler, {
  onStart = undefined, onEnd = undefined, onMove = undefined, onCheck = undefined,
  preventDefault= true,
} = {}) {
  // Register a global event to capture mouse moves (once).
  if (!_loaded) {
    document.addEventListener(_isTouch ? "touchmove" : "mousemove", function(e) {
      let c = e;
      if (e.touches) {
        c = e.touches[0];
      }
      if (onCheck) {
        if (onCheck(e.target, e) === false) {
          return false;
        }
      }
      // On mouse move, dispatch the coords to all registered callbacks.
      for (var i = 0; i < _callbacks.length; i++) {
        _callbacks[i](c.clientX, c.clientY);
      }
    });
  }

  _loaded = true;
  let isMoving = false, hasStarted = false;
  let startX = 0, startY = 0, lastX = 0, lastY = 0;

  // On the first click and hold, record the offset of the pointer in relation
  // to the point of click inside the element.
  handler.addEventListener(_isTouch ? "touchstart" : "mousedown", function(e) {
    e.stopPropagation();
    if (preventDefault) {
      e.preventDefault();
    }
    // 当设置 dragEnabled 为 false 时不允许拖动
    if (target.dataset.dragEnabled === "false") {
      return;
    }

    let c = e;
    if (e.touches) {
      c = e.touches[0];
    }

    isMoving = true;
    startX = target.offsetLeft - c.clientX;
    startY = target.offsetTop - c.clientY;
  });

  // On leaving click, stop moving.
  document.addEventListener(_isTouch ? "touchend" : "mouseup", function(e) {
    if (onEnd && hasStarted) {
      onEnd(target, parseInt(target.style.left), parseInt(target.style.top));
    }

    isMoving = false;
    hasStarted = false;
  });

  // Register mouse-move callback to move the element.
  _callbacks.push(function move(x, y) {
    if (!isMoving) {
      return;
    }

    if (!hasStarted) {
      hasStarted = true;
      if (onStart) {
        onStart(target, lastX, lastY);
      }
    }

    lastX = x + startX;
    lastY = y + startY;

    // If boundary checking is on, don't let the element cross the viewport.
    if (target.dataset.dragBoundary === "true") {
      lastX = Math.min(window.innerWidth - target.offsetWidth, Math.max(0, lastX));
      lastY = Math.min(window.innerHeight - target.offsetHeight, Math.max(0, lastY));
    }
    if (onMove) {
      const result = onMove(target, lastX, lastY);
      if (result === false) {
        lastX = parseInt(target.style.left);
        lastY = parseInt(target.style.top);
        return;
      }
    }
    target.style.left = lastX + "px";
    target.style.top = lastY + "px";
  });
}

export { dragMove as default };
