import * as CONSTANTS from '../constants/_constants';
import axios, { AxiosResponse } from 'axios';
import * as Types from '../types/types'

export async function getUsersRequest(): Promise<AxiosResponse | void> {
  return await axios.get(CONSTANTS.API_URL).then(res  => res.data)
  .catch(err => console.log(err));
}

export async function getSingleUserRequest(id: Types.User['id']): Promise<AxiosResponse | void> {
  if (typeof id == 'number') {
    return await axios.get(CONSTANTS.API_URL + id + '/').then(res  => res.data)
    .catch(err => console.log(err));
  }
  return
  
}

export async function createUserRequest(user : Types.User): Promise<AxiosResponse | void> {
  return await axios({
    method: 'post',
    url: CONSTANTS.API_URL,
    headers: {}, 
    data: {
      first_name: user.first_name,
      last_name: user.last_name,
      birth_date: user.birth_date,
      gender: user.gender,
      job: user.job,
      biography: user.biography,
      is_active: user.is_active ? 'true' : 'false'
    }
  })
  .then(res => res.data.id)
  .catch(err => console.log(err));
}

export async function editUserRequest(user : Types.User): Promise<AxiosResponse | void> {
  console.log(user)
  return await axios({
      method: 'put',
      url: CONSTANTS.API_URL + user.id ,
      headers: {}, 
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        birth_date: user.birth_date,
        gender: user.gender,
        job: user.job,
        biography: user.biography,
        is_active: user.is_active ? 'true' : 'false'
      }
    })
  .then(res => res)
  .catch(err => console.log(err));
}

export async function deleteUserRequest(id : Types.User['id']): Promise<AxiosResponse | void> {
  return await axios.delete(CONSTANTS.API_URL + id)
  .then(res => res)
  .catch(err => console.log(err));
}