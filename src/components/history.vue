
<template>
  <div class="loginbg">
    <el-table
      :data="gameTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height="410"
      border
      style="width: 485px;margin-top:11%;margin-left:36%;"
    >
      <el-table-column prop="id" label="比赛场次" width="180"></el-table-column>
      <el-table-column prop="score" label="分数" width="180"></el-table-column>
      <el-table-column label="查看比赛详情" width="120px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-more"
            size="mini"
            circle
            @click="showBackDialog(scope.$index,gameTableData)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:0%;margin-left:46%"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="gameTableData.length"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-dialog title="比赛详情" :visible.sync="backDialog" width="68%">
      <h2>战局id：{{gameRecordDetails.id}}</h2>
      <p>时间：{{gameRecordDetails.timestamp}}</p>

      <el-table :data="gameRecordDetails.detail" height="235" border style="width:88%">
        <el-table-column prop="playerId" label="玩家id" width="100"></el-table-column>
        <el-table-column prop="card" label="卡牌样式" width="600px"></el-table-column>
        <el-table-column prop="score" label="玩家分数" width="100px"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="backDialog = false">确定</el-button>
      </span>
    </el-dialog>
    <div class="buttons" style="margin-top:-417px;margin-left:1300px;">
      <img src="../pictures/back.png" alt @click="skipplay" style="width: 250px;"/>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'login',
        data () {
            return {
                currentPage: 1,
                pageSize: 7,
                backDialog: false,
                gameTableData: [
                    {
                        "id": 2890,
                        "card": [
                            "&J $K &A",
                            "#2 &2 #3 *3 $5",
                            "&3 #4 *5 $6 #7"
                        ],
                        "score": -7,
                        "timestamp": 1570608064
                    },
                    {
                        "id": 2897,
                        "card": [
                            "$9 $Q *A",
                            "#3 $3 *3 $K &K",
                            "*5 *10 #10 $10 &10"
                        ],
                        "score": 24,
                        "timestamp": 1570608065
                    },
                    {
                        "id": 2900,
                        "card": [
                            "&3 *8 *J",
                            "&5 *6 &7 &8 #9",
                            "$2 $4 $6 $8 $Q"
                        ],
                        "score": -2,
                        "timestamp": 1570608066
                    },
                    {
                        "id": 2888,
                        "card": [
                            "#7 $9 $K",
                            "#2 #4 #5 #8 #10",
                            "&3 &4 &7 &8 &A"
                        ],
                        "score": 1,
                        "timestamp": 1570608063
                    },
                    {
                        "id": 2894,
                        "card": [
                            "#5 #J *A",
                            "*3 &4 *10 $K &K",
                            "$3 $6 $8 $9 $A"
                        ],
                        "score": -4,
                        "timestamp": 1570608065
                    },
                    {
                        "id": 2896,
                        "card": [
                            "#2 &10 $K",
                            "&3 *6 $6 $7 &7",
                            "#9 &9 $9 #A *A"
                        ],
                        "score": 1,
                        "timestamp": 1570608065
                    },
                    {
                        "id": 2899,
                        "card": [
                            "*8 &9 #K",
                            "*2 &5 *5 *6 #6",
                            "$7 $8 #9 $10 $J"
                        ],
                        "score": -8,
                        "timestamp": 1570608066
                    },
                    {
                        "id": 2892,
                        "card": [
                            "$10 #J #A",
                            "$5 &5 #8 $K &K",
                            "#4 *5 $6 *7 &8"
                        ],
                        "score": -1,
                        "timestamp": 1570608064
                    },
                    {
                        "id": 2895,
                        "card": [
                            "#J &J *Q",
                            "$3 &4 *7 &A *A",
                            "$4 #8 *8 $8 &10"
                        ],
                        "score": -3,
                        "timestamp": 1570608065
                    },
                    {
                        "id": 2898,
                        "card": [
                            "&6 *7 #K",
                            "*10 $J #J &A *A",
                            "#2 $4 *8 &8 $8"
                        ],
                        "score": -13,
                        "timestamp": 1570608065
                    },
                    {
                        "id": 2909,
                        "card": [
                            "*4 *10 #Q",
                            "&2 *3 $3 &J $J",
                            "$4 $5 #6 &7 &8"
                        ],
                        "score": -11,
                        "timestamp": 1570608068
                    },
                    {
                        "id": 2912,
                        "card": [
                            "&2 &8 &A",
                            "#3 #4 #5 #10 #A",
                            "$6 #6 *6 $9 &9"
                        ],
                        "score": 6,
                        "timestamp": 1570608069
                    },
                    {
                        "id": 2968,
                        "card": [
                            "$7 &10 &J",
                            "&3 #4 $4 $A *A",
                            "&5 #9 #Q *Q $Q"
                        ],
                        "score": -6,
                        "timestamp": 1570608081
                    },
                    {
                        "id": 2921,
                        "card": [
                            "*8 #8 $9",
                            "$2 *2 &2 *5 &J",
                            "&9 *10 $J $Q $K"
                        ],
                        "score": 11,
                        "timestamp": 1570608071
                    },
                    {
                        "id": 2935,
                        "card": [
                            "*7 *8 #A",
                            "$5 #5 *5 &Q $Q",
                            "$2 &2 &J $J *J"
                        ],
                        "score": 6,
                        "timestamp": 1570608074
                    },
                    {
                        "id": 2947,
                        "card": [
                            "$5 &10 *A",
                            "$2 $4 &7 #8 *8",
                            "#3 #5 #9 #10 #K"
                        ],
                        "score": 3,
                        "timestamp": 1570608076
                    },
                    {
                        "id": 2944,
                        "card": [
                            "*8 #Q &A",
                            "#4 &7 $7 *9 #9",
                            "$2 #2 $6 &J #J"
                        ],
                        "score": -1,
                        "timestamp": 1570608076
                    },
                    {
                        "id": 2876,
                        "card": [
                            "*10 &Q *K",
                            "*3 &5 *J #J $J",
                            "*6 &6 $8 *8 #8"
                        ],
                        "score": 3,
                        "timestamp": 1570608060
                    },
                    {
                        "id": 2877,
                        "card": [
                            "#4 $6 #K",
                            "#2 $7 *7 &10 $10",
                            "$8 #8 $Q $A *A"
                        ],
                        "score": -19,
                        "timestamp": 1570608060
                    },
                    {
                        "id": 2878,
                        "card": [
                            "$J #K $A",
                            "$5 #6 #7 &8 *9",
                            "*4 *6 *8 *10 *A"
                        ],
                        "score": 8,
                        "timestamp": 1570608061
                    }
                ],
                gameRecordDetails:{
                    "id": 2891,
                    "timestamp": 1570608070,
                    "detail": [
                        {
                            "playerId": 4,
                            "name": "test4",
                            "score": 1,
                            "card": [
                                "#3 &Q *Q",
                                "*2 $2 *9 $9 &A",
                                "*5 *6 *10 *K *A"
                            ]
                        },
                        {
                            "playerId": 2,
                            "name": "test2",
                            "score": 1,
                            "card": [
                                "#2 #9 $10",
                                "$3 $5 $7 $8 $J",
                                "&4 #4 *4 #K &K"
                            ]
                        },
                        {
                            "playerId": 3,
                            "name": "test3",
                            "score": 1,
                            "card": [
                                "$4 $6 *J",
                                "&5 &6 &8 &9 &J",
                                "#5 #7 #8 #J #Q"
                            ]
                        },
                        {
                            "playerId": 1,
                            "name": "test1",
                            "score": -3,
                            "card": [
                                "*8 $Q $K",
                                "&2 *7 &7 #10 &10",
                                "*3 &3 #6 $A #A"
                            ]
                        }
                    ]
                }
            };
        },
        created() {
            this.gethistory()
        },
        methods: {
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
            },
            showBackDialog(index,gameTableData) {
                console.log(gameTableData[index].id)

                let _this=this;
                console.log(_this.$store.state.UserId)
                axios.get('https://api.shisanshui.rtxux.xyz/history/'+gameTableData[index].id, {

                })
                    .then(function (response) {

                        console.log(response)
                        _this.gameRecordDetails=response.data.data

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                this.convertCards()
                this.backDialog = true
            },
            skipplay(){
                this.$router.push({path:'/play'});
            },
            gethistory(){
                let _this=this;
                console.log(_this.$store.state.UserId)
                axios.get('https://api.shisanshui.rtxux.xyz/history', {
                    params: {
                        player_id: parseInt(_this.$store.state.UserId),
                        limit: 1000,
                        page:1,
                    }
                })
                    .then(function (response) {
                        //_this.userToken=response.data.data.token;
                        //console.log(response.data.data.token)
                        console.log(response)
                        _this.gameTableData=response.data.data
                        // console.log(response.data.data)
                        // _this.changeLogin({ Authorization:response.data.data.token,UserId:response.data.data.user_id });
                        // _this.$router.push({path:'/startinterface'});
                        //alert('登陆成功');

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            convertCards(){
                //console.log(this.gameRecordDetails.detail[1])
                for(var i=0;i<this.gameRecordDetails.detail.length;i++)
                    for(var j=0;j<this.gameRecordDetails.detail[i].card.length;j++){
                        this.gameRecordDetails.detail[i].card[j]=this.gameRecordDetails.detail[i].card[j].replace(/#/g,"方块")
                        this.gameRecordDetails.detail[i].card[j]=this.gameRecordDetails.detail[i].card[j].replace(/&/g,"红桃")
                        this.gameRecordDetails.detail[i].card[j]=this.gameRecordDetails.detail[i].card[j].replace(/\$/g,"黑桃")
                        this.gameRecordDetails.detail[i].card[j]=this.gameRecordDetails.detail[i].card[j].replace(/\*/g,"梅花")
                        console.log(this.gameRecordDetails.detail[i].card[j])


                    }

            }
        }
    }
</script>

<style lang="scss" scoped>
  .loginbg {
    position: absolute;
    width: 100%;
    height: 100%;

    background: url("../pictures/hisbg.png");
    background-size: contain;
    background-repeat: no-repeat;
    -ms-interpolation-mode: bicubic;
    -webkit-background-size: cover;
    -o-background-size: cover;

    span {
      cursor: pointer;
    }
  }
  .buttons {
    img {
      cursor: pointer;
    }
  }
</style>
