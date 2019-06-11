<template>
    <div class="header-wrapper">
        <div></div>
        <div><p>{{username}}</p></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HeaderBar extends Vue {
    @Prop({default:'name'}) username:string;
}
</script>

<style lang="scss" scoped>
    .header-wrapper{
        width: 100%;
        height:10vh;
        background: #FFEB3B;
    }
    p{
        color:white;
    }

</style>
