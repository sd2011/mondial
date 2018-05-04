import axios from "axios";

export const FETCH_USER = "fetch_user";
export const FETCH_USERS = "fetch_users";
export const INSERT_GROUPS_WINNERS = "insert_groups_winners";

export  const fetchUsers = () => {
  const request = axios.get('http://127.0.0.1:5000/users');

  return{
    type: FETCH_USERS,
    paload: request
  };
};

export  const fetchUser = async (values, callback) => {
  const request = await axios
  .post('http://127.0.0.1:5000/user', values)
  .then(res => res.data);
  console.log(request);

    return{
      type: FETCH_USER,
      payload: request
    };
};

export const insertGroupsWinners = async (values) => {
  const request = await axios
  .post("http://127.0.0.1:5000/groupsWinners", values)
  .then (res => res.data);
  console.log(request);

  return{
    type: INSERT_GROUPS_WINNERS,
    payload: request
  };
};
