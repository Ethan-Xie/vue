### 绑定
-  属性：class,id,value   :::v-bind:src="data1"
-   <img v-bind:src="src"> 推荐，简写：:src    <img src="{{src}}"> 效果能出来，但会报404
-   v-bind:class="data1"   :class
-     <strong :class="[color,color2]">测试……</strong>
-  <strong :class="{color:false}">测试……</strong>  color:false
-  color:true;color2:false    这个可以用json 来替换

-   v-bind:style="json"   :style  
-  a:{color:red}  :style="a"

==================
### 模版
```
    <script>
        window.onload=function(){
            new Vue({
                el:'#box',
                data:{
                    msg:'welcome vue',
                    msg2:12,
                    msg3:true,
                    arr:['apple','banana','orange','pear'],
                    json:{a:'apple',b:'banana',c:'orange'}
                }
            });
        };
    </script>
</head>
<body  >
        <div class="container"  id="box" > 
                <input type="text" v-model="msg">
                <input type="text" v-model="msg">
                  <br>
                {{msg}}
                <br>
                {{msg2}}
                <br>
                {{msg3}}

                <br>
                {{arr}}
                <br>
                {{json}}
        </div>
</body>
```
- {{msg}}  数据更新模版变化
- {{msg}}  数据一次  
- 2.x 对应于：v-once   <span v-once>This will never change: {{ msg }}</span>
- {{msg}}   自动转义  
```
在网站中动态渲染任意的 HTML 是非常危险的，因为这很容易导致网站受到 XSS 攻击。请只对可信内容使用 HTML 插值，绝对不要对用户提供的内容使用 HTML 插值。
```
- 2.x 对应于 <div v-html="rawHtml"></div>  v-html

### 过滤
- <span >{{msg | capitalize }}</span>
- <span >{{msg | filter | filter}}</span>    多个过滤器
- <span >{{msg | currency }}</span>   currency：钱 与uppercase  v2.x 没有

