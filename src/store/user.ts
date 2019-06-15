import { GetterTree, MutationTree, ActionTree } from "vuex";
import firebase from 'firebase';
import { DB } from '../main';


export interface UserState {
    user:IUser | null
}
export interface IUser{
    name:string,
    email:string,
    profileImageUrl:string | null
}


export const enum mutationStringUser{
    SET_USER = 'setUser'
}
export const enum actionStringUser{
    GET_USER = 'getUser'
}
export const enum getterStringUser{
    user = 'user'
}

export const state:UserState = {
    user:null
};



export const getters: GetterTree<UserState, any> = {
    user: state => state.user
};

export const mutations: MutationTree<any> = {
    setUser(state, payload:IUser){ console.log("PAYLOAD", payload), state.user = payload;}
};

export const actions: ActionTree<UserState, any> = {
    getUser({commit}):Promise<IUser>{

        return new Promise((resolve, reject) => {

            let user:Partial<IUser> | null = null;
            let userID = localStorage.getItem('userId');


              DB.collection("user").get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                    let foundUser = doc.data();
                    // console.log("user id found", foundUser)

                    if(foundUser.id === userID){


                        let photoURL = localStorage.getItem('photoURL');            
                        user = foundUser;
                        user.profileImageUrl = photoURL;

                        commit(mutationStringUser.SET_USER, user);
                        resolve(user as IUser);

                    }else {
                        // console.log("Meh...")
                    }
                });
               
            }).catch((err) => {
                reject(err)
            });
        
    });

            // var query = citiesRef.where("username", "==", "thor");
            // console.log("query", query);
        
        // DB.collection("user").get().then((querySnapshot) => {
        // querySnapshot.forEach((doc) => {

        //     let name = doc.data().name
        //     let points = doc.data().points
        //     let location = doc.data().location
        //     let icon = doc.data().icon

        //     console.log(doc);
        //     // console.log(name);
        //     // console.log("location from state", location);

        //     // let setLocation:Icoordinates = {lat:location.lat, lng:location.lng}
        //     // console.log("setLocation", setLocation);

        //     // achievement = {name: name, points:points, location:setLocation, icon:icon};
        //     // achievementList.push(achievement)            
            
        //     })
        //     commit(mutationStringUser.SET_USER, "lol");
        //     resolve(doc);

        // }).catch(err => {
        //     reject(err)
        // });
 
        // });
    // });
    //  });
    // }
    }}

export const user = {
    actions,
    mutations,
    getters,
    state
};