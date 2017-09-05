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

/***********************************************************************/

/*顶部通知栏*/
function exaTip() {
    var exaHead = getEleByClass('extra-head')[0];
    var exaTip = getEleByClass('close', exaHead)[0];
    addLister(exaTip, 'click', function () {
        tipClose();
        setCookie('tipCookie', 'tipClose', 20);
    });
}

/*隐藏顶部通知栏*/
function tipClose() {
    var exaHead = getEleByClass('extra-head')[0];
    exaHead.style.display = 'none';
}

addLoadEvent(exaTip);

/*检查页面的cookie值*/
function checkCookie() {
    /*检查顶部通知栏*/
    if (getCookie().tipCookie) {
        tipClose();
    }

    /*检查是否登录*/
    if (getCookie().loginSuc && getCookie().followSuc) {
        closeAtten();
        showUserAtten();
    }
}

/*在页面刷新或离开前检查cookie值*/
addLister(window, "load", checkCookie);


/*关注及登录*/
function login() {
    var login = getEleByClass('login')[0];
    var follow = getEleByClass('follow', login)[0];

    var logMask = getEleByClass('login-mask')[0];
    var logClose = getEleByClass('login-close', logMask)[0];
    var userName = getEleByClass('user', logMask)[0];
    var userPsw = getEleByClass('psw', logMask)[0];
    var logBtn = getEleByClass('login-btn', logMask)[0];
    var logCal = getEleByClass('login-cal', logMask)[0];

    var unFollow = getEleByClass('unfollow')[0];

    /*给关注按钮绑定点击事件*/
    addLister(follow, 'click', userLogin);

    function userLogin() {
        /*判断未登陆则先登陆*/
        if (!getCookie().loginSuc) {
            loginPop(); //显示登陆弹窗
            addLister(logClose, 'click', closePop); //点击关闭按钮时关闭登录窗口
            addLister(logCal, 'click', closePop);

            /*绑定点击登录按钮事件*/
            addLister(logBtn, 'click', function () {
                /*先进行js验证,验证通过则进行用户登录请求*/
                if (userCheck()) {

                    ajax(
                        url = 'http://study.163.com/webDev/login.htm',
                        data = {
                            userName: md5(userName.value), //固定用户名为studyOnline
                            password: md5(userPsw.value) //固定用户名密码为study.163.com
                        },
                        method = 'get',
                        success = function (res) {
                            if (res == 1) {
                                /*1成功 0失败  如果后台验证成功，则关闭登录按钮*/
                                closePop();
                                /*设置登陆的cookie值*/
                                setCookie('loginSuc', 'loginTrue', 1);
                                /*发送关注请求*/
                                ajax(
                                    url = 'http://study.163.com/webDev/attention.htm',
                                    data = {},
                                    method = 'get',
                                    success = function (res) {
                                        if (res == 1) {

                                            /*设置已关注的cookie*/
                                            setCookie('followSuc', 'followTrue', 1);

                                            /* 成功为1 判断关注请求是否返回成功，成功则隐藏关注按钮 显示已关注按钮*/
                                            closeAtten();
                                            showUserAtten();
                                        }
                                    },
                                    error = function (err) {
                                        alert(err);
                                    });

                            } else {
                                alert('用户名及密码固定为studyOnline和study.163.com！');
                            }
                        },
                        error = function (err) {
                            alert('登录验证失败，请重新登陆！');
                            console.log(err);
                        });

                }
            })

        } else {
            alert('您已登录!');
            /*判断已登录则进行关注请求*/
            ajax(
                url = 'http://study.163.com/webDev/attention.htm',
                data = {},
                method = 'get',
                success = function (res) {
                    if (res == 1) {
                        setCookie('followSuc', 'followTrue', 1);
                        closeAtten();
                        showUserAtten();
                    }
                });
        }
    }

    /*点击取消按钮取消关注，并删除对应cookie值*/
    addLister(unFollow, 'click', unfollow);
}

/*显示登陆弹窗*/
function loginPop() {
    var logMask = getEleByClass('login-mask')[0];
    logMask.style.display = 'block';
}

/*关闭登录弹窗*/
function closePop() {
    var logMask = getEleByClass('login-mask')[0];
    logMask.style.display = 'none';
}

