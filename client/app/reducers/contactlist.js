import * as types from '../constants/ActionTypes';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import values from 'lodash/values';
import chain from 'lodash/chain';
import keyBy from 'lodash/keyBy';
import _ from 'lodash';

const initialState = {
  isFetching: false,
  contacts: [],
  contactsById: {}
}

const actionMapping = {
  [types.ADD_CONTACT]: addContact,
  [types.DELETE_CONTACT]: deleteContact,
  [types.REQUESTING_CONTACTS]: requestContacts,
  [types.RECEIVE_CONTACTS]: receiveContacts,
  [types.REQUEST_CONTACT_DETAIL]: requestContactDetail,
  [types.RECEIVE_CONTACT_DETAIL]: receiveContactDetail,
  default: state => state
}

export default function reducer(state = initialState, action) {
  return (actionMapping[action.type] || actionMapping['default'])(state, action);
}



function deleteContact(state, action){
    return {
      contacts: state.contacts.filter(id => id !== action.id),
      contactsById: omit(state.contactsById, action.id)
    };
}
function addContact(state, action) {
  const newId = state.contacts.length + 1;
  return {
    contacts: [...state.contacts, newId],
    contactsById: {...state.contactsById,
     [newId]: {id: newId,
      name: action.name}
    }
  };
}

function requestContacts(state, action){
   return {...state, isFetching:true}
}

function requestContactDetail(state, action){
  return {...state, isFetching:true}
}

function receiveContactDetail(state, action){
  var contact = {[action.contactDetail.id]: action.contactDetail}
  return {...state,
    isFetching: false,
    contactsById: {...state.contactsById, ...contact}
  }
}

function receiveContacts(state, action){
   return {...state,
     isFetching: false,
     contacts: _(action.contacts).chain().pick('id').values().value(),
     contactsById: keyBy(action.contacts, 'id')
   }
}
