
<template>
  <div class="bo">
        <div class="ap">
            
             <slot ></slot>
	
        </div>
        <ol class="biao">
				<li :class="{active:num==index}" v-for="(item,index) in message" :key="index">
					{{item}}
				</li>
		</ol>
    </div>
</template>

<script>
  export default {
		name: "Swiper",
		data(){
		return{
					message:[],
					num:0,
					fa:true,
					widt:0
		}
	},
	created(){

		setTimeout(function() {
			let oUl =  document.querySelector('.ap')
			oUl.innerHTML = oUl.innerHTML+oUl.innerHTML;
			this.width = oUl.children[0].offsetWidth;
			}, 200);
			this.message = [' ',' '];		
		},
		mounted(){
			this.widt = document.querySelector('.ap').offsetWidth;	
			this.timer();
		},
		 deactivated(){
            this.fa=false 
		},
		activated(){
		    this.fa=true 
            this.timer();
        },
		methods:{
			timer(){	
						var oUl = document.querySelector('.ap');
						var oBo = document.querySelector('.bo');
						Get_Move(oUl,{left:0},1);
						this.num = 0 ;
						let sup = -this.widt;
						let spend = sup;
						let index = 1;
						let cen = 0;
						let time = setInterval(() => {				
							if(cen==0){
								let arr = [];
								for(var j=0;j<oUl.children.length/2;j++){
									arr.push(' ')
								}cen++;
								this.message=arr
							}
							 if(this.fa==false){clearInterval(time)}
							 else{
								    oBo.style.height=oUl.offsetHeight+'px';
									Get_Move(oUl,{left:spend},9,function(){
										spend = spend+sup;
										index++;
										if(index==oUl.children.length/2)index = 0;
										if(oUl.offsetLeft<=-(oUl.offsetWidth*oUl.children.length/2))
											{												
												oUl.style.left=0;
												spend = sup;
											} 
											
									  })  
										this.num = index;	
										
									}
							},2000);		
					
				},	
		}

   
}
  function Get_Move(obj,json,n,fnEnd){/*对象，{样式名:修改变量}，回调函数*/
					clearInterval(obj.timer)/*首先要先清除定时器*/
					obj.timer=setInterval(function(){/*开启定时器*/
						var Bstop = true/*假设所有目标到达地点*/
						for(var attr in json){/*for in 循环，每次一个变量只走一点*/
						var cur = 0  /*设定接受实际路程量*/
						/*处理透明度兼容问题*/
						if(attr=='opacity')/*如果该参数为oppacity*/
							cur =Math.round(parseFloat(Get_style(obj,attr))*100)/*将获取到的目标值化整*/
						else
							cur = parseInt(Get_style(obj,attr))/*将获取到的目标值化整*/
						var spend = (json[attr]-cur)/n;/*设定速度为实际路程-当前路程/6*/
						spend=spend>0?Math.ceil(spend):Math.floor(spend)/*防止过头，如果>0往后取整,<0w往前取整*/
						if(cur!=json[attr])/*如果有一个目标没到*/
						Bstop = false//那就是没到
						if(attr=='opacity'){//如果是不透明度,这里处理兼容问题
							obj.style.filter='alpha(opacity:'+(cur+spend)+')'
							obj.style.opacity=(cur+spend)/100
						}
						else
							obj.style[attr]=cur+spend+'px'/*将实际路程+速度赋给当前obj*/
						if(Bstop){/*如果都到了*/
							clearInterval(obj.timer)/*清除定时器*/
							if(fnEnd)fnEnd()/*如果有回调则执行*/
						}
					}
					},30)
        }
        function Get_style(obj,name){/*对象，样式名*//*这里处理浏览器透明度兼容问题*/
				if(obj.currentStyle) return obj.currentStyle[name]/*获取当前样式*/
				else return getComputedStyle(obj,false)[name]/*获取计算后的样式*/
			}

</script>

<style scoped>
/*大插槽*/
.bo{
		 width: 100%; 
		 /* height: 33vh;  */
	     position: relative;
	     overflow: hidden;
	
	}
.ap{
        width: 100%; 
        display: flex;
        position:absolute; 
		left: 0px; 
    }
/* .bo::after{
    content:"";				设置内容为空
    height:300px;				高度为0
    line-height:100%;			行高为0
    display:block;			将文本转为块级元素
    visibility:hidden;		将元素隐藏
    clear:both;				清除浮动
} */
.biao{
	position: absolute;
	text-align:center;
	line-height: 10px;z-index: 9;
	bottom: 2px;left: 50%; transform: translate(-50%,-50%);}
ol li{
	list-style: none;		
	width: 8px;height: 8px;
	border-radius: 50%;
	border: 1px solid orange;	  
	float: left;
	background-color: oldlace;
	margin: 0 2px 2px 2px;
	}
.active { background: red;}
</style>