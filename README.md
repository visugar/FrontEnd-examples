## FrontEnd-examples

# 随便写写的小栗子

#### 01.省市区三级联动的三种实现的方式（原生js实现）
+ 方式一：使用select的onchange事件及selectedIndex属性来完成，其中省市区（县）数据是在网上找的，不能保证真实性
+ 方式二：按级选中省市区
+ 方式三：此方法不属于联动，而是根据字母顺序来直接选中城市名称，使用的城市数据也是从网上找的，不能保证真实性

> [源码地址](https://github.com/visugar/FrontEnd-examples/blob/master/01%E7%9C%81%E5%B8%82%E5%8C%BA%E4%B8%89%E7%BA%A7%E8%81%94%E5%8A%A8/index.html)

> [预览地址](https://visugar.github.io/FrontEnd-examples/01省市区三级联动/index.html)

#### 02. select表单详解及下拉列表模拟实现
+ 介绍了select的一些属性
+ 自定义select下拉按钮图标
+ 原生js模拟select下拉列表的实现

> [源码地址](https://github.com/visugar/FrontEnd-examples/blob/master/02%E6%A8%A1%E6%8B%9Fselect%E4%B8%8B%E6%8B%89%E5%88%97%E8%A1%A8/index.html)

> [预览地址](https://visugar.github.io/FrontEnd-examples/02模拟select下拉列表/index.html)

#### 03. 随机生成字母数字验证码
+ 随机生成一串长度为4的字符串，作为随机验证码，然后跟用户输入的验证码进行判断是否一致。

> [源码地址](https://github.com/visugar/FrontEnd-examples/blob/master/03%E9%9A%8F%E6%9C%BA%E7%94%9F%E6%88%90%E5%AD%97%E6%AF%8D%E6%95%B0%E5%AD%97%E9%AA%8C%E8%AF%81%E7%A0%81/index.html)

> [预览地址](https://visugar.github.io/FrontEnd-examples/03随机生成字母数字验证码/index.html)

#### 04. angular4实现简易在线音乐播放
+ 采用简易的观察者模式实现简易在线音乐播放
+ 使用angular-cli创建的项目结构
+ 数据来源：[易源数据](https://www.showapi.com/api/lookPoint/213/1)

> [源码地址及使用方式](https://github.com/visugar/FrontEnd-examples/tree/master/04music-player)

#### 05. 快速排序的js实现
+ 根据[百度百科](http://baike.baidu.com/link?url=QJlzwEL6VTeZxD3YDkj-0oXgRewHf_sBeBif-L2wLiTsw0jdLOKjwHr9JSc3dGFfn20VAwhUnHivAAcGjIIOihk6U--M7l0ZtuNk_2IsaeCOF91fvkCELbpLB0DMpZSSc-EBw1k-xh5FiwzZNVv73iV3Ukvn74HdqABbcMRs0YN6N5KwX_Xnlf08yeNdhi-i81R40WEYjzqKFkVIpkJb3awxUDONlkM5MIVYNJR7Qnq)中快速排序算法的原理完成js的实现。

> [源码地址](https://github.com/visugar/FrontEnd-examples/blob/master/05%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F%E5%AE%9E%E7%8E%B0/index.html)

> [预览地址](https://visugar.github.io/FrontEnd-examples/05快速排序实现/index.html)

#### 06. 音乐可视化
+ 摸索中……

#### 07. 图片懒加载
+ 注：我的图片体积较大，在线预览效果不是很好，直接预览demo打开network可以看到是出现在浏览器窗口中才加载，其中用到了一个较少人知道的`getBoundingClientRect()`方法来获取元素边缘距浏览器顶部及左部的距离。[详见MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

> [源码地址](https://github.com/visugar/FrontEnd-examples/blob/master/07lazyLoading/index.html)

> [预览地址](https://visugar.github.io/FrontEnd-examples/07lazyLoading/index.html)

#### 08. HTML5拖放API小栗子
+ 使用html5中的拖放API实现网页中元素拖拽及本地资源显示在网页中等小栗子，具体原理请移步至[详解](http://www.jianshu.com/p/b7762be74511)

> [源码地址](https://github.com/visugar/FrontEnd-examples/blob/master/08H5%E6%8B%96%E6%94%BEAPI/index.html)

> [预览地址1](https://visugar.github.io/FrontEnd-examples/08H5%E6%8B%96%E6%94%BEAPI/index.html)

> [预览地址2](https://visugar.github.io/FrontEnd-examples/08H5%E6%8B%96%E6%94%BEAPI/drag01.html)

> [预览地址3](https://visugar.github.io/FrontEnd-examples/08H5%E6%8B%96%E6%94%BEAPI/drag02.html)