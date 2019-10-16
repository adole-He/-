<template>
  <div class="loginbg">
    <span></span>
    <div class="qian" style="margin-left:41%;margin-top:12.2%">
      <li v-for="(item) in qiandunSrc" :key="item.key">
        <img :src="item.imgurl" alt />
      </li>
    </div>

    <div class="zhong" style="margin-left:37%;margin-top:22.2%">
      <li v-for="(item) in zhongdunSrc" :key="item.key">
        <img :src="item.imgurl" alt />
      </li>
    </div>

    <div class="hou" style="margin-left:37%;margin-top:32.2%">
      <li v-for="(item) in houdunSrc" :key="item.key">
        <img :src="item.imgurl" alt />
      </li>
    </div>

    <div class="buttons" style="margin-top:-410px;margin-left:1440px;">
      <img src="../pictures/startgame.png" alt @click="PlayAndShowCard" style="width:220px;height: 125px;"/>
    </div>

    <div class="buttons" style="margin-top:18px;margin-left:1440px;">
      <img src="../pictures/rankrecord.png" alt @click="skipranking" style="width:220px;height: 130px;"/>
    </div>

    <div class="buttons" style="margin-top:45px;margin-left:1440px;">
      <img src="../pictures/historyrecord.png" alt @click="skiphistory" style="width:220px;height: 110px;"/>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'ranking',
        data() {
            return {
                "card":"#2 $5 $Q $K *4 $6 &4 #K *5 &K $4 &6 &K",
                "cardsUse":[],
                "cardsTotal":[],
                "cardsDegree":[],
                "cardsType":[],
                "cardsNumber":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                //"cardsTotalInfo":[],
                "cardsTypeNumber":[0,0,0,0],//存放卡牌类型个数
                "qiandun":["","",""],
                "zhongdun":[],
                "houdun":["","","","",""],
                "qiandunSrc":[
                    {imgurl:require("../pictures/cards/backk.png"),key:0},
                    {imgurl:require("../pictures/cards/backk.png"),key:1},
                    {imgurl:require("../pictures/cards/backk.png"),key:2}
                ],
                "zhongdunSrc":[
                    {imgurl:require("../pictures/cards/backk.png"),key:3},
                    {imgurl:require("../pictures/cards/backk.png"),key:4},
                    {imgurl:require("../pictures/cards/backk.png"),key:5},
                    {imgurl:require("../pictures/cards/backk.png"),key:6},
                    {imgurl:require("../pictures/cards/backk.png"),key:7},
                ],
                "houdunSrc":[
                    {imgurl:require("../pictures/cards/backk.png"),key:8},
                    {imgurl:require("../pictures/cards/backk.png"),key:9},
                    {imgurl:require("../pictures/cards/backk.png"),key:10},
                    {imgurl:require("../pictures/cards/backk.png"),key:11},
                    {imgurl:require("../pictures/cards/backk.png"),key:12},
                ],
                "sendCards":[
                    "",
                    "",
                    ""
                ]
            }
        },
        methods: {
            skipranking(){
                this.$router.push({path:'/ranking'});
            },
            skiphistory(){
                this.$router.push({path:'/history'});
            },
            PlayAndShowCard(){
                let _this=this;
                let id;

                axios.post('https://api.shisanshui.rtxux.xyz/game/open', {

                })
                    .then(function (response) {

                        //Receivecards=response.data.data.card
                        console.log(response.data.data.card)
                        _this.card=response.data.data.card
                        id=response.data.data.id
                        //console.log(_this.card)

                        /* console.log(this.cardsNumber)
                         console.log(this.cardsDegree)

                       console.log(this.cardsTotal)
                       console.log(this.cardsType)

                       console.log(this.cardsTypeNumber)
                       console.log(this.houdun)
                       console.log(this.zhongdun)
                       console.log(this.qiandun)
                       console.log(this.cardsUse)*/
                        //console.log(this.cardsNumber)*/


                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function(data){

                        console.log(_this.card)

                        _this.cardsUse=[];

                        _this.cardsTotal=[]
                        _this.cardsDegree=[]
                        _this.cardsType=[]
                        _this.cardsNumber=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                            //"cardsTotalInfo":[],
                            _this.cardsTypeNumber=[0,0,0,0]
                        _this.qiandun=["","",""]
                        _this.zhongdun=[]
                        _this.houdun=["","","","",""]
                        _this.setCards();
                        _this.decideHoudun();

                        _this.decideZhongdun();
                        _this.decideQiandun();
                        _this.showCards()

                    })
                    .then(function(data){
                        axios.post('https://api.shisanshui.rtxux.xyz/game/submit', {
                            id:id,
                            card: _this.sendCards
                        })
                            .then(function (response) {


                                console.log(response)//获取到的token


                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    })




            },
            setCards(){
                //把牌分好

                var cards=this.card.split(" ");
                for(var i=0;i<=12;i++){

                    this.cardsUse[i]=false;
                    this.cardsTotal[i]=cards[i];
                    this.cardsType[i]=cards[i].slice(0,1);
                    /*cardInfo.total=cards[i];
                    cardInfo.type=cards[i].slice(0,1);*/
                    if(this.cardsType[i]==="#"){
                        this.cardsTypeNumber[0]++;
                        this.cardsType[i]=0;
                    }else if(this.cardsType[i]==="$"){
                        this.cardsTypeNumber[1]++;
                        this.cardsType[i]=1
                    }else if(this.cardsType[i]==="&"){
                        this.cardsTypeNumber[2]++;
                        this.cardsType[i]=2
                    }else if(this.cardsType[i]==="*"){
                        this.cardsTypeNumber[3]++;
                        this.cardsType[i]=3
                    }

                    if(cards[i].slice(1,2)==="A"){

                        this.cardsDegree[i]=14;
                        this.cardsDegree[i]=parseInt(this.cardsDegree[i]);

                        this.cardsNumber[14]++;
                    }else if(cards[i].slice(1,2)==="K"){
                        this.cardsNumber[13]++;
                        this.cardsDegree[i]=13;
                    }else if(cards[i].slice(1,2)==="Q"){
                        this.cardsDegree[i]=12;
                        this.cardsNumber[12]++;
                    }else if(cards[i].slice(1,2)==="J"){
                        this.cardsNumber[11]++;
                        this.cardsDegree[i]=11;
                    }else if(cards[i].slice(1,2)==="1"){
                        this.cardsDegree[i]=10;
                        this.cardsNumber[10]++;
                    }
                    else{
                        this.cardsDegree[i]=parseInt(cards[i].slice(1,2));
                        this.cardsNumber[this.cardsDegree[i]]++;
                    }
                    //this.cardsTotalInfo.push(cardInfo);

                }
                console.log(this.cardsDegree)
                // console.log(this.cardsNumber)
                /*for(var i=0;i<15;i++){
                  if(this.cardsNumber[i]===0){
                    this.cardsNumber[i]=-1
                  }
                }*/

                for (var i = this.cardsDegree.length - 1; i > 0; i--) {
                    for (var j = 0; j < i; j++) {
                        if (this.cardsDegree[j] < this.cardsDegree[j + 1]) {
                            [this.cardsDegree[j], this.cardsDegree[j + 1]] = [this.cardsDegree[j + 1], this.cardsDegree[j]];
                            [this.cardsTotal[j], this.cardsTotal[j + 1]] = [this.cardsTotal[j + 1], this.cardsTotal[j]];
                            [this.cardsType[j], this.cardsType[j + 1]] = [this.cardsType[j + 1], this.cardsType[j]];
                        }
                    }
                }
            },
            decideHoudun(){
                //找牌
                var houdun=[]
                var flag=-1;
                var max1=0;//有多少重复的牌
                var max2=0;

                //看是否有炸弹 有葫芦（重复牌数）
                for(var i=1;i<=14;i++)
                {
                    if(max1<this.cardsNumber[i])
                        max1=this.cardsNumber[i];
                }
                //看是否有同花
                for(var i=0;i<4;i++)
                {
                    if(max2<this.cardsTypeNumber[i])
                    {

                        max2=this.cardsTypeNumber[i];
                    }
                }


                if(max1>2){

                    flag=-1;

                    for(var j=1;j<=14;j++){

                        if(this.cardsNumber[j]==5-max1)
                        {
                            flag=j;
                            break
                        }
                    }


                    if(flag>0){

                        for(var j=0;j<=12;j++)
                        {

                            if(this.cardsDegree[j]===flag&&this.cardsUse[j]===false)
                            {

                                this.cardsUse[j]=true;
                                this.cardsNumber[this.cardsDegree[j]]--
                                this.cardsTypeNumber[this.cardsType[j]]--
                                houdun.push(this.cardsTotal[j]);
                            }
                        }
                        for(var j=1;j<=14;j++){
                            if(this.cardsNumber[j]==max1)
                            {
                                flag=j;

                            }
                        }

                        for(var j=0;j<=12;j++)
                        {

                            if(this.cardsDegree[j]===flag)
                            {

                                this.cardsUse[j]=true;
                                this.cardsNumber[this.cardsDegree[j]]--;
                                this.cardsTypeNumber[this.cardsType[j]]--
                                houdun.push(this.cardsTotal[j]);

                            }
                        }

                    }
                    //拆双数的情况
                    else if(max1===4&&flag===-1){

                        for(var j=1;j<=14;j++){
                            if(this.cardsNumber[j]==5-max1+1)
                            {
                                flag=j;

                                break
                            }
                        }
                        for(var j=0;j<=12;j++)
                        {

                            if(this.cardsDegree[j]===flag&&this.cardsUse[j]===false)
                            {

                                this.cardsUse[j]=true;
                                this.cardsNumber[this.cardsDegree[j]]--
                                this.cardsTypeNumber[this.cardsType[j]]--
                                houdun.push(this.cardsTotal[j]);
                                break;
                            }
                        }

                        for(var j=1;j<=14;j++){
                            if(this.cardsNumber[j]==max1&&this.cardsUse[this.cardsNumber[j]]===false)
                            {
                                flag=j;

                            }
                        }

                        for(var j=0;j<=12;j++)
                        {

                            if(this.cardsDegree[j]===flag)
                            {

                                this.cardsUse[j]=true;
                                this.cardsNumber[this.cardsDegree[j]]--;
                                this.cardsTypeNumber[this.cardsType[j]]--
                                houdun.push(this.cardsTotal[j]);

                            }
                        }


                    }
                }


                //同花
                if(max2>=5&&flag<0){
                    for(var i=0;i<=3;i++){
                        if(this.cardsTypeNumber[i]>=5)
                        {
                            flag=i
                        }
                    }
                    for(var i=0;i<13;i++)
                    {
                        if(this.cardsType[i]===flag&&houdun.length<=4){
                            //this.cardsType[i]--
                            this.cardsTypeNumber[this.cardsType[i]]--
                            this.cardsNumber[this.cardsDegree[i]]--
                            this.cardsUse[i]=true
                            houdun.push(this.cardsTotal[i])
                        }
                    }
                }
                //只有2张
                else if(max1<=2){
                    for(var i=0;i<=12;i++){

                        if(this.cardsNumber[this.cardsDegree[i]]===2&&houdun.length<4)
                        {

                            houdun.push(this.cardsTotal[i])
                            this.cardsTypeNumber[this.cardsType[i]]--

                            this.cardsUse[i]=true

                        }

                    }
                    for(var i=0;i<=12;i++){
                        if(this.cardsUse[i]===true){
                            this.cardsNumber[this.cardsDegree[i]]=0
                        }
                    }
                    for(var j=1;j<=14;j++){

                        if(this.cardsNumber[j]===1)
                        {
                            flag=j;
                            break
                        }
                    }
                    for(var j=0;j<=12;j++)
                    {

                        if(this.cardsDegree[j]===flag)
                        {

                            this.cardsUse[j]=true;
                            this.cardsTypeNumber[this.cardsType[j]]--
                            houdun.push(this.cardsTotal[j]);

                        }
                    }
                }
                this.houdun=houdun
            },
            decideZhongdun(){
                //找牌
                var zhongdun=[]
                var flag;
                var max1=0
                var max2=0


                for(var i=1;i<15;i++)
                {

                    if(max1<this.cardsNumber[i])
                    {
                        max1=this.cardsNumber[i];
                    }
                }

                //看是否有同花
                for(var i=0;i<4;i++)
                {
                    if(max2<this.cardsTypeNumber[i])
                    {

                        max2=this.cardsTypeNumber[i];

                    }
                }
                console.log("max1="+max1)
                console.log("max2="+max2)


                flag=-1
                if(max1>2){
                    for(var j=1;j<=14;j++){

                        if(this.cardsNumber[j]==max1)
                        {
                            flag=j;

                        }
                    }
                    /*    for(var i=0;i<13;i++){
                          if(this.cardsDegree[i]===flag)
                          {
                            flag=i

                            break
                          }
                        }*/


                    for(var j=0;j<=12;j++)
                    {


                        if(this.cardsDegree[j]===flag)
                        {

                            this.cardsUse[j]=true;

                            zhongdun.push(this.cardsTotal[j]);

                        }
                    }
                    flag=-1
                    for(var j=1;j<=14;j++){

                        if(this.cardsNumber[j]==5-max1)
                        {

                            flag=j;

                            break
                        }
                    }


                    /*  for(var i=0;i<13;i++){
                        if(this.cardsDegree[i]===flag){
                          flag=i
                          console.log("ccccc"+flag)
                          break
                        }
                      }*/
                    if(flag>0){
                        for(var j=0;j<=12;j++)
                        {

                            if(this.cardsDegree[j]===flag)
                            {

                                this.cardsUse[j]=true;
                                zhongdun.push(this.cardsTotal[j]);

                            }
                        }
                    }
                    if(flag<0&&max2<5){
                        for(var j=0;j<=12;j++)
                        {

                            if(this.cardsNumber[this.cardsDegree[j]]===1&&zhongdun.length<5)
                            {

                                this.cardsUse[j]=true;
                                zhongdun.push(this.cardsTotal[j]);

                            }
                        }
                    }
                    if(flag<0&&max2>5){

                        for(var t=0;t<3;t++){
                            for(var h=0;h<13;h++){
                                if(this.cardsTotal[h]===zhongdun.pop())
                                {
                                    this.cardsUse=false
                                }
                            }
                        }
                    }
                }
                //同花
                if(max2>5&&flag<0){
                    for(var i=0;i<=3;i++){
                        if(this.cardsTypeNumber[i]>=5)
                        {

                            flag=i
                            //console.log(flag)
                        }
                    }
                    for(var i=0;i<13;i++)
                    {
                        if(this.cardsType[i]===flag&&zhongdun.length<=4&&this.cardsUse[i]===false){
                            zhongdun.push(this.cardsTotal[i])
                            //console.log(this.cardsTotal[i])
                            this.cardsUse[i]=true
                        }
                    }
                }
                //只有2张
                else{

                    for(var i=0;i<=12;i++){
                        if(this.cardsNumber[this.cardsDegree[i]]===2&&zhongdun.length<4&&this.cardsUse[i]==false)
                        {

                            zhongdun.push(this.cardsTotal[i])

                            this.cardsUse[i]=true

                        }

                    }
                    while(zhongdun.length<5&&max1==2){
                        for(var j=1;j<15;j++){

                            if(this.cardsNumber[j]===1)
                            {
                                flag=j;
                                this.cardsNumber[j]--
                                break
                            }
                        }
                        for(var i=0;i<13;i++){
                            if(this.cardsDegree[i]===flag&&this.cardsUse[i]===false){
                                flag=i
                                break
                            }
                        }
                        for(var j=0;j<=12;j++)
                        {

                            if(j===flag)
                            {

                                this.cardsUse[j]=true;
                                zhongdun.push(this.cardsTotal[j]);

                            }
                        }
                    }
                    while(zhongdun.length<5&&max1==1){


                        for(var j=1;j<15;j++){

                            if(this.cardsNumber[j]===1)
                            {
                                flag=j;


                            }
                        }
                        for(var j=1;j<15;j++){

                            if(j==flag)
                            {
                                this.cardsNumber[j]--
                                break


                            }
                        }

                        for(var i=0;i<13;i++){
                            if(this.cardsDegree[i]===flag&&this.cardsUse[i]===false){
                                flag=i
                                break
                            }
                        }
                        for(var j=0;j<=12;j++)
                        {

                            if(j===flag)
                            {

                                this.cardsUse[j]=true;
                                zhongdun.push(this.cardsTotal[j]);

                            }
                        }
                    }
                }
                //console.log(zhongdun)
                this.zhongdun=zhongdun
            },
            decideQiandun(){
                var qiandun=[]
                for(var i=0;i<13;i++){
                    if(this.cardsUse[i]===false){
                        //console.log(this.cardsTotal[i])
                        qiandun.push(this.cardsTotal[i])
                    }
                }
                this.qiandun=qiandun
            },
            showCards(){
                for(var i=0;i<3;i++){
                    if(this.qiandun[i].slice(0,1)==="&")
                    {
                        this.qiandunSrc[i].imgurl=require("../pictures/cards/"+"红桃"+this.qiandun[i].slice(1,2)+".png")

                    }
                    else if(this.qiandun[i].slice(0,1)==="$")
                    {
                        this.qiandunSrc[i].imgurl=require("../pictures/cards/"+"黑桃"+this.qiandun[i].slice(1,2)+".png")
                    }
                    else if(this.qiandun[i].slice(0,1)==="*")
                    {
                        this.qiandunSrc[i].imgurl=require("../pictures/cards/"+"梅花"+this.qiandun[i].slice(1,2)+".png")
                    }
                    else if(this.qiandun[i].slice(0,1)==="#")
                    {
                        this.qiandunSrc[i].imgurl=require("../pictures/cards/"+"方片"+this.qiandun[i].slice(1,2)+".png")
                    }
                }
                for(var i=0;i<5;i++){
                    if(this.zhongdun[i].slice(0,1)==="&")
                    {
                        this.zhongdunSrc[i].imgurl=require("../pictures/cards/"+"红桃"+this.zhongdun[i].slice(1,2)+".png")

                    }
                    else if(this.zhongdun[i].slice(0,1)==="$")
                    {
                        this.zhongdunSrc[i].imgurl=require("../pictures/cards/"+"黑桃"+this.zhongdun[i].slice(1,2)+".png")
                    }
                    else if(this.zhongdun[i].slice(0,1)==="*")
                    {
                        this.zhongdunSrc[i].imgurl=require("../pictures/cards/"+"梅花"+this.zhongdun[i].slice(1,2)+".png")
                    }
                    else if(this.zhongdun[i].slice(0,1)==="#")
                    {
                        this.zhongdunSrc[i].imgurl=require("../pictures/cards/"+"方片"+this.zhongdun[i].slice(1,2)+".png")
                    }
                }
                for(var i=0;i<5;i++){
                    if(this.houdun[i].slice(0,1)==="&")
                    {
                        this.houdunSrc[i].imgurl=require("../pictures/cards/"+"红桃"+this.houdun[i].slice(1,2)+".png")

                    }
                    else if(this.houdun[i].slice(0,1)==="$")
                    {
                        this.houdunSrc[i].imgurl=require("../pictures/cards/"+"黑桃"+this.houdun[i].slice(1,2)+".png")
                    }
                    else if(this.houdun[i].slice(0,1)==="*")
                    {
                        this.houdunSrc[i].imgurl=require("../pictures/cards/"+"梅花"+this.houdun[i].slice(1,2)+".png")
                    }
                    else if(this.houdun[i].slice(0,1)==="#")
                    {
                        this.houdunSrc[i].imgurl=require("../pictures/cards/"+"方片"+this.houdun[i].slice(1,2)+".png")
                    }
                }
                this.sendCards[0]=this.qiandun[0]+" "+this.qiandun[1]+" "+this.qiandun[2]
                this.sendCards[1]=this.zhongdun[0]+" "+this.zhongdun[1]+" "+this.zhongdun[2]+" "+this.zhongdun[3]+" "+this.zhongdun[4]
                this.sendCards[2]=this.houdun[0]+" "+this.houdun[1]+" "+this.houdun[2]+" "+this.houdun[3]+" "+this.houdun[4]
                console.log(this.sendCards)

            }


        },
    }
</script>

<style lang="scss" scoped>
  .loginbg {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;

    background: url("../pictures/cards.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    -ms-interpolation-mode: bicubic;
    -webkit-background-size: cover;
    -o-background-size: cover;
    .qian {
      li {
        float: left;
        list-style: none;
        img {
          margin-left: 50px;
          width: 90px;
        }
      }
    }
    .zhong {
      li {
        float: left;
        list-style: none;
        img {
          margin-left: 25px;
          width: 90px;
        }
      }
    }
    .hou {
      li {
        float: left;
        list-style: none;
        img {
          margin-left: 25px;
          width: 90px;
        }
      }
    }
    img {
      z-index: 0;
    }
    .phb {
      z-index: 1;
      margin-top: -85%;
      margin-left: 80px;
      p {
        text-align: center;
        font-family: "隶书",fantasy;
        font-size: 30px;
        margin-block-end: 10px;
        margin-bottom: 10px;
      }
    }

    .buttons {
      img {
        cursor: pointer;
        width: 197px;
        height: 80px;
      }
    }
  }
</style>


