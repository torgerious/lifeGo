
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class RankBar extends Vue{
    @Prop({default:1}) rank:number;
    @Prop({default:50}) progress:number;
    @Prop({default:'rookie'}) RankName:string;
    @Prop({default:'./chevron.png'}) rankIconUrl:string;

}
</script>


<template>
    <div class="rankbar-wrapper">
            <img :src="rankIconUrl" alt="rank icon">
        <div class="rankbar-content">
            <p>{{RankName}}</p>
            <p>{{rank}} / 50</p>
        </div>
        <div class="progress"  :style="{ width:  progress + '%' }">
    
        </div>
    </div>
</template>


<style lang="scss" scoped>
 .rankbar-wrapper{
    width: 53%;
    background: #dcb940;
    border-radius: 10px;
    height: 20px;
    margin-top:-59px;
    float: left;
    margin-left: 5%;
     img{
        height: 32px;
        margin: -3px -7px 0 4px;
        color: white;
        float: right;
        }
    .rankbar-content{
            width:  152px;
    display: block;
    margin: 0 auto;
    height: 20px;
           
            p{
                float: left;
                margin-top: 3px;
                color: white;
                text-indent: 5px;
                font-size: 12px;
            }
        }
    }
    .progress{
    transition: 0.3s;
    height: 20px;
    min-width: 0%;
    background: #004661;
    border-radius: 10px;
    color: white;
    text-align: center;
        margin-top: -20px;

     
 }
</style>