/*用户信息js验证*/
function userCheck() {
    var logMask = getEleByClass('login-mask')[0];
    var userName = getEleByClass('user', logMask)[0].value;
    var userPsw = getEleByClass('psw', logMask)[0].value;

    if (!userName) {
        alert('用户名不不能为空！');
        return false;
    } else if (!userPsw) {
        alert('密码不能为空！');
        return false;
    } else if ((userName.length >= 6) && (userName.length <= 16) && (userPsw.length >= 8) && (userPsw.length <= 20)) {
        return true;
    } else {
        alert('输入格式错误！');
        return false;
    }
}

/*隐藏关注按钮*/
function closeAtten() {
    var follow = getEleByClass('follow')[0];
    follow.style.display = 'none';
}

/*显示用户已关注按钮*/
function showUserAtten() {
    var userFoll = getEleByClass('userFoll')[0];
    userFoll.style.display = 'inline-block';
}

/*隐藏已关注按钮*/
function closeUserAtten() {
    var userFoll = getEleByClass('userFoll')[0];
    userFoll.style.display = 'none';
}

/*显示关注按钮*/
function showAtten() {
    var follow = getEleByClass('follow')[0];
    follow.style.display = 'inline-block';
}

/*取消关注*/
function unfollow() {
    closeUserAtten();
    showAtten();
    setCookie('followSuc', '');
}

addLoadEvent(login);


/*轮播图*/
function slideshow() {
    var currentImg = 0,
        banerArr = getEleByClass('pic-list')[0].getElementsByTagName('li'),
        imgLen = banerArr.length,
        iconWrap = getEleByClass('icon-list')[0];
    iconArr = getEleByClass('icon-list')[0].getElementsByTagName('li');

    var timer = setInterval(function () {
        if (currentImg < imgLen - 1) {
            currentImg++;
        } else {
            currentImg = 0;
        }
        switchTo(currentImg);
    }, 5000);

    addEvent();
    /*鼠标移入及按钮点击事件*/
    function addEvent() {
        for(var i=0;i<imgLen;i++){
            (function(j){
                addLister(iconArr[j],'click',function(){
                    switchTo(j);
                    currentImg = j;
                });
            })(i);
            (function(j){
                addLister(banerArr[j],'mouseover',function(){
                    clearInterval(timer);
                    currentImg = j;
                });
                addLister(banerArr[j],'mouseout',function(){
                    timer = setInterval(function(){
                        if(currentImg<imgLen-1){
                            currentImg++;
                        }else{
                            currentImg = 0;
                        }
                        switchTo(currentImg);
                    },5000);
                });
            })(i);
        }


    }

    /*切换到当前图片*/
    function switchTo(currentImg) {
        var showOn = getEleByClass('show-on')[0];
        fadeOut(showOn);
        removeClass(showOn, 'show-on');
        addClass(banerArr[currentImg], 'show-on');
        fadeIn(banerArr[currentImg]);

        var curIcon = getEleByClass('active', iconWrap)[0];
        removeClass(curIcon, 'active');
        addClass(iconArr[currentImg], 'active');
    }

    /*淡入*/
    function fadeIn(el) {
        setOpacity(el, 0);
        for (var i = 0; i <= 20; i++) {
            (function () {
                var val = i * 5;
                setTimeout(function () {
                    setOpacity(el, val);
                }, i * 25);
            })(i);
        }
    }

    /*淡出*/
    function fadeOut(el) {
        for (var j = 0; j <= 20; j++) {
            (function () {
                var val = 100 - j * 5;
                setTimeout(function () {
                    setOpacity(el, val);
                }, j * 25);
            })(j);
        }
    }

    /*设置透明度*/
    function setOpacity(el, val) {
        if (el.filters) {
            el.style.filter = "alpha(opacity=)" + val + ")";
        } else {
            el.style.opacity = val / 100;
        }
    }


}

addLoadEvent(slideshow);

/*右侧视频播放*/
function videoPlay() {
    var videoMask = getEleByClass('video-mask')[0];
    var videoPlay = getEleByClass('video-play')[0];

    var videClose = getEleByClass('video-close')[0];
    var video = getEleByClass('video', videoMask)[0];

    function videoPlayOn() {
        videoMask.style.display = 'block';
    }

    function videoCloseOn() {
        videoMask.style.display = 'none';
        video.pause();
    }

    addLister(videoPlay, 'click', videoPlayOn);
    addLister(videClose, 'click', videoCloseOn);
}

