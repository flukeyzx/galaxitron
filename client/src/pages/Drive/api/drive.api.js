import axios from "axios";

export const getFolderItems = async (folderId) => {
  try {
    const res = await axios.get(`/drive/${folderId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getFolderItems: ", error.message);
    throw error;
  }
};

export const getFolderPath = async (folderId) => {
  try {
    const res = await axios.get(`/drive/path/${folderId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getFolderPath: ", error.message);
    throw error;
  }
};
