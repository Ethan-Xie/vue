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
- 2.x 好多过滤器废除。lodash工具库
limitBy filterBy
Vue.filter('toDou',function(n){
    return n<10? '1':'2';
})
{{msg | toDou('12','5')}}  //参数使用
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
ready            -> 插入到文档，mounted 替换。

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
               beforeCreate:function(){
                   console.log("实例刚刚创建");
               },
               created: function() {
                   console.log("编译之前");//实例创建完成。
               },
               beforeMount:function(){
                console.log('模版编译之前');
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
               beforeDestroyed:function(){
                   console.log("销毁")
               },
               destroyed:function(){
                   console.log("销毁")
               },
               beforeUpdate:function(){
                    console.log("组件更新之前")
               },
               updated:function(){
                    console.log("组件更新之后")
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
 <span v-for="(value,key,index) in json"><br>
            {{index}}.{{key}}.{{value}}
        </span> 
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
        Vue.config.keyCodes.ctrl = 17;
        //
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

animate  使用
```
    <script>
        window.onload=function(){
            new Vue({
                el:'#box',
                data:{
                    show:'',
                    list:['apple','banana','orange','pear']
                },
                computed:{
                    lists:function(){
                        var arr=[];
                        this.list.forEach(function(val){
                            if(val.indexOf(this.show)!=-1){
                                arr.push(val);
                            }
                        }.bind(this));
                        return arr;
                    }
                }
            });
        };
    </script>
</head>
<body>
    <div id="box">
        <input type="text" v-model="show">

        <transition-group enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
            <p v-show="show" class="animated" v-for="(val,index) in lists" :key="index">
                {{val}}
            </p>
        </transition-group>
    </div>
</body>
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
```
    <link rel="stylesheet" href="./lib/bootstrap.min.css">
    <script src="vue.js"></script>
    <script src="./lib/vue-resource.js"></script>
    <script>

        //!!组件的一种方式(全局组件)  hello vue
        var vuehead=Vue.extend({
            /* 必须写成函数，重点！！！
            data:{
                test:"我是vuehead.data的test值"
            },
            */
            data(){
               return {
                   test:"我是vuehead.data的test值"
               } 
            },  
            methods: {
                change(){
                    alert(1);
                }
            },
            template:"<h3 @click='change()'>{{test}}</h3>"
        });
        //console.log(header);
        Vue.component('vuehead',vuehead);

        //!!第二种方式
        Vue.component('vueheads',{
            template:'<h3>我是标题</h3>'
        });


        //！！！ 局部声明：
        var vuescope=Vue.extend({ 
            template:"<h3  >我是局部</h3>"
        });
      window.onload=function(){ 
            var c=new Vue({
                el:"#box",
                data:{
                    test:"我是c.data的test值"
                },
                methods:{
                    get:function(){
                        window.alert("hello");
                        
                    }
                },
                /*
                components: {
                    //局部组件
                    'scope':vuescope
                },*/
                //第二种方式：
                components:{
                    'my-aaa':{
                        template:"<h3>我是第二种方式的，局部</h3>"
                    }
                }
        });     
      }
    </script>
</head>
<body>
    <div class="container" id="box">
       <input type="button" value="按钮" @click="get()">
       <vueHead></vueHead>
       <vueheads></vueheads>
       <scope></scope>
       <my-aaa></my-aaa>
    </div>
    <script src="./lib/jquery-1.7.2.js"></script>
    <script src="./lib/bootstrap.js"></script>
</body>
```

## 模版
1.单独放在某个地方：template:' <h1 @click="change()">我是template 的标题+{{test}} </h1>'
2.
```
<template id="aaa">
        <h1 @click="change()">我是template 的标题+{{test}} </h1>
        <ul>
            <li></li>
        </ul>
    </template>

    <script type="x-template"  id="bbb">
                <h1 @click="change()">我是template 的标题+{{test}} </h1>
        <ul>
            <li></li>
        </ul>
    </script>

    <script>  
      window.onload=function(){ 
            var c=new Vue({
                el:"#box",
                data:{
                    test:"我是c.data的test值"
                },
                methods:{
                    get:function(){
                        window.alert("hello");
                    }
                },
                components: {
                    'my-data':{
                            data(){
                                return {
                                    test:"我是 .data的test值",
                                    arr:['apple','banana','orange']
                                } 
                            },  
                            methods: {
                                change(){
                                    alert(1);
                                }
                            },
                            template:'#bbb'
                    }
                }
                
        });     
      }
    </script>
```

- 动态组件
 <component :is="组件名称"></component>


- 父子主键

```
<body>
    <div class="container" id="box">
        <!--  运用template 将会覆盖全部数据  -->
        <my-data>
            
        </my-data>
       <input type="button" value="按钮" @click="get()">
    </div>
    <script src="./lib/jquery-1.7.2.js"></script>
    <script src="./lib/bootstrap.js"></script>

    <script>  
      window.onload=function(){ 
            var c=new Vue({
                el:"#box",
                data:{
                    test:"我是c.data的test值"
                },
                methods:{
                    get:function(){
                        window.alert("hello");
                    }
                },
                components: {
                    'my-data':{
                        //Component template should contain exactly one root element
                        //只能有一个根元素
                        //这样在2.x 中 template:"<h3>我是my-data</h3><bb></bb>",
                        data:function(){
                            return{
                                msg:'xiethan'
                            } 
                        },
                        template:"<h3>我是my-data{{msg}}<bb></bb></h3>",
                            components: {
                                    'bb':{ 
                                               template:"<h3>我是my-bb</h3>"
                                            }
                            }
                    }
                }
                
        });     
      }
    </script>
</body>
</html>
<!-- 
var allComps = {};
allComps['CompB'] = {
  name: 'comp-b',
  props: ['level'],
  template: `<div>
    B{{level}}
    <div v-if="level<11111">
      <comp-a :level="level+1"></comp-a>
    </div>
  </div>`,
  components: allComps

};
allComps['CompA'] = {
  name: 'comp-a',
  props: ['level'],
  template: `<div>
    A{{level}}
    <div v-if="level<11111">
      <comp-b :level="level+1"></comp-b>
    </div>
  </div>`,
  components: allComps
};
allComps['App'] = {
  template: '<div>Start<comp-a level="1"></comp-a></div>',
  components: allComps
};

var app = new Vue({
  el: '#app',
  components: allComps
});

 -->
 ```
### 动画：
  .fade-enter{}   //初始状态
  .fade-enter-active{} //变化成什么样 -> 当元素出来的时候

  .fade-leave{}  
  .fade-leave-active{} //变化成什么样 -> 当元素消失/离开 的时候
```
    @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" 
        <div class="container" id="box">
       <input type="button" value="点击显示隐藏" @click="show=!show">
       <transition  enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">
            <p v-show="show" class="animated"></p>
       </transition>
    </div>
```
### 数据通信
- 子元素获取父组件 数据
通过属性，传递
```
<script type="x-template"  id="bbb">
            <h3>2我是my-data{{msg}}
                <bb :m="msg" :my-msg="msg"></bb>
            </h3>
        </script>
    <script>  
      window.onload=function(){ 
            var c=new Vue({
                el:"#box",
                data:{
                    test:"我是c.data的test值"
                },
                methods:{
                    get:function(){
                        window.alert("hello");
                    }
                },
                components: {
                    'my-data':{
                        //Component template should contain exactly one root element
                        //只能有一个根元素
                        //这样在2.x 中 template:"<h3>我是my-data</h3><bb></bb>",
                        data:function(){
                            return{
                                msg:'我是my-data的msg值'
                            } 
                        },
                        //template:"<h3>我是my-data{{msg}}<bb :m={{msg}}></bb></h3>",
                        template:"#bbb",
                            components: {
                                    'bb':{ 
                                            props: ['m',"myMsg"],
                                            //{ 'm':String   //Array  Number这样可以指定传入的类型，如果类型不对，会警告
                                           // default: [0,0,0] //这样可以指定默认的值 }, 
                                               template:"<h3>---{{m}}--我是my-bb</h3>"
                                            }
                            }
                    }
                }
                
        });     
      }
    </script>
</body>
```

- 父元素获取子组件 数据
子组件把自己的数据，发送到父级
vm.$emit(事件名，数据)
v-on:  @
```
methods:{
            send:function(){
                //获取子元素数据 
                this.$emit('child_msg',this.a);
            }
        },

     <h3 >2我是my-data{{msg}}
                <bb :m="msg" :my-msg="msg" @child_msg='get'></bb>
     </h3>
  
     methods:{
                            get(msg){
                                //获取子元素数据 
                               //console.log('值：'+msg);
                                this.msg=msg;
                            }
            },
```

- 其它方式：
vm.$dispatch(事件名，数据)        子级向父级发送数据
vm.$broadcast(事件名，数据)       父级向子级广播数据

在vue 2.x 已经废除。



- slot 的使用：
<slot>slot:</slot>


### 路由
vue  ->    SPA应用，单页面运用
    vue-resouce   交互
    vue-router      路由
根据不同url地址，出现不同的效果

0.x 与 2.x 的区别： https://segmentfault.com/a/1190000006623100

入口文件（ main.js ） Vue.js 初始化的时要加上 render: (h) => h(App) 方法。
url 配置。 vue-router 2 的路由定义不一样了，仿照文档修改就好。
不支持 v-link ，需要改用 <router-link :to="">。注意这里是 :to，而原来 v-link 不需要 :。
ready 事件改为 mounted 。生命周期 hook 变化可以参考这里： http://vuefe.cn/guide/migration.html#生命周期钩子
不支持 prop: defaultValue 写法了，得改成 prop: {type: YourType, default: defaultValue}。
不建议修改 props ， Vue 2.0 中将修改 props 标记为不规范行为，会产生 warning 。
$destroy 无法删除子组件，作者表示不建议这样做，应当在父组件中删除。我这里改起来比较麻烦，就手动删除了 DOM ，然后 $destroy 。

```
<div class="container" id="box">
       <ul>
           <li><a href="{path:'/home'}">主页</a></li>
           <li><a href="{path:'/new'}">新闻</a></li>
       </ul>
       <div>
           <router-view name="path"></router-view>
       </div>
    </div>
```

- 多级嵌套：

```
            //5 关联
            router.map({
                'home':{
                    component:Home,
                    subRoutes:{
                        '/login':{
                            component:{
                                template:"<h2>登录模块</h2>"
                        },
                    }
                    }
                },
                'new':{
                    component:New  //访问的是new 组件
                }

            })
```
- param 参数
```
 'new':{
                    component:New,  //访问的是new 组件
                    subRoutes:{
                        '/detail/:id':{
                            component:Detail,
                        }
                    }
                }

    <template id="new">
            <h3>我是新闻</h3>
            <div>
                    <a v-link="{path:'/new/detail/001?a=1&b=2'}">描述001的新闻</a>
                    <a v-link="{path:'/new/detail/002'}">描述002的新闻</a>
                </div>
                <div>
                        <router-view></router-view>
                </div>
    </template>
    <template id="detail">
            <h3>xxxx{{$route.params | json }}</h3>
            <h3>{{$route.path}}</h3>
            <h3>{{$route.query | json }}</h3>
    </template>
```
- 如有其它信息：
  /detail/:id/age/:age
    {{$route.params | json}}    当前参数
    {{$route.path}}             当前路径
    {{$route.query | json}}     url参数

### 数据通信：
```
<script>
        window.onload=function(){
            new Vue({
                el:'#box',
                data:{
                    giveData:{
                        a:'我是父组件数据'
                    }
                },
                components:{
                    'child-com':{
                        props:['msg'],
                        template:'#child',
                        methods:{
                            change(){
                                //this.msg='被更改了'
                                this.msg.a='被改了';
                            }
                        }
                    }
                }
            });
        };
    </script>
</head>
<body>
    <template id="child">
        <div>
            <span>我是子组件</span>
            <input type="button" value="按钮" @click="change">
            <strong>{{msg.a}}</strong>
        </div>
    </template>

    <div id="box">
        父级: ->{{giveData.a}}
        <br>
        <child-com :msg="giveData"></child-com>
    </div>
</body>
```

```
    <script>
        window.onload=function(){
            new Vue({
                el:'#box',
                data:{
                    a:'我是父组件数据'
                },
                components:{
                    'child-com':{
                        data(){
                            return {
                                b:''
                            }
                        },
                        props:['msg'],
                        template:'#child',
                        mounted(){
                            this.b=this.msg;
                        },
                        methods:{
                            change(){
                                this.b='被改了';
                            }
                        }
                    }
                }
            });
        };
    </script>
</head> 
<body>
    <template id="child">
        <div>
            <span>我是子组件</span>
            <input type="button" value="按钮" @click="change">
            <strong>{{b}}</strong>
        </div>
    </template>

    <div id="box">
        父级: ->{{a}}
        <br>
        <child-com :msg.sync="a"></child-com>
    </div>
</body>
```
### v2.x  路由
跳转：   https://blog.csdn.net/heliumlau/article/details/61649491

```
除了使用创建a标签来定义导航链接，我们还可以借助router的实例方法，通过编写代码来实现。 
router.push() 
这种方法会向history栈中添加记录 
router.push() ==

// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

router.replace(location) 
router.replace(location) == 
router.go(n) 
这个方法的参数是一个整数，意思是在history记录中向前或者后退多少步，类似window.history.go(n)
```


### vue-loader
    其它 loader -> css  url  html  
    后台 node.js   -> require exports
    webpack  模块加载器,一切都是模块
     
     require('style.css')   ->css-loader、style-loader

     基于webpack


### a.vue/b.vue
vue文件： 放置的就是vue组件

```
<template>
    html
</template>
<style>
    html
</style>

<script>
    js  （平时 babel-loader）
</script>
```
简单的目录结构：
        |-index
        | main.js           入口文件
        |- App.vue          vue文件
        |-package.json      工程文件（项目依赖，名称，配置）
        |- webpack.config.js   webpack 配置文件


- es6:  模块化开发
    导出模块：export default{}

    引入模块：import 使用名 from 地址
- webpack 准个工作
更新最新版本的npm ：npm install -g npm
但是这种安装方式比较慢，推荐使用国内镜像来安装，所以我们先设置 cnpm：
npm install -g cnpm --registry=https://registry.npm.taobao.org

- webpack 4:
npm install --save-dev webpack webpack-cli
mode/–mode参数:
```
// webpack.config.js
module.exports = {
    mode: "production",
    // ...
}
```
- vue 的准备工作
App.vue  -> 变成正常的代码：   vue-loader

- vue/vue-loader 更新
    cnpm install --save-dev vue-loader
    cnpm install --save  vue  (dependencies 必须的框架)
查看：npm ls vue-loader --save-dev
依赖：css-loader  vue-template-compiler  vue-style-loader  vue-hot-reload-api

- 安装babel
简单：npm install babel-cli -g
        npm install --save-dev  babel-preset-es2015
复杂：babel-loader babel-core babel-plugin-transfore-runtime
babel-preset-es2015  babel-runtime

- npm 版本信息查看
 npm info vue-loader 
所有的jquery版本信息    npm view vue-loader versions
最新的版本    npm view vue-loader version
现在指定版本：vue-loader@14.2.2  
 


 ### UI 组件名称
 开源，为了提高开发效率

bootstrap,elementUI,MintUI……
拿来主义

###   elementUI  全部引入
cnpm i element-ui -S
npm install element-ui --save-dev
//i install D  --save-dev   S --save

引入：
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

### elementUI less
<style scope lang="less">
    @color:red;
    .my-grid{
        border:1px solid @color;
        height:50px;
    }
</style>

###   elementUI  部分引入

按需引入

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

npm install babel-plugin-component -D
然后，将 .babelrc 修改为：

{ 
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：
```
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```
完整组件列表和引入方式（完整组件列表以 components.json 为准）

### MintUI
文档  http://mint-ui.github.io/docs/#/zh-cn2 
<meta name="viewport" content="width=device-width,initial-scale=1.0">

### axios
axios.get(xxx,{}).then().catch()

### 自定义vue全局组件的使用

Vue.use()
Vue.use(Vuesource)
--------
自定义vue全局组件:
    使用：
        |-loading/
                |-index.js      //导出组件
                |-Loading.vue   //Loading组件（三部分组成:template,style,script）


### vuex: Devtools
官网： http://vuex.vuejs.org/

vuex  提供两个非常靠谱的方法：
        mapActions  管理所有事件（行为）
        mapGetters  获取数据

cnpm install  vuex -D

13：00





### vue 访问新闻客户端项目

1.拿到静态页面，（直接vue边布局，边写）
2.假数据
3.规划组件

做项目的基本流程
    1.规划组件的结构
        nav.vue
        header.vue
        home.vue
        ……
        
    2.编写对应的路由
        vue-route

    3.具体些每个组件的功能


 建议：
    1.一些公共的jquery、jquery插件，一般在index.html文件里面引入
    2.main.js require/import
    require 全局引入 


借用别人的项目需要：
    下载别人的项目模块：vuex vue-router axios -D

    架构：
        assets -> 静态资源 img,css,js

        想在js里面引入css模块：style
        23:29



    