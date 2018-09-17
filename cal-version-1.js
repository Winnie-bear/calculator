window.onload=function(){
    /* querySelector() 方法仅仅返回匹配指定选择器的第一个元素。
    如果你需要返回所有的元素，请使用 querySelectorAll() 方法替代。 */

    var keyBoard=document.getElementsByTagName('button'),//获取键盘元素
        expression=document.getElementById('expression'),//显示表达式的元素
        res=document.getElementById('res'),//显示结果的元素
        expArr=[],//用来保存每一次完整的表达式
        keyVal='',//当前按键的值
        preKey='',//上一次按键的值
        exp='',//当前需要计算的表达式
        operator=false,//是否点击过操作符的标志
        equal=false,//是否点击过等号的标志
        dotFlag=false;//是否点击过小数点的标志
    //操作符
    var operators={
    "+":"+",
    "-":"-",
    "×":"*",
    "÷":"/",
    "%":"%",
    };
   
    //点击键盘按钮
    for(let i=0;i<keyBoard.length;i++)
    {
        keyBoard[i].onclick=()=>{
            keyVal=keyBoard[i].innerText;//记录当前点击的值
            clickInput(keyVal);
        }
    }
    //匹配操作符
    var matchOperator=(exp)=>{
      let reg=/[\%\+\*\/\-]/;
      return  exp.search(reg)!="-1";
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
    /**
     * 点击键盘进行输入
     * @param {string} keyVal 输入的内容
     */
    var clickInput=(keyVal)=>{  
      res.setAttribute('class','font final-res')
      if(!isNaN(keyVal)){     
      //输入的是数字
        operator=false;
        if(!equal){
            //没有点击过等号或者新一轮的操作
            expression.innerHTML+=keyVal;
            exp+=keyVal;
        }else{
            //上一步是等于操作，屏幕上表达式处显示结算结果，如果此时点击数字，则表达式置空，进行新一轮运算
            equal=false;//重新进行输入运算时，应将等号标识取反，才能拼接表达式
            expArr=[];
            expression.innerHTML=keyVal;
            exp=keyVal;
            res.innerHTML="0";
        }
        console.log(exp);
        if(matchOperator(exp))
        {//如果表达式中有操作符，则实时更新计算
            expArr[expArr.length]=exp;//存下当前表达式
            console.log(expArr);
            res.innerHTML=evil(exp);
        }       

      }else if(keyVal==='.'){
          //输入的是小数点
          operator=false;
          if(!dotFlag&&!equal){
            //新一轮操作
              if(preKey===''||matchOperator(preKey))
              {
                keyVal="0.";
              }
              dotFlag=true;//记录下点击小数点的操作
              expression.innerHTML+=keyVal;
              exp+=keyVal;
          }else if(equal){
            //之前有等于操作
            expArr=[];//表达式置空，进行新一轮运算
            equal=false;//新一轮运算中，等于操作不存在
            keyVal="0."
            expression.innerHTML=keyVal;
            exp=keyVal;
          }else{
              return false;
          }
      }else if(keyVal==='AC'){
          //输入全清键
          expression.innerHTML='';
          res.innerHTML='0'
          expArr=[];
          exp='';
      }else if(keyVal==='←'){
          //输入删除最后一位键
          expression.innerHTML=expression.innerHTML.slice(0,-1);//删除最后一位
          if(expArr[expArr.length-1]){
            expArr[expArr.length-1]=expArr[expArr.length-1].slice(0,-1);
            exp=exp.slice(0,-1);
            let lastChar=expArr[expArr.length-1].slice(-1);
            console.log(matchOperator(lastChar));
            if(!matchOperator(lastChar)&&matchOperator(expArr[expArr.length-1]))
            {//最后一个字符不是操作符并且表达式中有操作符时，实时计算
                  operator=false;//可以继续输入操作符
                  res.innerHTML=evil(exp);              
            }else if(lastChar===''){
                //表达式为空时
                res.innerHTML='0';
            }else{
                //最后一个字符是操作符时，去掉最后一个字符重新计算
                operator=true;//不可继续输入操作符
                console.log(exp.slice(0,-1));
                res.innerHTML=evil(exp.slice(0,-1))||exp;
            }
          }else{
            exp=exp.slice(0,-1);
          }
          
      }else{
      //输入的是操作符
        if(keyVal!=="="&&!operator){
            //操作符不为等号
            dotFlag=false;
            equal=false;//等于操作以后，再点击操作符，进行新一轮运算
            operator=true;
            expression.innerHTML+=keyVal;
            if(expArr[expArr.length-1]){
               exp=expArr[expArr.length-1]+operators[keyVal];//更新需要计算的表达式
            }else{
               //第一次输入完整的表达式
               exp=expression.innerHTML.replace(expression.innerHTML.slice(-1),operators[keyVal]); 
            }                
        }
        else if(keyVal==="="){
            //操作符为等号
            equal=true;
            expression.innerHTML=evil(expArr[expArr.length-1]);
            res.innerHTML="0";
            expArr=[];//计算完成之后要清空数组
            exp=evil(expArr[expArr.length-1]);//保存计算结果，方便下次使用
        }
      }  
        preKey=keyVal;
        adjustSize(expression.innerHTML);
    }
}


