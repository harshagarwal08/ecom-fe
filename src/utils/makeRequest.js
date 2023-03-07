import axios from 'axios';

const authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
  
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }

const makeAuthRequest = async(apiEndPoint, dynamicConfig) => {
    const requestDetails = {
        baseURL: 'http://localhost:4000',
        url: apiEndPoint.url,
        method: apiEndPoint.method,
        ...dynamicConfig,
      };
    const { data } = await axios(requestDetails);
    return data;
}

const makeRequest = async(apiEndPoint, dynamicConfig, token) => {
    const requestDetails = {
        baseURL: 'http://localhost:8080',
        url: apiEndPoint.url,
        method: apiEndPoint.method,
        ...dynamicConfig,
        headers: {
          authorization: token,
        },
      };
    const { data } = await axios(requestDetails);
    return data;
}

export { makeAuthRequest, makeRequest, authHeader};