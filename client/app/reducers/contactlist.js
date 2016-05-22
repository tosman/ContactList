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
  contactsById: {},
  loginStatus: ''
}

const actionMapping = {
  [types.ADD_CONTACT_SUCCEEDED]: addContactSucceeded,
  [types.DELETE_CONTACT]: deleteContact,
  [types.REQUESTING_CONTACTS]: requestContacts,
  [types.RECEIVE_CONTACTS]: receiveContacts,
  [types.REQUEST_CONTACT_DETAIL]: requestContactDetail,
  [types.RECEIVE_CONTACT_DETAIL]: receiveContactDetail,
  [types.LOGGING_IN]: loggingIn,
  [types.LOG_IN_FAILED]: loginFailed,
  [types.LOG_IN_SUCCEEDED]: loginSucceeded,
  default: state => state
}

export default function reducer(state = initialState, action) {
  return (actionMapping[action.type] || actionMapping['default'])(state, action);
}

// AUTH

function loggingIn(state, action){
  return {
    ...state,
    loginStatus: 'pending'
  }
}

function loginSucceeded(state, action){
  return {
    ...state,
    user: action.user,
    loginStatus: 'success'
  }
}

function loginFailed(state, action){
  return {
    ...state,
    loginStatus: 'failed'
  }
}

//CONTACTS

function deleteContact(state, action){
    return {
      contacts: state.contacts.filter(id => id !== action.id),
      contactsById: omit(state.contactsById, action.id)
    };
}
function addContactSucceeded(state, action) {
  let contact = action.contact;
  return {
    contacts: [...state.contacts, contact.id],
    contactsById: {...state.contactsById,
     [contact.id]: contact
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
  return state;
}

function receiveContacts(state, action){
   return {...state,
     isFetching: false,
     contacts: _(action.contacts).chain().pick('id').values().value(),
     contactsById: keyBy(action.contacts, 'id')
   }
}
