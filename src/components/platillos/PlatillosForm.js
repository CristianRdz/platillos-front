import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { savePlatillo, updatePlatillo } from "../../services/platillos/platillosService";

export default function EditPlatilloForm(props) {
  const { platillo, fetchData, openClose } = props;
  const initialValues = {
    nombre: platillo ? platillo.nombre : "",
    precio: platillo ? platillo.precio : "",
    descripcion: platillo ? platillo.descripcion : "",
    categoria: platillo ? platillo.categoria.id_categoria : "",
  };

  const categorias = [
    { id: 1, nombre: "carnes" },
    { id: 2, nombre: "postres" },
    { id: 3, nombre: "guarniciones" },
    // ... Agrega otras categorías según tus necesidades
  ];

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Requerido"),
    precio: Yup.number().required("Requerido"),
    descripcion: Yup.string().required("Requerido"),
    categoria: Yup.string().required("Requerido"),
  });

  const handleSubmit = async (values) => {
    if (platillo) {
        const preCategoria = categorias.find(
          (categoria) => categoria.id === parseInt(values.categoria)
        );
        let platilloTemp = platillo;
        platilloTemp.nombre = values.nombre;
        platilloTemp.precio = values.precio;
        platilloTemp.descripcion = values.descripcion;
        platilloTemp.categoria = {
          id_categoria: values.categoria,
          nombre: preCategoria.nombre,
        };
        const response = await updatePlatillo(platilloTemp);
        if (response) {
          fetchData();
          openClose();
          alert("Platillo actualizado correctamente");
        }else {
          alert("Error al actualizar el platillo");
        }
    } else {
        const preCategoria = categorias.find(
            (categoria) => categoria.id === parseInt(values.categoria)
            );
            const platilloTemp = {
            nombre: values.nombre,
            precio: values.precio,
            descripcion: values.descripcion,
            categoria: {
                id_categoria: values.categoria,
                nombre: preCategoria.nombre,
            },
            };
            const response = await savePlatillo(platilloTemp);
            if (response) {
            fetchData();
            openClose();
            alert("Platillo creado correctamente");
            } else {
            alert("Error al crear el platillo");
            }
    }
    };
    

  return (
    <div>
      <h1>Editar Platillo</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <Field
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="precio" className="form-label">
              Precio
            </label>
            <Field
              type="number"
              id="precio"
              name="precio"
              className="form-control"
            />
            <ErrorMessage
              name="precio"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <Field
              type="text"
              id="descripcion"
              name="descripcion"
              className="form-control"
            />
            <ErrorMessage
              name="descripcion"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">
              Categoría
            </label>
            <Field
              as="select"
              id="categoria"
              name="categoria"
              className="form-select"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option
                  selected={
                    platillo && categoria.id === platillo.categoria.id_categoria
                  }
                  key={categoria.id}
                  value={categoria.id}
                >
                  {categoria.nombre}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="categoria"
              component="div"
              className="text-danger"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </Form>
      </Formik>
    </div>
  );
}
