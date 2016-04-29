import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';

const initialState = {
  contacts: [1],
  contactsById: {
    1: {
      id: 1,
      name: 'Theodore Roosevelt'
    }
  }
}

const actionMapping = {
  [types.ADD_CONTACT]: addContact,
  [types.DELETE_CONTACT]: deleteContact,
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
