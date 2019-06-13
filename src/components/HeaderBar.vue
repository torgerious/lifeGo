<template>
    <div class="header-wrapper">
        <div class="header-wrapper__menu-section"></div>
        <div class="header-wrapper__user-section">
            <p>{{username}}</p>
            <img :src="profileImage" alt="profile image" >
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HeaderBar extends Vue {
    @Prop({default:'name'}) username:string;
    @Prop({default:'some image coming'}) profileImage:string;

}
</script>

<style lang="scss" scoped>
    .header-wrapper{
        width: 100%;
        height:10vh;
        background: #FFEB3B;
        display: flex;
    }
  
    .header-wrapper__user-section{
            width: 50%;
            display: inline-flex;
            justify-content: flex-end;
            align-items: center;
            margin: 12px;
        p{
            color: #2c3e50;
            margin: 0 10px;
            font-weight: bold;
            text-transform: capitalize;
            font-size: 20px;
            text-shadow: 1px 0px 2px #423902;
        }
        img{
            width:40px;
            height:40px;
            border-radius: 50%;
                border: 3px solid #333;
        }

    }


    .header-wrapper__menu-section{
        width: 50%;
            display: inline-flex;
            justify-content: flex-end;
    }

</style>
