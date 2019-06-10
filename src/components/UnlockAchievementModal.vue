<template>
        <div class="modal">
            <div class="modal-content">
                <p class="modal-header-text">Achievement unlocked! </p>
                <img :src="icon" alt="achievement-icon">
                <p class="modal-header-name"> {{title}}  </p>
                <p class="modal-header-points">+ {{points}} life points</p>
            </div>   
        </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'


@Component
export default class UnlockAchievementModal extends Vue {
    @Prop({default:'title'}) title:string;
    @Prop({default:'title'}) icon:string;
    @Prop({default:0}) points:number;

    created(){
    }

}
</script>

<style lang="scss">

 .modal{
    position: absolute;
    top: 50px;
    width: 50%;
    height: 100px;
    z-index: 1000;
    margin: 300px 25%;
    display: block;
    padding: 20px;
    border-radius: 4px;
    background: #FFEB3B;
    box-shadow:0px 0px 20px 8px #8c7c37
    
}
.modal-header-text{
    font-size: 2em;
    width: 120%;
    text-align: center;
    position: absolute;
    left: -12%;
    background: #ffd33b;
    border-radius: 38px;
    text-transform: uppercase;
    top: -48px;
    font-weight: bold;
    padding: 5px 0;
    line-height: 64px;
    text-indent: -18px;
    text-shadow: 1px 0px 2px #423902;
    }
    .modal-header-text::before{
        content: url('../../src/assets/mountain.png');
        transform: scale(0.9);
        padding: -6px 29px;
        line-height: 11px;
        float: left;
        margin-left: 22px;
    }
    .modal-content{
        width:100%;
        float:left;
        height:100px;
        margin-top: 50px;
    }
    .modal-content img{
        float: left;
        margin-top: 6px;
        margin-right: 7px;
    }
    .modal-header-name{
        float: left;
        margin-top: 22px;
    }
    .modal-header-points{
        float: left;
        margin-top: 17px;
        margin-left: 23px;
        background: #004661;
        padding: 5px 16px;
        text-shadow:1px 1px 1px #ffeb3b;
        border-radius: 18px;
        color: white;
    }
    




</style>
