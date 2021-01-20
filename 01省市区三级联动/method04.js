/**
 * 城市三级联动以及联合获取地区行政编码
 */
const prov_number = document.getElementById('prov-number');
const city_number = document.getElementById('city-number');
const country_number = document.getElementById('country-number');
const addr_show_number = document.getElementById('addr-show-number')
const btn_number = document.getElementsByClassName('met04')[0];
/*用于保存当前所选的省市区名字*/
let current04 = {
    prov_number: '',
    city_number: '',
    country_number: ''
};


/*自动加载省份列表*/
(function showProv04() {
    btn_number.disabled = true;
    for (let key in cityList) {
        let provOpt = document.createElement('option');
        provOpt.innerText = provOpt.value = key;
        prov_number.appendChild(provOpt);
    }
})();

/*根据所选的省份来显示城市列表*/
function showCity04(obj) {
    let val = obj.options[obj.selectedIndex].value;
    if (val != current04.prov_number) {
        current04.prov_number = val;
        addr_show_number.innerHTML = addr_show_number.value = '';
        btn_number.disabled = true;
        city_number.length = 1;
        country_number.length = 1;
    }

    if (val != '') {
        for (let key in cityList[current04.prov_number]['city']) {
            let cityOpt = document.createElement('option');
            cityOpt.innerText = cityOpt.value = key;
            city_number.appendChild(cityOpt);
        }
    }
}

/*根据所选的城市来显示县区列表*/
function showCountry04(obj) {
    let val = obj.options[obj.selectedIndex].value;
    if (val != current04.city_number) {
        current04.city_number = val;
        addr_show_number.innerHTML = addr_show_number.value = '';
        country_number.length = 1; //清空之前的内容只留第一个默认选项
        btn_number.disabled = true;
    }
    if (val != '') {
        for (const key in cityList[current04.prov_number]['city'][current04.city_number]['country']) {
            const countryOpt = document.createElement('option');
            countryOpt.innerText = countryOpt.value = key
            country_number.appendChild(countryOpt);
        }
    }
}

/*选择县区之后的处理函数*/
function selecCountry04(obj) {
    current04.country_number = obj.options[obj.selectedIndex].value;
    if (current04.prov_number != '' && current04.city_number != '' && current04.country_number != '') {
        btn_number.disabled = false;
    }
}
/*点击确定按钮显示用户所选的地址*/
function showAddr04() {
    addr_show_number.value = current04.prov_number + '-' + current04.city_number + '-' + current04.country_number + '-' + cityList[current04.prov_number]['city'][current04.city_number]['country'][current04.country_number]['code'];
}