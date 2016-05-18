import * as types from '../constants/ActionTypes';
import {settings} from '../settings'


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

    return fetch(settings.serverUrl + '/api/contacts')
      .then(response => response.json())
      .then(json =>
        {
          console.log('hi');
          dispatch(receiveContacts(json));
        }
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
    dispatch(requestingContacts());
    return fetch(settings.serverUrl + '/api/contact')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveContactDetail(json))
      ).catch(resp => console.log(resp))
  }
}

export function addingContact(){
  return {
    type: types.ADDING_CONTACT
  }
}
export function addContactSucceeded(contact){
  return {
    type: types.ADD_CONTACT_SUCCEEDED,
    contact
  }
}

export function addContactFailed(response){
  return {
    type: types.ADD_CONTACT_FAILED,
    response
  }
}
export function addContact(data){
  return function (dispatch){
    dispatch(addingContact());
    return fetch(settings.serverUrl + '/api/contacts', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => {
      console.log(response);
        if(response.ok){
          var contact = data;
          contact.id = response.json();
          dispatch(addContactSucceeded(response.json()))
          Actions.contactList();
        } else {
          throw 'err';
        }
     }).catch(resp => dispatch(addContactFailed(resp)))
  }
}
