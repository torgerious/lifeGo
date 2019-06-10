import { GetterTree, MutationTree, ActionTree } from "vuex";
import firebase from 'firebase';
import { DB } from '../main';


export interface AchievementState {
    achievements:IAchievements[] | null
}
export interface Icoordinates{
    lat:number,
    lng:number,
}
export interface IAchievements{
    name:string,
    points:number
    location:Icoordinates
    icon:string;
}

export const enum mutationStringAchievements{
    SET_ACHIEVEMENTS = 'setAchievements'
}
export const enum actionStringAchievements{
    GET_ACHIEVEMENTS = 'getAchievements'
}
export const enum getterStringAchievements{
    ACHIEVEMENTS = 'achievements'
}

export const state:AchievementState = {
    achievements:null
};



export const getters: GetterTree<AchievementState, any> = {
    achievements: state => state.achievements
};

export const mutations: MutationTree<any> = {
    setAchievements(state, payload:IAchievements[]){ console.log("PAYLOAD", payload), state.achievements = payload;}
};

export const actions: ActionTree<AchievementState, any> = {
    getAchievements({commit}, payload:IAchievements[]):Promise<IAchievements[]>{

        return new Promise((resolve, reject) => {
        let achievementList:IAchievements[] = [];
        let achievement:IAchievements | null = null;
        
        DB.collection("achievements").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let name = doc.data().name
            let points = doc.data().points
            let location = doc.data().location
            let icon = doc.data().icon

            console.log(achievement);
            console.log(name);
            console.log("location from state", location);

            let setLocation:Icoordinates = {lat:location.lat, lng:location.lng}
            console.log("setLocation", setLocation);

            achievement = {name: name, points:points, location:setLocation, icon:icon};
            achievementList.push(achievement)            
            
            })
            commit(mutationStringAchievements.SET_ACHIEVEMENTS, achievementList);
            resolve(achievementList);

        }).catch(err => {
            reject(err)
        });
 
        // });
    });
    //  });
    }
};

export const achievements = {
    actions,
    mutations,
    getters,
    state
};