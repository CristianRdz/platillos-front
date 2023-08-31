import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getOrdenActualUsuario,
  saveOrden,
} from "../../services/ordenes/ordenesService";
import { getUserData } from "../../utils/fetchClient";
import { saveOrdenPlatillo } from "../../services/ordenesPlatillos/ordenesPlatillosService";

export default function FormOrdenesPlatillos(props) {
  const { platillo, tamanio, nota, openClose } = props;

  const tamanioOptions = [
    { id_tamanio: 1, nombre: "chico" },
    { id_tamanio: 2, nombre: "mediano" },
    { id_tamanio: 3, nombre: "grande" },
  ];

  const initialValues = {
    platillo: platillo ? platillo : "",
    tamanio: tamanio ? tamanio : "",
    nota: nota ? nota : "",
  };

  const validationSchema = Yup.object({
    platillo: Yup.object().required("Requerido"),
    tamanio: Yup.string().required("Requerido"),
    nota: Yup.string(),
  });

  const handleSubmit = async (values) => {
    const tamanio = tamanioOptions.find(
      (tamanio) => tamanio.id_tamanio === parseInt(values.tamanio)
    );
    let pedido = {
      platillo: values.platillo,
      tamanio: tamanio,
      notas: values.nota,
    };
    let usuario = await getUserData();
    usuario = usuario.user.usuario;
    const ordenActual = await getOrdenActualUsuario(usuario.id_usuario);
    if (ordenActual) {
      pedido.orden = ordenActual;
      const respuesta = await saveOrdenPlatillo(pedido);
      if (respuesta) {
        alert("Se ha agregado el platillo");
      } else {
        alert("No se ha podido agregar el platillo");
      }
    } else {
      pedido.usuario = usuario;
      const ordenTemp = {
        usuario: usuario,
        estatus: true,
        fecha_creacion: null,
      };
      const crearOrden = await saveOrden(ordenTemp);
      if (crearOrden) {
        pedido.orden = crearOrden;
        const respuesta = await saveOrdenPlatillo(pedido);
        if (respuesta) {
          alert("Se ha creado una orden nueva y se ha agregado el platillo");
        } else {
          alert(
            "Se ha creado una orden nueva pero no se ha podido agregar el platillo"
          );
        }
      }
    }
    openClose();
  };

  return (
    <div>
      <h1>{nota ? "Editar" : "Añadir"} platillo</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="tamanio" className="form-label">
              Tamaño
            </label>
            <Field
              as="select"
              id="tamanio"
              name="tamanio"
              className="form-select"
            >
              <option value="">Selecciona un tamaño</option>
              {tamanioOptions.map((tamanio) => (
                <option key={tamanio.id_tamanio} value={tamanio.id_tamanio}>
                  {tamanio.nombre}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="tamanio"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nota" className="form-label">
              Nota (opcional)
            </label>
            <Field
              as="textarea"
              id="nota"
              name="nota"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {nota ? "Editar" : "Enviar"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
