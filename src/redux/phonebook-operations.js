import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import phonebookActions from './phonebook-actions';

axios.defaults.baseURL = 'https://61f4180410f0f7001768c7fb.mockapi.io/';

// const fetchContacts = () => dispatch => {
//   dispatch(phonebookActions.fetchContactsRequest());
//   axios
//     .get('/contacts/')
//     .then(({ data }) => dispatch(phonebookActions.fetchContactsSuccess(data)))
//     .catch(error => dispatch(phonebookActions.fetchContactsError(error)));
// };

const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// const addContact = newContact => dispatch => {
//   const contact = {
//     name: newContact.name,
//     number: newContact.number,
//   };
//   dispatch(phonebookActions.addContactRequest());
//   axios
//     .post('/contacts', contact)
//     .then(({ data }) => dispatch(phonebookActions.addContactSuccess(data)))
//     .catch(error => dispatch(phonebookActions.addContactError(error)));
// };
const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const contact = { name, number };
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// const deleteContact = contactId => dispatch => {
//   dispatch(phonebookActions.deleteContactRequest());

//   axios
//     .delete(`/contacts/${contactId}`)
//     .then(() => dispatch(phonebookActions.deleteContactSuccess(contactId)))
//     .catch(error => dispatch(phonebookActions.deleteContactError(error)));
// };

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const phonebookOperations = {
  fetchContacts,
  addContact,
  deleteContact,
};

export default phonebookOperations;
