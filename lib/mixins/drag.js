"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easy = require("easy");
var _event = require("../utilities/event");
var _constants = require("../constants");
var LEFT_MOUSE_BUTTON = _easy.constants.LEFT_MOUSE_BUTTON;
function onDragging(draggingHandler, element) {
    var eventType = _constants.DRAGGING, handler = draggingHandler; ///
    this.addEventListener(eventType, handler, element);
}
function offDragging(draggingHandler, element) {
    var eventType = _constants.DRAGGING, handler = draggingHandler; ///
    this.removeEventListener(eventType, handler, element);
}
function onStopDragging(stopDragHandler, element) {
    var eventType = _constants.STOP_DRAGGING, handler = stopDragHandler; ///
    this.addEventListener(eventType, handler, element);
}
function offStopDragging(stopDragHandler, element) {
    var eventType = _constants.STOP_DRAGGING, handler = stopDragHandler; ///
    this.removeEventListener(eventType, handler, element);
}
function onStartDragging(startDragHandler, element) {
    var eventType = _constants.START_DRAGGING, handler = startDragHandler; ///
    this.addEventListener(eventType, handler, element);
}
function offStartDragging(startDragHandler, element) {
    var eventType = _constants.START_DRAGGING, handler = startDragHandler; ///
    this.removeEventListener(eventType, handler, element);
}
function enableDragging() {
    var timeout = null, topOffset = null, leftOffset = null, startMouseTop = null, startMouseLeft = null;
    this.setState({
        timeout: timeout,
        topOffset: topOffset,
        leftOffset: leftOffset,
        startMouseTop: startMouseTop,
        startMouseLeft: startMouseLeft
    });
    this.onMouseDown(mouseDownHandler, this);
}
function disableDragging() {
    this.offMouseDown(mouseDownHandler, this);
}
function isDragging() {
    var dragging = this.hasClass("dragging");
    return dragging;
}
function startWaitingToDrag(mouseTop, mouseLeft) {
    var timeout = this.getTimeout();
    if (timeout === null) {
        timeout = setTimeout((function() {
            this.resetTimeout();
            var mouseOver = this.isMouseOver(mouseTop, mouseLeft);
            if (mouseOver) {
                this.startDragging(mouseTop, mouseLeft);
            }
        }).bind(this), _constants.START_DRAGGING_DELAY);
        this.updateTimeout(timeout);
    }
}
function stopWaitingToDrag() {
    var timeout = this.getTimeout();
    if (timeout !== null) {
        clearTimeout(timeout);
        this.resetTimeout();
    }
}
function startDragging(mouseTop, mouseLeft) {
    var bounds = this.getBounds(), eventType = _constants.START_DRAGGING, boundsTop = bounds.getTop(), boundsLeft = bounds.getLeft(), topOffset = mouseTop - boundsTop, leftOffset = mouseLeft - boundsLeft, startMouseTop = mouseTop, startMouseLeft = mouseLeft, relativeMouseTop = mouseTop - startMouseTop, relativeMouseLeft = mouseLeft - startMouseLeft;
    this.addClass("dragging");
    this.setTopOffset(topOffset);
    this.setLeftOffset(leftOffset);
    this.setStartMouseTop(startMouseTop);
    this.setStartMouseLeft(startMouseLeft);
    this.callHandlers(eventType, relativeMouseTop, relativeMouseLeft);
    this.dragging(mouseTop, mouseLeft);
}
function stopDragging(mouseTop, mouseLeft) {
    var eventType = _constants.STOP_DRAGGING, startMouseTop = this.getStartMouseTop(), startMouseLeft = this.getStartMouseLeft(), relativeMouseTop = mouseTop - startMouseTop, relativeMouseLeft = mouseLeft - startMouseLeft;
    this.callHandlers(eventType, relativeMouseTop, relativeMouseLeft);
    this.removeClass("dragging");
}
function dragging(mouseTop, mouseLeft) {
    var eventType = _constants.DRAGGING, scrollTop = _easy.window.getScrollTop(), scrollLeft = _easy.window.getScrollLeft(), topOffset = this.getTopOffset(), leftOffset = this.getLeftOffset(), startMouseTop = this.getStartMouseTop(), startMouseLeft = this.getStartMouseLeft(), relativeMouseTop = mouseTop - startMouseTop, relativeMouseLeft = mouseLeft - startMouseLeft;
    var top = startMouseTop + relativeMouseTop - topOffset - scrollTop, left = startMouseLeft + relativeMouseLeft - leftOffset - scrollLeft;
    top = "".concat(top, "px"); ///
    left = "".concat(left, "px"); ///
    var css = {
        top: top,
        left: left
    };
    this.css(css);
    this.callHandlers(eventType, relativeMouseTop, relativeMouseLeft);
}
function callHandlers(eventType, relativeMouseTop, relativeMouseLeft) {
    var eventListeners = this.findEventListeners(eventType);
    eventListeners.forEach(function(eventListener) {
        var handler = eventListener.handler, element = eventListener.element;
        handler.call(element, relativeMouseTop, relativeMouseLeft);
    });
}
function isMouseOver(mouseTop, mouseLeft) {
    var bounds = this.getCollapsedBounds(), boundsOverlappingMouse = bounds.isOverlappingMouse(mouseTop, mouseLeft), mouseOver = boundsOverlappingMouse; ///
    return mouseOver;
}
function getTimeout() {
    var state = this.getState(), timeout = state.timeout;
    return timeout;
}
function resetTimeout() {
    var timeout = null;
    this.updateTimeout(timeout);
}
function updateTimeout(timeout) {
    this.updateState({
        timeout: timeout
    });
}
function getTopOffset() {
    var state = this.getState(), topOffset = state.topOffset;
    return topOffset;
}
function getLeftOffset() {
    var state = this.getState(), leftOffset = state.leftOffset;
    return leftOffset;
}
function getStartMouseTop() {
    var state = this.getState(), startMouseTop = state.startMouseTop;
    return startMouseTop;
}
function getStartMouseLeft() {
    var state = this.getState(), startMouseLeft = state.startMouseLeft;
    return startMouseLeft;
}
function setTopOffset(topOffset) {
    this.updateState({
        topOffset: topOffset
    });
}
function setLeftOffset(leftOffset) {
    this.updateState({
        leftOffset: leftOffset
    });
}
function setStartMouseTop(startMouseTop) {
    this.updateState({
        startMouseTop: startMouseTop
    });
}
function setStartMouseLeft(startMouseLeft) {
    this.updateState({
        startMouseLeft: startMouseLeft
    });
}
var _default = {
    onDragging: onDragging,
    offDragging: offDragging,
    onStopDragging: onStopDragging,
    offStopDragging: offStopDragging,
    onStartDragging: onStartDragging,
    offStartDragging: offStartDragging,
    enableDragging: enableDragging,
    disableDragging: disableDragging,
    isDragging: isDragging,
    startWaitingToDrag: startWaitingToDrag,
    stopWaitingToDrag: stopWaitingToDrag,
    startDragging: startDragging,
    stopDragging: stopDragging,
    dragging: dragging,
    callHandlers: callHandlers,
    isMouseOver: isMouseOver,
    getTimeout: getTimeout,
    resetTimeout: resetTimeout,
    updateTimeout: updateTimeout,
    getTopOffset: getTopOffset,
    getLeftOffset: getLeftOffset,
    getStartMouseTop: getStartMouseTop,
    getStartMouseLeft: getStartMouseLeft,
    setTopOffset: setTopOffset,
    setLeftOffset: setLeftOffset,
    setStartMouseTop: setStartMouseTop,
    setStartMouseLeft: setStartMouseLeft
};
exports.default = _default;
function mouseUpHandler(event, element) {
    _easy.window.off(_constants.BLUR, mouseUpHandler, this); ///
    _easy.window.offMouseUp(mouseUpHandler, this);
    _easy.window.offMouseMove(mouseMoveHandler, this);
    var dragging1 = this.isDragging();
    if (dragging1) {
        var explorer = this.getExplorer(), dragEntry = this; ///
        explorer.stopDragging(dragEntry, (function() {
            var mouseTop = (0, _event).mouseTopFromEvent(event), mouseLeft = (0, _event).mouseLeftFromEvent(event);
            this.stopDragging(mouseTop, mouseLeft);
        }).bind(this));
    } else {
        this.stopWaitingToDrag();
    }
}
function mouseDownHandler(event, element) {
    var button = event.button;
    _easy.window.on(_constants.BLUR, mouseUpHandler, this); ///
    _easy.window.onMouseUp(mouseUpHandler, this);
    _easy.window.onMouseMove(mouseMoveHandler, this);
    if (button === LEFT_MOUSE_BUTTON) {
        var dragging1 = this.isDragging();
        if (!dragging1) {
            var mouseTop = (0, _event).mouseTopFromEvent(event), mouseLeft = (0, _event).mouseLeftFromEvent(event);
            this.startWaitingToDrag(mouseTop, mouseLeft);
        }
    }
}
function mouseMoveHandler(event, element) {
    var dragging2 = this.isDragging();
    if (dragging2) {
        var mouseTop = (0, _event).mouseTopFromEvent(event), mouseLeft = (0, _event).mouseLeftFromEvent(event);
        this.dragging(mouseTop, mouseLeft);
    }
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvZHJhZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgd2luZG93LCBjb25zdGFudHMgfSBmcm9tIFwiZWFzeVwiO1xuXG5pbXBvcnQgeyBtb3VzZVRvcEZyb21FdmVudCwgbW91c2VMZWZ0RnJvbUV2ZW50IH0gZnJvbSBcIi4uL3V0aWxpdGllcy9ldmVudFwiO1xuaW1wb3J0IHsgQkxVUiwgRFJBR0dJTkcsIFNUT1BfRFJBR0dJTkcsIFNUQVJUX0RSQUdHSU5HLCBTVEFSVF9EUkFHR0lOR19ERUxBWSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBMRUZUX01PVVNFX0JVVFRPTiB9ID0gY29uc3RhbnRzO1xuXG5mdW5jdGlvbiBvbkRyYWdnaW5nKGRyYWdnaW5nSGFuZGxlciwgZWxlbWVudCkge1xuICBjb25zdCBldmVudFR5cGUgPSBEUkFHR0lORyxcbiAgICAgICAgaGFuZGxlciA9IGRyYWdnaW5nSGFuZGxlcjsgIC8vL1xuXG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBvZmZEcmFnZ2luZyhkcmFnZ2luZ0hhbmRsZXIsIGVsZW1lbnQpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gRFJBR0dJTkcsXG4gICAgICAgIGhhbmRsZXIgPSBkcmFnZ2luZ0hhbmRsZXI7ICAvLy9cblxuICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gb25TdG9wRHJhZ2dpbmcoc3RvcERyYWdIYW5kbGVyLCBlbGVtZW50KSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9IFNUT1BfRFJBR0dJTkcsXG4gICAgICAgIGhhbmRsZXIgPSBzdG9wRHJhZ0hhbmRsZXI7ICAvLy9cblxuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gb2ZmU3RvcERyYWdnaW5nKHN0b3BEcmFnSGFuZGxlciwgZWxlbWVudCkge1xuICBjb25zdCBldmVudFR5cGUgPSBTVE9QX0RSQUdHSU5HLFxuICAgICAgICBoYW5kbGVyID0gc3RvcERyYWdIYW5kbGVyOyAgLy8vXG5cbiAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIG9uU3RhcnREcmFnZ2luZyhzdGFydERyYWdIYW5kbGVyLCBlbGVtZW50KSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9IFNUQVJUX0RSQUdHSU5HLFxuICAgICAgICBoYW5kbGVyID0gc3RhcnREcmFnSGFuZGxlcjsgIC8vL1xuXG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBvZmZTdGFydERyYWdnaW5nKHN0YXJ0RHJhZ0hhbmRsZXIsIGVsZW1lbnQpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gU1RBUlRfRFJBR0dJTkcsXG4gICAgICAgIGhhbmRsZXIgPSBzdGFydERyYWdIYW5kbGVyOyAgLy8vXG5cbiAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURyYWdnaW5nKCkge1xuICBjb25zdCB0aW1lb3V0ID0gbnVsbCxcbiAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgbGVmdE9mZnNldCA9IG51bGwsXG4gICAgICAgIHN0YXJ0TW91c2VUb3AgPSBudWxsLFxuICAgICAgICBzdGFydE1vdXNlTGVmdCA9IG51bGw7XG5cbiAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgdGltZW91dCxcbiAgICB0b3BPZmZzZXQsXG4gICAgbGVmdE9mZnNldCxcbiAgICBzdGFydE1vdXNlVG9wLFxuICAgIHN0YXJ0TW91c2VMZWZ0XG4gIH0pO1xuXG4gIHRoaXMub25Nb3VzZURvd24obW91c2VEb3duSGFuZGxlciwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGVEcmFnZ2luZygpIHtcbiAgdGhpcy5vZmZNb3VzZURvd24obW91c2VEb3duSGFuZGxlciwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGlzRHJhZ2dpbmcoKSB7XG4gIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcyhcImRyYWdnaW5nXCIpO1xuXG4gIHJldHVybiBkcmFnZ2luZztcbn1cblxuZnVuY3Rpb24gc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgbGV0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcblxuICBpZiAodGltZW91dCA9PT0gbnVsbCkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH0sIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcblxuICAgIHRoaXMudXBkYXRlVGltZW91dCh0aW1lb3V0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgY29uc3QgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuXG4gIGlmICh0aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgZXZlbnRUeXBlID0gU1RBUlRfRFJBR0dJTkcsXG4gICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgIHRvcE9mZnNldCA9IG1vdXNlVG9wIC0gYm91bmRzVG9wLFxuICAgICAgICBsZWZ0T2Zmc2V0ID0gbW91c2VMZWZ0IC0gYm91bmRzTGVmdCxcbiAgICAgICAgc3RhcnRNb3VzZVRvcCA9IG1vdXNlVG9wLCAvLy9cbiAgICAgICAgc3RhcnRNb3VzZUxlZnQgPSBtb3VzZUxlZnQsIC8vL1xuICAgICAgICByZWxhdGl2ZU1vdXNlVG9wID0gbW91c2VUb3AgLSBzdGFydE1vdXNlVG9wLFxuICAgICAgICByZWxhdGl2ZU1vdXNlTGVmdCA9IG1vdXNlTGVmdCAtIHN0YXJ0TW91c2VMZWZ0O1xuXG4gIHRoaXMuYWRkQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcblxuICB0aGlzLnNldFRvcE9mZnNldCh0b3BPZmZzZXQpO1xuXG4gIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICB0aGlzLnNldFN0YXJ0TW91c2VUb3Aoc3RhcnRNb3VzZVRvcCk7XG5cbiAgdGhpcy5zZXRTdGFydE1vdXNlTGVmdChzdGFydE1vdXNlTGVmdCk7XG5cbiAgdGhpcy5jYWxsSGFuZGxlcnMoZXZlbnRUeXBlLCByZWxhdGl2ZU1vdXNlVG9wLCByZWxhdGl2ZU1vdXNlTGVmdCk7XG5cbiAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbn1cblxuZnVuY3Rpb24gc3RvcERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gU1RPUF9EUkFHR0lORyxcbiAgICAgICAgc3RhcnRNb3VzZVRvcCA9IHRoaXMuZ2V0U3RhcnRNb3VzZVRvcCgpLFxuICAgICAgICBzdGFydE1vdXNlTGVmdCA9IHRoaXMuZ2V0U3RhcnRNb3VzZUxlZnQoKSxcbiAgICAgICAgcmVsYXRpdmVNb3VzZVRvcCA9IG1vdXNlVG9wIC0gc3RhcnRNb3VzZVRvcCxcbiAgICAgICAgcmVsYXRpdmVNb3VzZUxlZnQgPSBtb3VzZUxlZnQgLSBzdGFydE1vdXNlTGVmdDtcblxuICB0aGlzLmNhbGxIYW5kbGVycyhldmVudFR5cGUsIHJlbGF0aXZlTW91c2VUb3AsIHJlbGF0aXZlTW91c2VMZWZ0KTtcblxuICB0aGlzLnJlbW92ZUNsYXNzKFwiZHJhZ2dpbmdcIik7XG59XG5cbmZ1bmN0aW9uIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gRFJBR0dJTkcsXG4gICAgICAgIHNjcm9sbFRvcCA9IHdpbmRvdy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgc2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgIHRvcE9mZnNldCA9IHRoaXMuZ2V0VG9wT2Zmc2V0KCksXG4gICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLmdldExlZnRPZmZzZXQoKSxcbiAgICAgICAgc3RhcnRNb3VzZVRvcCA9IHRoaXMuZ2V0U3RhcnRNb3VzZVRvcCgpLFxuICAgICAgICBzdGFydE1vdXNlTGVmdCA9IHRoaXMuZ2V0U3RhcnRNb3VzZUxlZnQoKSxcbiAgICAgICAgcmVsYXRpdmVNb3VzZVRvcCA9IG1vdXNlVG9wIC0gc3RhcnRNb3VzZVRvcCxcbiAgICAgICAgcmVsYXRpdmVNb3VzZUxlZnQgPSBtb3VzZUxlZnQgLSBzdGFydE1vdXNlTGVmdDtcblxuICBsZXQgdG9wID0gc3RhcnRNb3VzZVRvcCArIHJlbGF0aXZlTW91c2VUb3AgLSB0b3BPZmZzZXQgLSBzY3JvbGxUb3AsXG4gICAgICBsZWZ0ID0gc3RhcnRNb3VzZUxlZnQgKyByZWxhdGl2ZU1vdXNlTGVmdCAtIGxlZnRPZmZzZXQgLSBzY3JvbGxMZWZ0O1xuXG4gIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gIGNvbnN0IGNzcyA9IHtcbiAgICB0b3AsXG4gICAgbGVmdFxuICB9O1xuXG4gIHRoaXMuY3NzKGNzcyk7XG5cbiAgdGhpcy5jYWxsSGFuZGxlcnMoZXZlbnRUeXBlLCByZWxhdGl2ZU1vdXNlVG9wLCByZWxhdGl2ZU1vdXNlTGVmdCk7XG59XG5cbmZ1bmN0aW9uIGNhbGxIYW5kbGVycyhldmVudFR5cGUsIHJlbGF0aXZlTW91c2VUb3AsIHJlbGF0aXZlTW91c2VMZWZ0KSB7XG4gIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gdGhpcy5maW5kRXZlbnRMaXN0ZW5lcnMoZXZlbnRUeXBlKTtcblxuICBldmVudExpc3RlbmVycy5mb3JFYWNoKChldmVudExpc3RlbmVyKSA9PiB7XG4gICAgY29uc3QgeyBoYW5kbGVyLCBlbGVtZW50IH0gPSBldmVudExpc3RlbmVyO1xuXG4gICAgaGFuZGxlci5jYWxsKGVsZW1lbnQsIHJlbGF0aXZlTW91c2VUb3AsIHJlbGF0aXZlTW91c2VMZWZ0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgIG1vdXNlT3ZlciA9IGJvdW5kc092ZXJsYXBwaW5nTW91c2U7ICAvLy9cblxuICByZXR1cm4gbW91c2VPdmVyO1xufVxuXG5mdW5jdGlvbiBnZXRUaW1lb3V0KCkge1xuICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgIHsgdGltZW91dCB9ID0gc3RhdGU7XG5cbiAgcmV0dXJuIHRpbWVvdXQ7XG59XG5cbmZ1bmN0aW9uIHJlc2V0VGltZW91dCgpIHtcbiAgY29uc3QgdGltZW91dCA9IG51bGw7XG5cbiAgdGhpcy51cGRhdGVUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUaW1lb3V0KHRpbWVvdXQpIHtcbiAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgdGltZW91dFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0VG9wT2Zmc2V0KCkge1xuICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgeyB0b3BPZmZzZXQgfSA9IHN0YXRlO1xuXG4gIHJldHVybiB0b3BPZmZzZXQ7XG59XG5cbmZ1bmN0aW9uIGdldExlZnRPZmZzZXQoKSB7XG4gIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICB7IGxlZnRPZmZzZXQgfSA9IHN0YXRlO1xuXG4gIHJldHVybiBsZWZ0T2Zmc2V0O1xufVxuXG5mdW5jdGlvbiBnZXRTdGFydE1vdXNlVG9wKCkge1xuICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgIHsgc3RhcnRNb3VzZVRvcCB9ID0gc3RhdGU7XG5cbiAgcmV0dXJuIHN0YXJ0TW91c2VUb3A7XG59XG5cbmZ1bmN0aW9uIGdldFN0YXJ0TW91c2VMZWZ0KCkge1xuICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgIHsgc3RhcnRNb3VzZUxlZnQgfSA9IHN0YXRlO1xuXG4gIHJldHVybiBzdGFydE1vdXNlTGVmdDtcbn1cblxuZnVuY3Rpb24gc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCkge1xuICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICB0b3BPZmZzZXRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICBsZWZ0T2Zmc2V0XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRTdGFydE1vdXNlVG9wKHN0YXJ0TW91c2VUb3ApIHtcbiAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgc3RhcnRNb3VzZVRvcFxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0U3RhcnRNb3VzZUxlZnQoc3RhcnRNb3VzZUxlZnQpIHtcbiAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgc3RhcnRNb3VzZUxlZnRcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb25EcmFnZ2luZyxcbiAgb2ZmRHJhZ2dpbmcsXG4gIG9uU3RvcERyYWdnaW5nLFxuICBvZmZTdG9wRHJhZ2dpbmcsXG4gIG9uU3RhcnREcmFnZ2luZyxcbiAgb2ZmU3RhcnREcmFnZ2luZyxcbiAgZW5hYmxlRHJhZ2dpbmcsXG4gIGRpc2FibGVEcmFnZ2luZyxcbiAgaXNEcmFnZ2luZyxcbiAgc3RhcnRXYWl0aW5nVG9EcmFnLFxuICBzdG9wV2FpdGluZ1RvRHJhZyxcbiAgc3RhcnREcmFnZ2luZyxcbiAgc3RvcERyYWdnaW5nLFxuICBkcmFnZ2luZyxcbiAgY2FsbEhhbmRsZXJzLFxuICBpc01vdXNlT3ZlcixcbiAgZ2V0VGltZW91dCxcbiAgcmVzZXRUaW1lb3V0LFxuICB1cGRhdGVUaW1lb3V0LFxuICBnZXRUb3BPZmZzZXQsXG4gIGdldExlZnRPZmZzZXQsXG4gIGdldFN0YXJ0TW91c2VUb3AsXG4gIGdldFN0YXJ0TW91c2VMZWZ0LFxuICBzZXRUb3BPZmZzZXQsXG4gIHNldExlZnRPZmZzZXQsXG4gIHNldFN0YXJ0TW91c2VUb3AsXG4gIHNldFN0YXJ0TW91c2VMZWZ0XG59O1xuXG5mdW5jdGlvbiBtb3VzZVVwSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICB3aW5kb3cub2ZmKEJMVVIsIG1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xuXG4gIHdpbmRvdy5vZmZNb3VzZVVwKG1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICB3aW5kb3cub2ZmTW91c2VNb3ZlKG1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgaWYgKGRyYWdnaW5nKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ0VudHJ5ID0gdGhpczsgIC8vL1xuXG4gICAgZXhwbG9yZXIuc3RvcERyYWdnaW5nKGRyYWdFbnRyeSwgKCkgPT4ge1xuICAgICAgY29uc3QgbW91c2VUb3AgPSBtb3VzZVRvcEZyb21FdmVudChldmVudCksXG4gICAgICAgICAgICBtb3VzZUxlZnQgPSBtb3VzZUxlZnRGcm9tRXZlbnQoZXZlbnQpO1xuXG4gICAgICB0aGlzLnN0b3BEcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW91c2VEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICBjb25zdCB7IGJ1dHRvbiB9ID0gZXZlbnQ7XG5cbiAgd2luZG93Lm9uKEJMVVIsIG1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXG5cbiAgd2luZG93Lm9uTW91c2VVcChtb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgd2luZG93Lm9uTW91c2VNb3ZlKG1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gIGlmIChidXR0b24gPT09IExFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IG1vdXNlVG9wID0gbW91c2VUb3BGcm9tRXZlbnQoZXZlbnQpLFxuICAgICAgICAgICAgbW91c2VMZWZ0ID0gbW91c2VMZWZ0RnJvbUV2ZW50KGV2ZW50KTtcblxuICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICBpZiAoZHJhZ2dpbmcpIHtcbiAgICBjb25zdCBtb3VzZVRvcCA9IG1vdXNlVG9wRnJvbUV2ZW50KGV2ZW50KSxcbiAgICAgICAgICBtb3VzZUxlZnQgPSBtb3VzZUxlZnRGcm9tRXZlbnQoZXZlbnQpO1xuXG4gICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRXNCLEtBQU07SUFFYyxNQUFvQjtJQUNVLFVBQWM7SUFFMUYsaUJBQWlCLEdBTFMsS0FBTSxXQUtoQyxpQkFBaUI7U0FFaEIsVUFBVSxDQUFDLGVBQWUsRUFBRSxPQUFPO1FBQ3BDLFNBQVMsR0FMbUUsVUFBYyxXQU0xRixPQUFPLEdBQUcsZUFBZSxDQUFHLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztTQUVoQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU87O1NBRzFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsT0FBTztRQUNyQyxTQUFTLEdBWm1FLFVBQWMsV0FhMUYsT0FBTyxHQUFHLGVBQWUsQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7U0FFaEMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPOztTQUc3QyxjQUFjLENBQUMsZUFBZSxFQUFFLE9BQU87UUFDeEMsU0FBUyxHQW5CbUUsVUFBYyxnQkFvQjFGLE9BQU8sR0FBRyxlQUFlLENBQUcsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO1NBRWhDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTzs7U0FHMUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxPQUFPO1FBQ3pDLFNBQVMsR0ExQm1FLFVBQWMsZ0JBMkIxRixPQUFPLEdBQUcsZUFBZSxDQUFHLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztTQUVoQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU87O1NBRzdDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPO1FBQzFDLFNBQVMsR0FqQ21FLFVBQWMsaUJBa0MxRixPQUFPLEdBQUcsZ0JBQWdCLENBQUcsQ0FBRyxB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