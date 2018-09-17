## 前言
一个用html+css+原生js编写的计算器Demo,最值得一提的是，JS部分我写了两个版本的代码，version-1判断语句较多，但胜在逻辑清楚，version-2较之前的版本，用到了正则表达式，减少了大量判断语句和代码，是上一版代码的优化，胜在简洁清晰。

## 实现功能
1.基本运算

2.当表达式要溢出屏幕时，运用CSS3 transition属性改变字体大小

3.全清和删除当前表达式最后一个字符

## 注意
1.一个操作数中至多只允许出现一个小数点

2.操作符和小数点可以连续点击，但在屏幕上只能出现一次

3.×和÷在计算时需要转化为*和/，否则无法计算

4.精度丢失需要好好处理

5.eval函数尽量不要用，可以改写

## 缺陷
浮点数计算导致结果精度丢失的问题还未解决

## demo效果
[计算器](https://htmlpreview.github.io/?https://github.com/Winnie-bear/calculator/blob/master/cal.html)

### *温馨提示*
实现原理，我就不详细写了，全在代码注释里面哦~

