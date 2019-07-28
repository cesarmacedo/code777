//import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native';

class AsyncStoragec {
    
  constructor() {}

    saveTokenStorage = async (key,value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
          } catch (error) {
            // Error saving data
          }
    }

    retrieveTokenStorage = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            return value;
          }else{
            return false;
          }
        } catch (error) {
          return error;
          // Error retrieving data
        }
    }

    deleteTokenSorage = async (key) => {
        try{
            await AsyncStorage.removeItem(key, function(callback){
                console.log(callback)
            })
           // return callback;
        } catch (error) {
            console.log(error)
        }
    }
}

storage = new AsyncStoragec()

export default storage;