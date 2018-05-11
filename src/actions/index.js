import axios from "axios";

export const FETCH_USER = "fetch_user";
export const FETCH_CURRENT_USER = "fetch_current_user";
export const FETCH_USERS = "fetch_users";
export const INSERT_GROUPS_WINNERS = "insert_groups_winners";
export const INSERT_WINNERS = "insert_winners";


 const server = async (addres, values) => {
  const request = await axios
  .post('http://127.0.0.1:5000/' + addres , values && values)
  .then(res => res.data);

    return request;
};



export const fetchUser = (values) => {
  const request = server('user', values);
  console.log(request);
  return{
    type: FETCH_USER,
    payload: request
  };
}
export const fetchCurrentUser = (values) => {
  const request = server('user', values);

  return{
    type: FETCH_CURRENT_USER,
    payload: request
  };
}
export const insertGroupsWinners = (values) => {
  const request = server('groupsWinners', values);
  return{
    type: INSERT_GROUPS_WINNERS,
    payload: request
  };
}
export const insertWinners = (values) => {
  const request = server('winners', values);
  return{
    type: INSERT_WINNERS,
    payload: request
  };
}
export const fetchUsers = async () => {
  const request = await axios
  .get('http://127.0.0.1:5000/users')
  .then(res => res.data);

  return{
    type: FETCH_USERS,
    payload: request
  };
}
