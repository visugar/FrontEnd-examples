/*下面是常用的封装好的几个方法*/

/*发送请求*/
function ajax(url, success, fail) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("GET", url, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                success(xhr.responseText);
            } else {
                fail(xhr.status);
            }
        }
    }
}

/*绑定事件*/
function addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}

/*添加class*/
function addClass(element, newClass) {
    var className = element.className;
    if (!className) {
        element.className = newClass;
    } else {
        if (className.indexOf(newClass) === -1) {
            className = className + " ";
            className += newClass;
            element.className = className;
        }
    }

}

/*移除class*/
function removeClass(element, newClass) {
    var className = element.className;
    if (className.indexOf(newClass) > -1) {
        var reg = new RegExp("\s*" + newClass + "\s*", "gi");
        className = className.replace(reg, " ");
        element.className = className;
    }
}

/*查找是否有该class*/
function hasClass(element, cls) {
    var className = element.className;
    if (className.indexOf(cls) > -1) {
        return true;
    }
    return false;
}

/*按id获取该元素*/
function $(id) {
    return document.getElementById(id);
}

/*获取样式*/
function getStyle(element) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element);
    } else if (element.currentStyle) {
        return element.currentStyle;
    }
}