addLoadEvent(videoPlay);

/*右侧热门排行*/
function hotCourse() {
    var hotList = getEleByClass('hot-list')[0];
    var result = null;
    var num = 10;

    function Course(options) {
        var template = `
                        <a href="http://baidu.com">
                            <img src="${options.smallPhotoUrl}">
                            <div class="title">
                                <h3>${options.name}</h3>
                                <div class="person">${options.learnerCount}</div>
                            </div>
                         </a>`;
        var li = document.createElement('li');
        li.className = 'clearfix';
        li.innerHTML = template;
        hotList.appendChild(li);
    }

    /*请求热门课程*/
    ajax(
        url = 'http://study.163.com/webDev/hotcouresByCategory.htm',
        data = {},
        method = 'get',
        success = function (res) {
            result = JSON.parse(res);
            showHotCourse(result);
        },
        error = function (err) {
            alert('获取热门课程有误！');
            console.log(err);
        })

    function showHotCourse(data) {

        for (var i = 0; i < 10; i++) {
            var item = new Course({
                id: data[i].id,
                smallPhotoUrl: data[i].smallPhotoUrl,
                name: data[i].name,
                learnerCount: data[i].learnerCount
            });
        }
    }

    /*没5s更新一次*/
    var timer = setInterval(function () {
        hotList.removeChild(hotList.firstChild); //删除第一个子元素
        var newItem = new Course({
            id: result[num].id,
            smallPhotoUrl: result[num].smallPhotoUrl,
            name: result[num].name,
            learnerCount: result[num].learnerCount
        }); //添加一个课程
        num == 19 ? num = 0 : num++;
    }, 5000);
}

