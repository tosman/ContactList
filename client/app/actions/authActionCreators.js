import * as types from '../constants/ActionTypes';
import {settings} from '../settings'

export function loggingIn(){
  return {
    type: types.LOGGING_IN
  }
}

export function loginSucceeded(user){
  return {
    type: types.LOG_IN_SUCCEEDED,
    user
  }
}

export function loginFailed(response){
  return {
    type: types.LOG_IN_FAILED,
    response
  }
}

export function login(loginData){
  return function (dispatch) {
    dispatch(loggingIn())
    return fetch(settings.serverUrl + '/auth/login', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       username: loginData.username,
       password: loginData.password
      })
    }).then(response => {
      console.log(response);
        if(response.ok){
          return response.json()
        } else {
          throw ' oh noo ';
        }
     })
      .then(json =>{
        dispatch(loginSucceeded(json))
      }
      ).catch(resp => dispatch(loginFailed(resp)))
  }
}

export function registering(){
  return {
    type: types.REGISTERING
  }
}

export function registerSucceeded(user){
  return {
    type: types.REGISTER_SUCCEEDED,
    user
  }
}

export function registerFailed(response){
  return {
    type: types.REGISTER_FAILED,
    response
  }
}

export function register(registerData){
  return function (dispatch) {
    dispatch(registering())
    return fetch(settings.serverUrl + '/auth/register', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)
    }).then(response => response.json())
      .then(json =>
        dispatch(registerSucceeded(json))
      ).catch(resp => dispatch(registerFailed(resp)))
  }
}
