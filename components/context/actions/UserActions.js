import axios from "axios";

export const addUser = async (formFields) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post("/api/user/add", formFields, headers);

    if (res) {
      return res.data;
    }
  } catch (error) {
    return error.response.data;
  }

  return "field recieved";
};

export const logInUser = async (formFields) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post("/api/user/login", formFields, headers);
    if (res) {
      return res.data;
    }
  } catch (error) {
    if(error) return error.response.data;
  }

  return "field recieved";
};


export const deletaAll = async () => {
  
  try {
    const res = await axios.delete("/api/user/deleteAll");
    if (res) {
      return res.data;
    }
  } catch (error) {
    if(error) return error.response.data;
  }

  return "All Users deleted";
};

export const getUserById = async (id) => {
  try {
    const res = await axios.get(`/api/user/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log('error')
    if(error) return error;
  }

};
