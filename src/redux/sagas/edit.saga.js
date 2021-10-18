import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateUser(action) {
    try {
      const userInfo = action.payload;
      console.log('User info in user saga - ', userInfo);
      axios.post( '/api/user/edit', userInfo )
    } catch (error) {
      console.log('Error in updateUser in user saga - ', error);
      alert('Unable to update user info.')
    }
  }
  
  function* editSaga() {
    yield takeLatest('UPDATE_USER', updateUser);
  }

export default editSaga;
