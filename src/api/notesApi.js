import axiosRequest from "./axiosRequest";

export const getAllNotes = async (folder_name = "") => {
  let url = "/notes";
  if (folder_name) {
    url = `/notes?folder_name=${folder_name}`;
  }
  let response = await axiosRequest("get", url);
  return response;
};

export const getFoldersList = async () => {
  let response = await axiosRequest("get", "/folders");
  return response;
};

export const editNotes = async (id, data) => {
  let response = await axiosRequest("put", `/notes/${id}`, data);
  return response;
};

export const deleteNote = async (id) => {
  let response = await axiosRequest("delete", `/notes/${id}`);
  return response;
};

export const addNotes = async (data) => {
    let response = await axiosRequest("post", `/notes`,data);
    return response;
  };