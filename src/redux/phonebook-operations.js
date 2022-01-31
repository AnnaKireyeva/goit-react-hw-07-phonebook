import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://61f4180410f0f7001768c7fb.mockapi.io/';

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
