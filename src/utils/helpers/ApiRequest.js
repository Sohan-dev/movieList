import axios from 'axios';
import {Platform} from 'react-native';
import constants from './constants';

export async function postApi(url, body, header) {
  console.log(constants.BASE_URL + url);
  const response = await axios({
    method: 'POST',
    baseURL: constants.BASE_URL,
    url: url,
    data: body,

    headers: {
      source: constants.SOURCE,
      key: constants.API_KEY,
      Accept: header.Accept,
      deviceType: Platform.OS,
      'Content-Type': header.contenttype,
      Authorization: 'Bearer ' + header.token,
    },
  });
  return response;
}

export async function getApi(url, header) {
  const response = await axios({
    method: 'GET',
    baseURL: constants.BASE_URL,
    url: url,
    headers: {
      source: constants.SOURCE,
      key: constants.API_KEY,
      Accept: header.Accept,
      deviceType: Platform.OS,
      'Content-Type': header.contenttype,
      Authorization: 'Bearer ' + header.token,
    },
  });

  return response;
}
