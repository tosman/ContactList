import * as types from '../constants/ActionTypes';

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
