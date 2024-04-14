import { useState } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  let token = null;

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
    return response.data;
  };

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    setResources(resources.concat(response.data));
    return response.data;
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    setResources(
      resources.map((resource) =>
        resource.id !== id ? resource : response.data,
      ),
    );
    return response.data;
  };

  return {
    resources,
    setToken,
    getAll,
    create,
    update,
  };
};

export default useResource;
