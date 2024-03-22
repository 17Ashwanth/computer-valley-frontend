import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"

// register API
export const registerAPI = async (users)=>{
    return await commonAPI('POST',`${BASE_URL}/user/register`,users,"")
}

// login API
export const loginAPI = async (users)=>{
    return await commonAPI('POST',`${BASE_URL}/user/login`,users,"")
  
}

// logic to add user details
export const addUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/user/add`,reqBody,reqHeader)
}

//edit profile 
export const editProfileAPI = async (reqBody, reqHeader)=>{
    // id is passed as path parameter
    return await commonAPI('PUT',`${BASE_URL}/user/edit/`,reqBody,reqHeader)
}
