import { API_URL } from "../../utils/constants";
import { fetchClient, getUserData } from "../../utils/fetchClient";
// fetchClient(url, method, body)
export const getUsuarios = async () => {
  try {
    let data = await fetchClient("/api/usuario/", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getUsuariosActivos = async () => {
  try {
    let data = await fetchClient("/api/usuario/estatus/1", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const save = async (adminusuario) => {
  try {
    let data = await fetchClient("/api/usuario/", "POST", adminusuario);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const update = async (adminusuario) => {
  try {
    let data = await fetchClient("/api/usuario/", "PUT", adminusuario);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const remove = async (id) => {
  try {
    let data = await fetchClient(`/api/usuario/${id}`, "DELETE", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getUsuario = async (id) => {
  try {
    let data = null;
    const userInfo = await getUserData();
    if (userInfo.user.usuario.rol.id_rol === 1) {
      data = await fetchClient(`/api/usuario/${id}`, "GET", null);
    } else {
      data = await fetchClient(`/api/usuario/${id}`, "GET", null);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const changePassword = async (usuario) => {
  try {
    let data = await fetchClient("/api/usuario/pass/", "PUT", usuario);
    return data;
  } catch (error) {
    console.error(error);
  }
};
