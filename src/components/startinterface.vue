
<template>
  <div class="loginbg1" >
    <span>
  <img src="../pictures/preparegame.png" alt="" @click="skipplay" style="margin-top:2%;margin-left:75%;width:300px;height:145px;">

  <img src="../pictures/historyrecord.png" alt="" @click="skipranking" style="margin-top:0%;margin-left:75%;width:300px;">
   </span>
  </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {


            };
        },
        methods: {
            skipplay(){
                this.$router.push({path:'/play'});
            },
            skipranking(){
                this.$router.push({path:'/history'});
            }

        }
    }
</script>

<style lang="scss" scoped>
  .loginbg1 {

    position:absolute;
    width: 100%;
    height:100%;

    background: url("../pictures/background.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    -ms-interpolation-mode: bicubic;
    -webkit-background-size: cover;
    -o-background-size: cover;

    span{
      cursor : pointer;
    }
  }

</style>
