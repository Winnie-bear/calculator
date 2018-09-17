window.onload=function(){
  var keyBoard=document.getElementsByTagName('button'),//获取键盘元素
      expression=document.getElementById('expression'),//显示表达式的元素
      res=document.getElementById('res'),//显示结果的元素
      exp='';//保存转化之后的表达式
      keyVal='';
      operator=false,//是否点击过操作符的标志
      dotFlag=false;//是否点击过小数点的标志

  //用正则表达式表示运算式
  var regExp=/^\-?\d*(\.?\d{0,5})([\+\-\*\/\%]\d+(\.?\d{0,5}))+$/;

   //点击键盘按钮
   for(let i=0;i<keyBoard.length;i++)
   {
       keyBoard[i].onclick=()=>{
           keyVal=keyBoard[i].innerText;//记录当前点击的值
           clickInput(keyVal);
       }
   }
   //计算表达式
   var evil=(exp)=>{
       var Fn=Function;
       res.setAttribute('class','font final-res1');
       return new Fn(`return ${exp}`)();//创建了一个函数并立即执行，并把执行结果返回
   }

   //当表达式要溢出屏幕时，调整字体大小
   var adjustSize=(exp)=>{
       let firLen=expression.offsetWidth/24;
       let secLen=expression.offsetWidth/16;
       if(exp.length>firLen&&exp.length<secLen){ 
           expression.setAttribute('class','exp-font1 font');
       }else if(exp.length>secLen){ 
           expression.setAttribute('class','exp-font2 font');
       }      
   }
   //处理表达式
   var processExp=(keyVal)=>{
      if(!isNaN(keyVal)){
        //输入的是数字
        expression.innerHTML+=keyVal;
        operator=false;
      }else if(keyVal==='.'&&!dotFlag){
          dotFlag=true;
          expression.innerHTML+=keyVal;
      }else if(/[\+\-\×\÷\%]/.test(keyVal)&&!operator){
          operator=true;
          dotFlag=false;
          expression.innerHTML+=keyVal;
      }else if(keyVal==='='){
          dotFlag=operator=false;
      }  
      return expression.innerHTML;
   }
   /**
    * 点击键盘进行输入
    * @param {string} keyVal 输入的内容
    */
   var clickInput=(keyVal)=>{  
     res.setAttribute('class','font final-res');   
     exp=processExp(keyVal).replace(/×/g,'*').replace(/÷/g,'/');
     if(regExp.test(exp)&&keyVal!=='='&&keyVal!=='AC'&&keyVal!=='←'){
       res.innerHTML=evil(exp);
     }else if(keyVal==='='){
       expression.innerHTML=evil(exp);
       res.innerHTML='0';
     }else if(keyVal==='AC'){
       exp=expression.innerHTML='';
       res.innerHTML='0';
     }else if(keyVal==='←'){
        expression.innerHTML=expression.innerHTML.slice(0,-1);
        exp=exp.slice(0,-1);
        if(regExp.test(exp)){
          res.innerHTML=evil(exp);
        }else if(exp===''){
          expression.innerHTML='';
          res.innerHTML='0';
        }
     } 
     adjustSize(expression.innerHTML);
   }
}