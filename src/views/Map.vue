<template>
    <div>
        <HeaderBar 
            v-if="user"
            :username="user.username"
            :profileImage="user.profileImageUrl">
        </HeaderBar>

        <RankBar
            :rank="0">
        </RankBar>

    <transition name="bounce">
        <UnlockAchievementModal 
            v-if="unlockAchievement"
            :title="achievementToUnlock.name"
            :icon="achievementToUnlock.icon"
            :points="achievementToUnlock.points">
        </UnlockAchievementModal>
    </transition>

        <CircleMenu></CircleMenu>

        <GmapMap ef="mapRef"
            :center="userCurrentLocation"
            :zoom="18"
            map-type-id="roadmap"
            style="width: 100%;     height: 75vh;"
            disableDefaultUI="true"
            :options="{   
                disableDefaultUi: true,
                styles:this.MapStyle,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                 zoomControl: false
            }"
            >
        <div class="marker-span">
            <GmapCluster>
                <GmapMarker :label="'Me'" :animation="2" ref="mapRef" :position="userCurrentLocation" :clickable="true" :draggable="true"/>
                <GmapMarker :icon="achieve.icon"
                            v-for="(achieve, i) in achievements" :key="i + achieve" :label="achieve.name"  :position="achieve.location" :clickable="true"/>
            </GmapCluster>


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
import HeaderBar from '@/components//HeaderBar.vue';
import { actionStringUser, IUser, getterStringUser } from '../store/user';
import RankBar from '@/components/RankBar.vue';
import CircleMenu from '../components/CircleMenu.vue';

   
@Component({
  components: {
    UnlockAchievementModal,
    HeaderBar,
    RankBar,
    CircleMenu
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
    @Action(actionStringUser.GET_USER) getUser:() => Promise<IUser>;
    @Getter(getterStringAchievements.ACHIEVEMENTS) achievements:IAchievements[];
    @Getter(getterStringUser.user) user:IUser;

    public getLocation():void{
        // console.log("Getting location");
        navigator.geolocation.getCurrentPosition(position => {
            this.userCurrentLocation = { lat: position.coords.latitude, lng: position.coords.longitude};
            // console.log("Positiion", this.userCurrentLocation);
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

         if(distanceInKmAsNumber < 50){
            this.unlockAchievement = true;
        }

       
    }

    public toRadians(value:number):number {
        return value * Math.PI / 180;
    }



    // @Watch('distanceToNearestAchievement')
    // triggerEvent(){
    //         console.log("distanceToNearestAchievement", this.distanceToNearestAchievement);

    //     if(this.distanceToNearestAchievement !== null && this.distanceToNearestAchievement < 50){
    //         this.unlockAchievement = true;
    //     }
      
    // }


    public mounted():void{
          this.$nextTick(function () {
            window.setInterval(() => {
                // this.getLocation();
               //Get current position end check if user is near an achievement. 
                this.userCurrentLocation = {lat:58.971459, lng:5.731973};
                

              //Check distance to achievements
              for(let i = 0; i < this.achievements.length; i++){
                  let name = this.achievements[i].name;
                   if(this.unlockAchievement === false){
                        this.calculateDistance(this.userCurrentLocation.lat, this.userCurrentLocation.lng, this.achievements[i].location.lat, this.achievements[i].location.lng, this.achievements[i]);
                    }

              }
             

                // this.calculateDistance(this.userCurrentLocation.lat, this.userCurrentLocation.lng, this.achievements[0].location.lat, this.achievements[0].location.lng);                
            },5000);
            
        })
        
    }

    public created():void{
        this.getUser().then(res => {console.log("res form promise", res)});
        this.getLocation();
        this.getAchievements().then(res => {
         console.log("achieve?", this.achievements)
        });
         
    }
}

</script>


<style lang="scss">


    #app > div > div.vue-map-container > div.vue-map > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div > div > div > div
    {
        color: rgb(0, 0, 0);
        font-size: 14px;
        font-family: Roboto, Arial, sans-serif;
        background: white;
        padding: 5px;
        border-radius: 7px;
        margin-top: 57px;
    }
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