import { Field, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';

const Auth = () => {
  const schema = Yup.object().shape({
    email: Yup.string().required('Veuillez entrer un email.'),
    password: Yup.string().required('Veuillez entrer un mot de passe.'),
  });

  const history = useHistory();

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const authSubmitHandler = async (values, actions) => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.role[0]
        );
        actions.isSubmitting = false;
        actions.resetForm();
        history.push('/tabs');
      } catch (err) {}
    }
  };
  return (
    <div className="main auth-page">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <Card className="authentication">
          <h2 className="title__auth">Connexion</h2>
          <Formik
            onSubmit={authSubmitHandler}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={schema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={'form-group'}>
                  <Field
                    className={'form-control'}
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder={'Email'}
                  />
                  <div className="error">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>
                <div className={'form-group'}>
                  <Field
                    className={'form-control'}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder={'Password'}
                  />
                  <div className="error">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  Se connecter
                </Button>
              </form>
            )}
          </Formik>
          <Link className="user-add" to={`/signup`}>
            S'inscrire
          </Link>
        </Card>
      )}
    </div>
  );
};

export default Auth;
