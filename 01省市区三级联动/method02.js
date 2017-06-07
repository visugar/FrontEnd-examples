//****************针对第二种方式的具体js实现部分******************//
//****************所使用的数据是city.js******************//

var addrShow02 = $('addr-show02');  //最终地址显示框
var titleWrap = $('title-wrap').getElementsByTagName('LI');
var addrWrap = $('addr-wrap');   //省市区显示模块
var btn2 = document.getElementsByClassName('met2')[0];  //确定按钮

var current2 = {
    prov: '',
    city: '',
    country: '',
    provVal: '',
    cityVal: '',
    countryVal: ''
};

/*自动加载省份列表*/
window.onload = showProv2();

function showProv2() {
    addrWrap.innerHTML = '';
    /*addrShow02.value = '';*/
    btn2.disabled = true;
    titleWrap[0].className = 'titleSel';
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provLi = document.createElement('li');
        provLi.innerText = provice[i]['name'];
        provLi.index = i;
        addrWrap.appendChild(provLi);
    }
}

/*************************需要给动态生成的li绑定点击事件********************** */
addrWrap.onclick = function (e) {
    var n;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target && target.nodeName == 'LI') {
        /*先判断当前显示区域显示的是省市区的那部分*/
        for (var z = 0; z < 3; z++) {
            if (titleWrap[z].className == 'titleSel')
                n = z;
        }
        /*显示的处理函数*/
        switch (n) {
            case 0:
                showCity2(target.index);
                break;
            case 1:
                showCountry2(target.index);
                break;
            case 2:
                selectCountry(target.index);
                break;
            default:
                showProv2();
        }
    }
};

/*选择省份之后显示该省下所有城市*/
function showCity2(index) {
    addrWrap.innerHTML = '';
    current2.prov = index;
    current2.provVal = provice[index].name;
    titleWrap[0].className = '';
    titleWrap[1].className = 'titleSel';
    var cityLen = provice[index].city.length;
    for (var j = 0; j < cityLen; j++) {
        var cityLi = document.createElement('li');
        cityLi.innerText = provice[index].city[j].name;
        cityLi.index = j;
        addrWrap.appendChild(cityLi);
    }
}

/*选择城市之后显示该城市下所有县区*/
function showCountry2(index) {
    addrWrap.innerHTML = '';
    current2.city = index;
    current2.cityVal = provice[current2.prov].city[index].name;
    titleWrap[1].className = '';
    titleWrap[2].className = 'titleSel';
    var countryLen = provice[current2.prov].city[index].districtAndCounty.length;
    if (countryLen == 0) {
        addrShow02.value = current2.provVal + '-' + current2.cityVal;
    }
    for (var k = 0; k < countryLen; k++) {
        var cityLi = document.createElement('li');
        cityLi.innerText = provice[current2.prov].city[index].districtAndCounty[k];
        cityLi.index = k;
        addrWrap.appendChild(cityLi);
    }
}

/*选中具体的县区*/
function selectCountry(index) {
    btn2.disabled = false;
    current2.country = index;
    addrWrap.getElementsByTagName('li')[index].style.backgroundColor = '#23B7E5';
    current2.countryVal = provice[current2.prov].city[current2.city].districtAndCounty[index];
}

/*点击确定后恢复成初始状态，且将所选地点显示在输入框中*/
btn2.onclick = function () {
    addrShow02.value = current2.provVal + ' ' + current2.cityVal + ' ' + current2.countryVal;
    addrWrap.getElementsByTagName('li')[current2.country].style.backgroundColor = '';
};

/*分别点击省市区标题的处理函数*/
document.getElementById('title-wrap').onclick = function (e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target && target.nodeName == 'LI') {
        for (var z = 0; z < 3; z++) {
            titleWrap[z].className = '';
        }
        target.className = 'titleSel';
        if (target.value == '0') {
            showProv2();
        } else if (target.value == '1') {
            showCity2(current2.prov);
        } else {
            showCountry2(current2.city);
        }
    }
};