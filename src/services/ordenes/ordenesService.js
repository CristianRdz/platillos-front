import { API_URL } from "../../utils/constants";
import { fetchClient, getUserData } from "../../utils/fetchClient";
// fetchClient(url, method, body)
export const getOrdenes = async () => {
  try {
    let data = await fetchClient("/api/orden/", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getOrdenesActivos = async () => {
  try {
    let data = await fetchClient("/api/orden/estatus/1", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getGananacias = async () => {
  try {
    let data = await fetchClient("/api/orden/ganancias", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getGananaciasFechas = async (fechaInicio, fechaFin) => {
  try {
    let data = await fetchClient(
      `/api/orden/ganancias/${fechaInicio}/${fechaFin}`,
      "GET",
      null
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const saveOrden = async (orden) => {
  try {
    let data = await fetchClient("/api/orden/", "POST", orden);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateOrden = async (orden) => {
  try {
    let data = await fetchClient("/api/orden/", "PUT", orden);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const removeOrden = async (id) => {
  try {
    let data = await fetchClient(`/api/orden/${id}`, "DELETE", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getOrden = async (id) => {
  try {
    let data = null;
    data = await fetchClient(`/api/orden/${id}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getOrdenesUsuario = async (id) => {
  try {
    let data = null;
    data = await fetchClient(`/api/orden/usuario/${id}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
}
export const getOrdenActualUsuario = async (id) => {
  try {
    let data = null;
    data = await fetchClient(`/api/orden/usuario/actual/${id}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
}
