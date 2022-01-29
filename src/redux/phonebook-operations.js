import axios from 'axios';
import phonebookActions from './phonebook-actions';

axios.defaults.baseURL = 'https://61f4180410f0f7001768c7fb.mockapi.io/';

const fetchContacts = () => dispatch => {
  dispatch(phonebookActions.fetchContactsRequest());
  axios
    .get('/contacts/')
    .then(({ data }) => dispatch(phonebookActions.fetchContactsSuccess(data)))
    .catch(error => dispatch(phonebookActions.fetchContactsError(error)));
};

const addContact = newContact => dispatch => {
  const contact = {
    name: newContact.name,
    number: newContact.number,
  };
  dispatch(phonebookActions.addContactRequest());
  axios
    .post('/contacts', contact)
    .then(({ data }) => dispatch(phonebookActions.addContactSuccess(data)))
    .catch(error => dispatch(phonebookActions.addContactError(error)));
};

const deleteContact = contactId => dispatch => {
  dispatch(phonebookActions.deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(phonebookActions.deleteContactSuccess(contactId)))
    .catch(error => dispatch(phonebookActions.deleteContactError(error)));
};

const phonebookOperations = {
  fetchContacts,
  addContact,
  deleteContact,
};

export default phonebookOperations;
