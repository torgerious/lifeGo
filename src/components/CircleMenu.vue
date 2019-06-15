
<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { getterStringAchievements, achievements, IAchievements, actionStringAchievements } from '../store/achievements';


@Component
export default class CircleMenu extends Vue  {
    @Prop({default:'./chevron.png'}) rankIconUrl:string;
    
    @Getter(getterStringAchievements.ACHIEVEMENTS) achievements:IAchievements[];
    @Action(actionStringAchievements.GET_ACHIEVEMENTS) getAchievements:() => Promise<IAchievements[]>;
    

    private isShowingList:boolean = false;

    private toggleList():void{
        this.isShowingList = !this.isShowingList;
    }
    
    public created():void{
         this.getAchievements().then(res => {
        //  console.log("achieve?", this.achievements)
        });
    }

}
</script>


<template>
    <div>
        <div class="circle-menu-wrapper" @click="toggleList">
            <img :src="'./achievement.png'" alt="achievements">
        </div>    

        <div class="achievement-list-wrapper" v-if="isShowingList">
            <p>All achievements</p>
            <div class="achievement-item" v-for="(achiev, i) in achievements" :key="i + 'achiev' ">
                <img :src="achiev.icon" alt="achievement icon">
                <p>{{achiev.name}}</p>
                <img  :src="rankIconUrl" alt="achievement icon">
                <p>{{achiev.points}}</p>


            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .circle-menu-wrapper{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        top: 88vh;
        background: #FFEB3B;
        z-index: 99;
        margin-left: calc(50% - 40px);
        text-align: center;
        line-height: 56px;
        box-shadow: 0px 0px 20px 0px #554c0b;
        transition:0.3s;        
        img{
            height:55px;
            width: 55px;
            margin:15px auto;
            display:block;
        }
      
        &:hover{
            padding:5px;
            transition:0.3s;
            background:rgb(255, 231, 18);
        }
    }


    .achievement-list-wrapper{
        width: 100%;
        height: 90vh;
        position: absolute;
        z-index: 100;
        background: #FFEB3B;
        .achievement-item{
            width: 95%;
            margin: 5px 2.5%;
            background: #fff4cd;
            padding: 15px;
            box-sizing: border-box;
            border-radius: 6px;
            font-weight: bold;
            border: 2px solid #ffc559;
            img{
                float: left;
                height: 40px;
                &:nth-child(3){
                    float: right;
                    height: 50px;
                    margin-top: -55px;
                    border-radius: 5px;
                    padding: 5px;
                }
            }

        //       .badge{
        //     float: right;
        // }
        }
    }
</style>