addLoadEvent(hotCourse);
var currentPage = null;
/*左侧课程*/
function allCourse(pageNum, sizeNum, typeNum) {
    var cusList = getEleByClass('cusList')[0];
    var result = null;
    var totalPage = null;
    currentPage = currentPage || pageNum;

    /*当前页为最后一页时，改变窗口大小，当前页应当变成最后一页*/
    /*if(currentPage!=1){
        ajax(
        url = 'http://study.163.com/webDev/couresByCategory.htm',
        data = {
            pageNo: 1,
            psize: sizeNum,
            type: typeNum
        },
        method = 'get',
        success = function (res) {
            
           if(JSON.parse(res).totalPage<currentPage){
               currentPage = totalPage;
           }
        },
        error = function (err) {
            alert('获取课程有误');
        });
    }else{
        currentPage = currentPage || pageNum;
    }*/


    /*创建一门课程*/
    function mainCourse(options) {
        var template = `<a href="#">
                                        <img class="cover" src="${options.middlePhotoUrl}">
                                        <div class="cus-info">
                                            <h4>${options.title}</h4>
                                            <span>${options.provider}</span>
                                            <div class="user">${options.learnerCount}</div>
                                            <span class="price">￥${options.price}.00</span>
                                        </div>
                                    </a>
                                    <div class="cus-detail">
                                        <div class="detial-head clearfix">
                                            <img src="${options.middlePhotoUrl}">
                                            <div class="detail-info">
                                                <h3>${options.title}</h3>
                                                <span class="person">${options.learnerCount}</span>
                                                <p>发布者：${options.provider}</p>
                                                <p>分类：${options.categoryName}</p>
                                            </div>
                                        </div>
                                        <p>${options.description}</p>
                                    </div>
                                    `;
        var li = document.createElement('li');
        li.className = 'cus-li';
        li.innerHTML = template;
        cusList.appendChild(li);
    }

    /*获取课程*/
    ajax(
        url = 'http://study.163.com/webDev/couresByCategory.htm',
        data = {
            pageNo: currentPage,
            psize: sizeNum,
            type: typeNum
        },
        method = 'get',
        success = function (res) {
            result = JSON.parse(res);
            showAllCourse(result);
            setPage(result);
        },
        error = function (err) {
            alert('获取课程有误');
        });

    /*显示所有课程*/
    function showAllCourse(data) {
        cusList.innerHTML = '';
        //处理data
        /*console.log(data);*/
        for (var i = 0; i < data.list.length; i++) {
            var item = new mainCourse({
                id: data.list[i].id,
                title: data.list[i].name,
                default: '../imgs/picture2.jpg',
                middlePhotoUrl: data.list[i].middlePhotoUrl,
                smallPhotoUrl: data.list[i].smallPhotoUrl,
                provider: data.list[i].provider,
                learnerCount: data.list[i].learnerCount,
                price: data.list[i].price,
                categoryName: data.list[i].categoryName,
                description: data.list[i].description
            });
        }

        var curlis = getEleByClass('cus-li');
        for (var j = 0; j < curlis.length; j++) {
            addLister(curlis[j], 'mouseover', function () {
                var detail = getEleByClass('cus-detail', this)[0];
                detail.style.display = 'block';
            });
            addLister(curlis[j], 'mouseout', function () {
                var detail = getEleByClass('cus-detail', this)[0];
                detail.style.display = 'none';
            })
        }
    }

    /*对分页器进行处理*/
    function setPage(data) {
        var pageList = getEleByClass('page-list')[0];
        pageList.innerHTML = '';
        totalPage = data.totalPage;
        prePage = null;

        /*将页数插入到分页器中*/
        for (var i = 1; i <= totalPage; i++) {
            var li = document.createElement('li');
            li.innerText = i;
            pageList.appendChild(li);
            if (i == currentPage) {
                addClass(li, 'active');
            }
        }

        /*将页码的点击事件绑定在父元素上*/
        pageList.onclick = function (event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            if (target && target.nodeName == 'LI') {
                var preTarget = pageList.getElementsByTagName('li')[currentPage - 1];
                prePage = currentPage;
                currentPage = target.innerText;
                removeClass(preTarget, 'active');
                addClass(target, 'active');
                getCus(currentPage);
            }
        }
    }

    /*根据页码来请求课程*/
    function getCus(n) {
        ajax(
            url = 'http://study.163.com/webDev/couresByCategory.htm',
            data = {
                pageNo: n || 1,
                psize: sizeNum,
                type: typeNum
            },
            method = 'get',
            success = function (res) {
                result = JSON.parse(res);
                showAllCourse(result);
                setPage(result, n);
            },
            error = function (err) {
                alert('获取课程有误');
            });
    }

    var page = getEleByClass('page')[0];
    var prev = getEleByClass('prev', page)[0];
    var next = getEleByClass('next', page)[0];

    /*上一页*/
    addLister(prev, 'click', function () {
        if (currentPage > 1) {
            getCus(--currentPage);
        }
    });

    /*下一页*/
    addLister(next, 'click', function () {
        if (currentPage < totalPage) {
            getCus(++currentPage);
        }
    });
}

/*根据课程分类获取所有课程*/
function dePart(sizeNum) {
    /*在这里获取课程类型*/
    var productBtn = getEleByClass('category1')[0];
    var programBtn = getEleByClass('category2')[0];

    productBtn.onclick = function () {
        if (hasClass(programBtn, 'active')) {
            removeClass(programBtn, 'active');
            addClass(productBtn, 'active');
            allCourse(1, sizeNum, 10);
        }
    }

    programBtn.onclick = function () {
        if (hasClass(productBtn, 'active')) {
            addClass(programBtn, 'active');
            removeClass(productBtn, 'active');
            allCourse(1, sizeNum, 20);
        }
    }

    /*初始化*/
    allCourse(1, sizeNum, 10);
}

/*根据页面大小来确定一页显示的个数*/
function pageSize() {
    /*在这里获取单页显示个数*/
    var sizeNum = null;
    if (window.innerWidth >= 1205) {
        sizeNum = 20;
        dePart(20);
    } else {
        sizeNum = 15;
        dePart(15);
    }

    addLister(window, 'resize', function () {
        if (sizeNum == 15) {
            if (window.innerWidth >= 1205) {
                sizeNum = 20;
                dePart(20);
            }
        } else {
            if (window.innerWidth < 1205) {
                sizeNum = 15;
                dePart(15);
            }
        }
    });
}

/*将页面大小切换函数绑定到load中*/
addLoadEvent(pageSize);