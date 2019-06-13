
<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { getterStringAchievements, achievements, IAchievements, actionStringAchievements } from '../store/achievements';


@Component
export default class CircleMenu extends Vue  {
    
    @Getter(getterStringAchievements.ACHIEVEMENTS) achievements:IAchievements[];
    @Action(actionStringAchievements.GET_ACHIEVEMENTS) getAchievements:() => Promise<IAchievements[]>;
    

    private isShowingList:boolean = false;

    private toggleList():void{
        this.isShowingList = !this.isShowingList;
    }
    
    public created():void{
         this.getAchievements().then(res => {
         console.log("achieve?", this.achievements)
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
            <div v-for="(achiev, i) in achievements" :key="i + 'achiev' ">
                <p>{{achiev.name}}</p>
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
    }
</style>