==================
### 交互
- $http (ajax)
- get: 获取一个普通文本数据
```
         get:function(){
                       //window.alert("hello");
                       this.$http.get('aa.txt').then(function(res){
                            console.log("true");
                           alert(res.data);
                       },function(res){
                            console.log("false");
                            alert(res.status);
                            console.log(res);
                       })
                   }
```
- post :
```
post:function(){
                    this.$http.post('test.php',{a:1},{emlateJSON:true}).then(function(res){
                            console.log("true");
                           console.log(res.data);
                           //console.log(res.data.a); //a
                           this.mydata.push(res.data.a)
                       },function(res){
                            console.log("false");
                            alert(res.status);
                            console.log(res);
                       })
                },
```
- jsonp: https://cdn.weather.hao.360.cn/sed_api_weather_info.php?code=101240701&param=pm25&v=1&app=hao360&_jsonp=__jsonp4__&t=2537151
- https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&json=1&p=3&sid=1428_21091_20697_22158&req=2&bs=vue%20%24http%20jsonp%20callback%20is%20not%20defined&pbs=vue%20%24http%20jsonp%20callback%20is%20not%20defined&csor=1&cb=jQuery110206764275602433492_1522283284322&_=1522283284394
- 遇到的错误：vue $http jsonp callback is not defined
```
 this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{wd:this.t1},{jsonp:"cb"}).then((response) => {
                            console.log("true");
                            //把它的值存起来
                            this.history=this.t1;
                            console.log(response.data.s);
                            var arr=response.data.s;
                            for(j = 0; j < arr.length; j++) {
                                this.mydata.push(arr[j]);
                                console.log(arr[j])
                            }
                        }, (response) => {
                            console.log(response.data); 
                                alert(response.status);
                                console.log(response);
                        });
```
### 其它用法：
```
this.$http({
                            url:'url',
                            data:'给后台提交的数据',
                            method:"",
                            jsonp:'cb'  //cnName
                        });
```
- 动态插入javascript
- document.write("<script src="https://code.jquery.com/jquery-1.10.2.min.js"><\/script>");
- <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>

 

### vue 生存周期
钩子函数：
created          ->  实例已经创建
beforeCompile   ->  编译之前 v2.x 废除  使用 created 钩子函数替代
compiled 替换    -> 编译之后， 使用 mounted 钩子函数替代。
ready            -> 插入到文档

destroyed        -> 销毁

如 mounted、updated 和 destroyed

- v-cloak 防止闪烁，比较大的段落  {{}}
- v-text="msg"  ==  <span>{{msg}}</span>    -->回忆一下 v-html 

 - 代码
 ```
     <script>
      window.onload=function(){
          //创建实例
        var c=new Vue({
               el:"#box",
               data:{
                   msg:"xie",
                   a:1,
                   //b:2
               },
               computed:{
                    b:function(){
                        //业务逻辑
                        return this.a;
                    },
                    c:{
                        get:function() {
                            
                        },
                        set:function(res){
                                this.a=res;
                        }
                    }
               },
               methods:{
                   get:function(){
                      window.alert("hello");
                       
                   }
               },
               created: function() {
                   console.log("编译之前");
               },
               mounted:function(){
                   console.log('编译之后');

                   this.$nextTick(function () {
                    // 代码保证 this.$el 在 document 中
                    console.log("ready");
                })
               },
               //2.x 已经废除  以上替代
               ready:function(){
                   console.log('ready^');
                     
               },
               destroyed:function(){
                   console.log("销毁")
               },
               aa:11
      });
        document.onclick=function(){
           // c.$destroy() ;//显示 销毁
           c.a=110;
        }

        //小元素：
        console.log(c.$el);
        c.$el.style.background = 'green';
        //data
        console.log(c.$data);// data 数据对象
        //自定义属性
        //值
        console.log(c.$options.aa);
        //方法
         console.log(c.$options.show());
        //c.$destroy() ;//显示 销毁
        
        //现在数据的状态
        console.log(c.$log());//请使用 Vue Devtools 感受最佳debug体验。

      }
    </script>
</head>
<body>
    <div class="container" id="box" v-cloak>
       <input type="button" v-bind:value="msg" @click="get()"> 

       <span v-text="msg"></span>
       <div>a=>{{a}} <br/>b=>{{b}}
        </div>
```

 - ng : $scopt.$watch 
 - 计算属性的使用：  computed
```
computed:{
                    b:function(){
                        //业务逻辑  注意return
                        return this.a;
                    },
                    c:{
                        get:function() {
                            
                        },
                        set:function(res){
                                this.a=res;
                        }
                    }
               },


               document.onclick=function(){
                    // c.$destroy() ;//显示 销毁
                    c.a=110;
                    }
```

### 自带小元素（vue实例简单方法）
- vm.$el  ->  就是元素
- vm.$data  ->  就是data

- 手动挂载：vm.$mount('#box'); //手动挂载  
//小元素：
        console.log(c.$el);
        c.$el.style.background = 'green';
        //data
        console.log(c.$data);// data 数据对象
        //自定义属性
        //值
        console.log(c.$options.aa);
        //方法
         console.log(c.$options.show());
        //c.$destroy() ;//显示 销毁
        
        //现在数据的状态
        console.log(c.$log());//请使用 Vue Devtools 感受最佳debug体验。

### 循环
- v-for="(index ,value) in data"
- 重复数据  track-by="index"
- <div v-for="item in items" v-bind:key="item.id">  ---2.x

### 过滤器
- limitBy
```
computed: {
                   // | limitBy 2    2.x代替
                    filteredItems: function () {
                        return this.arr.slice(0, 1)
                    }
                }
      });
```
- filterBy
```
<p v-for="user in users | filterBy searchQuery in 'name'">{{ user.name }}</p>
在 computed 属性中使用js内置方法 .filter method：
<p v-for="user in filteredUsers">{{ user.name }}</p>
computed: {
  filteredUsers: function () {
    var self = this
    return self.users.filter(function (user) {
      return user.name.indexOf(self.searchQuery) !== -1
    })
  }
}
```

- orderBy
``` 
 orderedUsers: function () {
                        return _.orderBy(this.arr, -1) //'name'  1:倒序  -1：顺序
                    }
```

- 自定义过滤器 model -->  view
```
        //自定义过滤器
          Vue.filter('toDou',function(input){
              alert(input);
          })
```

- 双向过滤器:指的是：model -> view  view -> model
- 1.x  https://jsfiddle.net/chrisvfritz/1oqjojjx/?utm_source=website&utm_medium=embed&utm_campaign=1oqjojjx
- 2.x:https://jsfiddle.net/chrisvfritz/1oqjojjx/?utm_source=website&utm_medium=embed&utm_campaign=1oqjojjx


### 指令、
- v-for v-text v-html

- 自定义指令
```
//全局 注册一个名为 `v-focus` 的全局自定义指令
Vue.directive('focus', {
  // 当绑定的元素插入到 DOM 时调用此函数……
  inserted: function (el) {
    // 元素调用 focus 获取焦点
    el.focus()
  }
})
```

```
// 局部变量
directives: {
  focus: {
    // 指令定义对象
    inserted: function (el) {
      el.focus()
    }
  }
}
```
- 示例
```
    <script src="vue.js"></script>
    <script src="./lib/vue-resource.js"></script>
    <script>
            //定义指令
            Vue.directive('red',
            {
                inserted: function (el) {
                    // 元素调用 focus 获取焦点
                   // el.focus()
                   el.style.background = 'green';
                }
            }
            /*
            function(){
              //this.el.style.background = 'green';
          }
          */);
          Vue.directive('drag',
            {
                inserted: function (el) {
                    // 元素调用 focus 获取焦点  
                   el.onmousedown = function(el){
                       var now=el;
                       var disX=el.clientX-el.offsetLeft;
                       var disY=el.clientY-el.offsetTop;

                       document.onmousemove=function(el2){
                           var l=el2.clientY-disX;
                           var t=el2.clientY-disY;
                            now.style.left=l+'px';
                            now.style.top=t+'px';
                       };
                       document.onmouseup=function(){
                           document.onmousemove=null;
                           document.onmouseup=null;
                       }
                   }
                }
            } );
      window.onload=function(){ 
        var c=new Vue({
               el:"#box",
               data:{
                    a:"hello",
                    b:"drag"
               },
               methods:{
                   get:function(){
                      window.alert("hello");
                       
                   }
               }
      });
      }
    </script>
</head>
<body>
    <div class="container" id="box">
       <input type="button" value="按钮" @click="get()">
       <span v-text="a" v-red></span><br>
       <div v-text="b" v-drag style="width:100px;heigh:100px;background:green;position:absolute;right:0;top:0" v-drag></div>
    </div>
    <script src="./lib/jquery-1.7.2.js"></script>
    <script src="./lib/bootstrap.js"></script>
</body>
</html>
```
### 自定义，元素指令
- 用处不大，了解一下
```
    //自定义元素过滤器(标签) 1. x
          /*
            Vue.elementDirective('xieTest',{
                bind:function(){
                    this.el.style.background='red';
                }
            });
          */

          // 定义
            var MyComponent = Vue.extend({
            template: '<div>A custom component!</div>'
            })

            // 注册
            Vue.component('my-component', MyComponent);
```

## @keydown.up  @keydown.enter 
- keydown.a/b/c/d
问题就是,ctrl
```
docment.onkeydown=function(ev){
    console.log(ev.keyCode);//17
}
```
-  ctrl的指定为：keydown.17

```
        //自定义键盘信息  1.x
       // Vue.directive('on').keyCodes.myenter=17;
        //  2.x
        // v-on:keyup.f1 不可用
        Vue.config.keyCodes.myenter = 17;
```

## 数据监听变化
- 1.x
vm.$el/$mount/$options/...
vm.$watch(name,fnCb)

- 深度  
vm.$watch(name,fnCb,{deep:true})

a:{name:'hello',age:16}
vm.a.name='aaa'
```

      c.$watch('a',function(){
       // window.alert('发生了变化');
            this.a=this.a+100;
            return false;
        })

      document.onclick=function(){
          c.a=1;
      }
```

===================4.9===============================
- 引入 vue.js
- bower -> () 包管理器 npm
    npm install bower -g
    验证：bower --version
    


### vue -->  过渡（动画） 
本质上是css3：transtion ,animation
#### 1.x
<div id="div1" v-show="bsign" transition="fade" ></div>

style:
 .fade-transition{
     transition:1s all ease;
 }
 .fade-enter{
     opacity:0;
 }
  .fade-leave{
       opacity:0;
       transform:translateX(200px);
  }
- 动画：
.fade-transition{

}
- 进入 
- 离开

#### 2.x
```
    <div id="demo">
    <button v-on:click="show = !show">
        Toggle
    </button>
    <transition name="fade">
        <p v-if="show">hello</p>
    </transition>
    </div>
    new Vue({
    el: '#demo',
    data: {
        show: true
    }
    })
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */
     {
    opacity: 0;
    }
```

###  animate ---> <!-- 控制数据的值切换显示隐藏 -->
使用方法
```
    <button @click="show=!show">transition</button>
    <!-- 第一种方法 -->
    <!-- <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
    <p v-show="show" class="animated"></p>
    </transition> -->

    <!-- 第二种方法 -->
    <!-- <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
    <p v-show="show"></p>
    </transition> -->

    <!-- 多元素运动 -->
    <transition-group enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
    <p v-show="show" class="animated" :key="1"></p>
    <p v-show="show" class="animated" :key="2"></p>
    </transition-group>

```

## 组件
     Vue.component('vuehead',vuehead);
