import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { AuthContext } from '../../services/auth/context/AuthContext';
import { Button } from 'react-bootstrap';

export default function Login() {
  const {login, isLoading} = useContext(AuthContext);
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo electrónico inválido').required('Este campo es requerido'),
    password: Yup.string().required('Este campo es requerido'),
  });
  const handleSubmit = (values) => {
    login(values.email, values.password);
  };

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <div className="container mt-2">
      <h1>Inicio de sesión</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <Field
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-control"
              />
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? <EyeSlash /> : <Eye />}
              </button>
            </div>
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <Button type="submit" className="btn btn-success" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
