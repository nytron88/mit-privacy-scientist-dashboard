import { callExternalApi } from "./external-api.service";

const apiServer1Url = process.env.REACT_APP_R_SERVER_URL;
const apiServer2Url = process.env.REACT_APP_X_R_SERVER_URL;
const apiServerUrls = [apiServer1Url, apiServer2Url];

export const getScientistResource = async (accessToken) => {
  let responses1 = [];

  for (let i = 0; i < apiServerUrls.length; i++) {
    let apiServerUrl = apiServerUrls[i];
    const config = {
      url: `${apiServerUrl}/api/scientist/get_eta_data`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await callExternalApi({ config });
    responses1.push(response);
  }

  return {
    responses: responses1 || null
  };
};

export const getPermissionsResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrls[0]}/api/all/get_permissions`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
