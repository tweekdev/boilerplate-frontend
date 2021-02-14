import { Field, Formik } from 'formik';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';

const NewUser = () => {
  const schema = Yup.object().shape({
    pseudo: Yup.string()
      .required('Veuillez entrer un pseudo.')
      .min(4, 'Le pseudo est trop court.'),
    firstname: Yup.string().required('Veuillez entrer un prénom.'),
    name: Yup.string().required('Veuillez entrer un nom.'),
    email: Yup.string().required('Veuillez entrer un Email.'),
    password: Yup.string()
      .required('Veuillez entrer un mot de passe.')
      .min(6, 'Le mot de passe est trop court 6 caractères minimum.'),
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const userSubmitHandler = async (values, actions) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        'POST',
        JSON.stringify({
          name: values.name,
          firstname: values.firstname,
          pseudo: values.pseudo,
          email: values.email,
          password: values.password,
          role: '601727566f33a7db18a485c6',
          tabs: [],
          news: [],
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      auth.login(responseData.userId, responseData.token, responseData.role[0]);
      actions.isSubmitting = false;
      actions.resetForm();
      history.push('/tabs');
    } catch (err) {}
  };

  return (
    <div className="main auth-page">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <Card className="authentication">
          <h2 className="title__auth">S'inscrire</h2>
          <Formik
            onSubmit={userSubmitHandler}
            initialValues={{
              pseudo: '',
              firstname: '',
              name: '',
              password: '',
              email: '',
              role: '',
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
                    name="pseudo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pseudo}
                    placeholder={'Pseudo'}
                  />
                  <div className="error">
                    {errors.pseudo && touched.pseudo && errors.pseudo}
                  </div>
                </div>
                <div className={'form-group'}>
                  <Field
                    className={'form-control'}
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                    placeholder={'Prénom'}
                  />
                  <div className="error">
                    {errors.firstname && touched.firstname && errors.firstname}
                  </div>
                </div>

                <div className={'form-group'}>
                  <Field
                    className={'form-control'}
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder={'Nom'}
                  />
                  <div className="error">
                    {errors.name && touched.name && errors.name}
                  </div>
                </div>
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
                    type="text"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder={'Mot de passe'}
                  />
                  <div className="error">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <div className={'form-group'}>
                  <Button type="submit" disabled={isSubmitting}>
                    Soumettre
                  </Button>
                </div>
              </form>
            )}
          </Formik>
          <Link className="user-add" to={`/auth`}>
            Se connecter
          </Link>
        </Card>
      )}
    </div>
  );
};

export default NewUser;
