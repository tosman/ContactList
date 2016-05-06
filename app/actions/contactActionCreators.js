import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch'


export function addContact(name)  {
  return {
    type: types.ADD_CONTACT,
    name
  }
}

export function starContact(id){
  return {
    type: types.STAR_CONTACT,
    id
  }
}


export function deleteContact(id) {
  return {
    type: types.DELETE_CONTACT,
    id
  };
}

export function receiveContacts(json) {
  return {
    type: types.RECEIVE_CONTACTS,
    contacts: json,
    receivedAt: Date.now()
  }
}

export function requestingContacts(){
  return {
    type: types.REQUESTING_CONTACTS
  }
}

export function requestContacts() {
  return function (dispatch) {
    dispatch(requestingContacts())

    return fetch(`http://localhost:3000/contacts`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveContacts(json))
      ).catch(resp => console.log(resp))
  }
}

export function receiveContactDetail(json){
  return {
    type: types.RECEIVE_CONTACT_DETAIL,
    contactDetail: json,
    receivedAt: Date.now()
  }
}
export function requestingContactDetail(id){
  return {
    type: types.REQUESTING_CONTACT_DETAIL,
    id: id
  }
}
export function requestContactDetail(id){
  return function (dispatch) {
    dispatch(requestingContacts())

    return fetch(`http://localhost:3000/contact`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveContactDetail(json))
      ).catch(resp => console.log(resp))
  }
}
