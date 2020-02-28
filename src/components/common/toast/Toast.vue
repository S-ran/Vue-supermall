<template>
    <div v-show="isShowtime" class="toast">
        <div>
            {{message}}
        </div>
    </div>
</template>

<script>
    export default{
        name:'Toast',
        data(){
            return{
                message:'1111',
                isShowtime:false
            }
        },
        methods:{
            Get_show(message='默认文字',duration=2000){
                this.message = message;
                this.isShowtime = true;
                setTimeout(() => {
                    this.isShowtime = false;
                    this.message = '';
                },duration)
            }
        }
}
</script>

<style scoped>
.toast{
    position: fixed;
    top:50%;left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    padding: 8px 10px;
    border-radius:5px; 
    z-index: 10;
}
</style>