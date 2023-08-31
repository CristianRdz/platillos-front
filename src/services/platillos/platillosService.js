import { API_URL } from "../../utils/constants";
import { fetchClient, getUserData } from "../../utils/fetchClient";
// fetchClient(url, method, body)
export const getPlatillos = async () => {
  try {
    let data = await fetchClient("/api/platillo/", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getPlatillosActivos = async () => {
  try {
    let data = await fetchClient("/api/platillo/estatus/1", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const savePlatillo = async (platillo) => {
  try {
    let data = await fetchClient("/api/platillo/", "POST", platillo);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updatePlatillo = async (platillo) => {
  try {
    let data = await fetchClient("/api/platillo/", "PUT", platillo);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const removePlatillo = async (id) => {
  try {
    let data = await fetchClient(`/api/platillo/${id}`, "DELETE", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getPlatillo = async (id) => {
  try {
    let data = null;
    data = await fetchClient(`/api/platillo/${id}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
