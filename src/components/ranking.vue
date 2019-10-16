<template>
  <div class="bg">
    <div style="width:450px;margin-top:10%;margin-left:37%;">

      <el-table
        :data="ranginglist.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        height="500"
        border
        style="width:800px;"
      >
        <el-table-column prop="player_id" label="用户id"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="score" label="分数"></el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:0%;margin-left:0%"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="ranginglist.length"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <div class="buttons" style="margin-top:-400px;margin-left:600px;">
        <img src="../pictures/historyrecord.png" alt @click="skiphistory" style="width:240px;height: 95px;"/>
      </div>
      <div class="buttons" style="margin-top:-227px;margin-left:600px;">
        <img src="../pictures/startgame.png" alt @click="skipplay" style="width:240px;height: 115px;"/>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'ranking',
        data() {
            return {
                currentPage: 1,
                pageSize:10,
                ranginglist:[],
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                backDialog: false
            }
        },
        created() {
            this.getranking()
        },

        methods: {
            skipplay(){
                this.$router.push({path:'/play'});
            },
            skiphistory(){
                this.$router.push({path:'/history'});
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
            },
            getranking(){
                let _this=this;
                console.log(_this.$store.state.UserId)
                axios.get('https://api.shisanshui.rtxux.xyz/rank/rank.json', {

                })
                    .then(function (response) {

                        console.log(response.data)
                        _this.ranginglist=response.data

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }

        }
    };
</script>

<style lang="scss" scoped>
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;

    background: url("../pictures/rankbg.png");
    background-size: contain;
    background-repeat: no-repeat;
    -ms-interpolation-mode: bicubic;
    -webkit-background-size: cover;
    -o-background-size: cover;
    p {
      text-align: center;
      font-family: "隶书",fantasy;
      font-size: 30px;
      margin-block-end: 10px;
      margin-bottom: 10px;
    }
    .buttons {
      img {
        width: 197px;
        height: 80px;
        cursor: pointer;
      }
    }
    tr {
      text-align: center;
      background: rgba(0, 0, 0, 0);
    }

    td {
      height: 60px;
      font-family: "Cooper", "Helvetica Neue", Helvetica, "PingFang SC",
      "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      font-size: 20px;
    }
  }
</style>
