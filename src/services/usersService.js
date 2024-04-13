import axios from 'axios';
import * as constants from '../utility/constants';

export const getUsers = async () => {
  try {
    const result = await axios.get(constants.getUsers);
    return result.data;
  } catch (error) {
    throw new Error(error?.reponse?.data || 'Unknown error');
  }
}

export const upsertUser = async (user, isInsert) => {
  try {
    const path = isInsert ? constants.createUsers : constants.updateUsers;
    const result = await axios.post(path, user);
    return result.data;
  } catch (error) {
    throw new Error((error.response?.data?.error || error.response?.data) || 'Unknown error');
  }
}

export const deleteUser = async (userId) => {
  console.log(userId);

  try {
    const result = await axios.delete(constants.deleteUser.replace('{0}', userId),
      // {
      //   params: {
      //     userId: userId
      //   }
      // }
    );
    return result.data;
  } catch (error) {
    console.log(error.message);
    throw new Error((error?.response ? error.response?.data : error.message) || 'Unknown error');
  }
}