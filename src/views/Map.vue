<template>
    <div >

    <transition name="bounce">
        <UnlockAchievementModal 
            v-if="unlockAchievement"
            :title="achievementToUnlock.name"
            :icon="achievementToUnlock.icon"
            :points="achievementToUnlock.points">
        </UnlockAchievementModal>
    </transition>

        <p>Maps</p>
        <GmapMap ef="mapRef"
            :center="userCurrentLocation"
            :zoom="18"
            map-type-id="roadmap"
            style="width: 100%; height: 100vh"
            :options="{   
                disableDefaultUi: true,
                styles:this.MapStyle,
            }"
            >
        <div class="marker-span">
            <GmapMarker :label="'Me'" :animation="2" ref="mapRef" :position="userCurrentLocation" :clickable="true" :draggable="true"/>
            <GmapMarker :icon="achieve.icon"
             v-for="(achieve, i) in achievements" :key="i + achieve" :label="achieve.name"  :position="achieve.location" :clickable="true"/>

        </div>
</GmapMap>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import firebase from 'firebase';
import { mutationStringAchievements, IAchievements, achievements, actionStringAchievements, getterStringAchievements, Icoordinates } from '../store/achievements';
import { Getter,  Action, Mutation} from "vuex-class";
import MapExtension from './MapExtenstion.vue';
import UnlockAchievementModal from '@/components//UnlockAchievementModal.vue';

   
@Component({
  components: {
    UnlockAchievementModal,
  },
})

export default class Maps extends MapExtension {
    public database = firebase.database();
    public db = firebase.firestore();
    public unlockAchievement:boolean = false;
    public userCurrentLocation:Icoordinates = {lat:10, lng:10}
    public distanceToNearestAchievement:number | null = null;
    public achievementToUnlock:IAchievements | null = null;

    
    

    @Action(actionStringAchievements.GET_ACHIEVEMENTS) getAchievements:() => Promise<IAchievements[]>;   
    @Getter(getterStringAchievements.ACHIEVEMENTS) achievements:IAchievements[];


    public getLocation():void{
        console.log("Running")
        navigator.geolocation.getCurrentPosition(position => {
            this.userCurrentLocation = { lat: position.coords.latitude, lng: position.coords.longitude};
            console.log("Positiion", this.userCurrentLocation);
        });
    };


   
    

    //Calculates distance between two coordinates in KM
    public  calculateDistance (lat1:number, lon1:number, lat2:number, lon2:number, achievements:IAchievements):void{
        let R:number = 6371; // KM

        //coordinates
        let latRads1:number = this.toRadians(lat1);
        let latRads2:number = this.toRadians(lat2);
        let latDeltaRads:number = this.toRadians(lat2-lat1);
        let lonDeltaRads:number = this.toRadians(lon2-lon1);

        //Calculate formula
        let a:number = Math.sin(latDeltaRads/2) * Math.sin(latDeltaRads/2) + Math.cos(latRads1) * Math.cos(latRads2) * Math.sin(lonDeltaRads/2) * Math.sin(lonDeltaRads/2);
        let c:number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        let DistanceInKm:string = (R * c).toFixed(1);
        let distanceInKmAsNumber = parseInt(DistanceInKm);
        console.log("distance in KM", DistanceInKm, "to ", achievements.name);

        this.achievementToUnlock = achievements
        this.distanceToNearestAchievement = distanceInKmAsNumber;
    }

    public toRadians(value:number):number {
        return value * Math.PI / 180;
    }



    @Watch('distanceToNearestAchievement')
    triggerEvent(){
        if(this.distanceToNearestAchievement !== null && this.distanceToNearestAchievement < 50){
            this.unlockAchievement = true;
        }
      
    }


    public mounted():void{
          this.$nextTick(function () {
            window.setInterval(() => {
                // this.getLocation();
               //Get current position end check if user is near an achievement. 
                this.userCurrentLocation = {lat:58.971459, lng:5.731973};
                

              //Check distance to achievements
              for(let i = 0; i < this.achievements.length; i++){
                  let name = this.achievements[i].name;
                  console.log("name in list", name)
                    this.calculateDistance(this.userCurrentLocation.lat, this.userCurrentLocation.lng, this.achievements[i].location.lat, this.achievements[i].location.lng, this.achievements[i]); 
              }

                // this.calculateDistance(this.userCurrentLocation.lat, this.userCurrentLocation.lng, this.achievements[0].location.lat, this.achievements[0].location.lng);                
            },5000);
            
        })
        
    }

    public created():void{

        this.getLocation();
        this.getAchievements().then(res => {
        console.log("achieve?", this.achievements)
        // this.calculateDistance(this.userCurrentLocation.lat, this.userCurrentLocation.lng, this.achievements[0].location.lat, this.achievements[0].location.lng);


    
    // let check = this.$refs.mapRef.el;
    //      console.log(check, "check");
        });
         
    }
}

</script>


<style lang="scss">
.marker-span{
    background:red;
    width:20px;
    height:20px;
}


/* Animation */ 
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
   transform: scale(1.5);

  }
  100% {
    transform: scale(1);

  }
}


</style>