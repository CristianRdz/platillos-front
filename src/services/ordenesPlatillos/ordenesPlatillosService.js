import { API_URL } from "../../utils/constants";
import { fetchClient, getUserData } from "../../utils/fetchClient";
// fetchClient(url, method, body)
export const getOrdenesPlatillos = async () => {
  try {
    let data = await fetchClient("/api/ordenplatillo/", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const saveOrdenPlatillo = async (platillo) => {
  try {
    let data = await fetchClient("/api/ordenplatillo/", "POST", platillo);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateOrdenPlatillo = async (platillo) => {
  try {
    let data = await fetchClient("/api/ordenplatillo/", "PUT", platillo);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const removeOrdenPlatillo = async (id) => {
  try {
    let data = await fetchClient(`/api/ordenplatillo/${id}`, "DELETE", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getOrdenPlatillo = async (id) => {
  try {
    let data = null;
    data = await fetchClient(`/api/ordenplatillo/${id}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getOrdenPlatilloByOrden = async (id) => {
    try {
        let data = null;
        data = await fetchClient(`/api/ordenplatillo/orden/${id}`, "GET", null);
        return data;
    } catch (error) {
        console.error(error);
    }
    }
    
