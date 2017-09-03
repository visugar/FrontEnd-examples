/*下面是常用的封装好的几个方法*/

/*发送ajax请求*/
function ajax(url, data, method, success, error) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var resA = '',
        data = data || {},
        method = method || 'get',
        success = success || function () {},
        error = error || function (err) {
                alert(url + '请求发生错误！');
            };

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0) {
                success && success(xhr.responseText);
            } else {
                error && error(xhr.status);
            }
        }
    };

    if (data) {
        var res = [];
        for (var i in data) {
            res.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        resA = res.join('&');
    }

    if (method === 'get') {
        if (data) {
            url += '?' + resA;
        }
        xhr.open(method, url, true);
        xhr.send(null);
    }

    if (method === 'post') {
        xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
        xhr.open(method, url, true);
        xhr.send(resA);
    }
}


/*绑定事件*/
function addLister(el, type, handler) {
    if (el.addEventListener) {
        el.addEventListener(type, handler, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + type, handler);
    } else {
        el['on' + type] = handler;
    }
}

/*判断是否有className*/
function hasClass(el, className) {
    var cls = el.className;
    if (cls.indexOf(className) > -1) {
        return true;
    }
    return false;
}

/*移除className*/
function removeClass(el, className) {
    var cls = el.className.split(/\s+/);
    if (!cls[0]) return;
    for (var i = 0; i < cls.length; i++) {
        if (cls[i] == className) {
            cls.splice(i, 1);
            el.className = cls.join(' ');
        }
    }
}

/*添加className*/
function addClass(el, className) {
    var cls = el.className.split(/\s+/);
    if (!cls[0]) {
        el.className = className;
    } else {
        el.className += " " + className;
    }
}

/*按id获取该元素*/
function $(id, node) {
    return (node || document).getElementById(id);
}

/*按className来获取该元素*/
function getEleByClass(className, node) {
    return (node || document).getElementsByClassName(className);
}

/*获取样式*/
function getStyle(el) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(el);
    } else if (el.currentStyle) {
        return el.currentStyle;
    }
}

/*设置cookie*/
function setCookie(name, val, days) {
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(val);
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    cookie += '; expires = ' + exp.toGMTString();
    document.cookie = cookie;

}

/*获取cookie值*/
function getCookie() {
    var cookie = {};
    var all = document.cookie;

    if (all == '') {
        return cookie;
    }
    var list = all.split('; ');
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var p = item.indexOf('=');
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    console.log(cookie);
    return cookie;
}

/*load相关事件*/
function addLoadEvent(func) {
    var loadFunc = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            loadFunc();
            func();
        }
    }
}
