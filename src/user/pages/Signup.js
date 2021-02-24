import { Checkbox } from '@material-ui/core';
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

const NewUser = () => {
  const schema = Yup.object().shape({
    pseudo: Yup.string()
      .required('Veuillez entrer un pseudo.')
      .min(4, 'Le pseudo est trop court.'),
    firstname: Yup.string().required('Veuillez entrer un prénom.'),
    name: Yup.string().required('Veuillez entrer un nom.'),
    email: Yup.string()
      .email('Email invalide.')
      .required('Veuillez entrer un Email.'),
    picture: Yup.string().required('Veuillez insérer une image.'),
    password: Yup.string()
      .required('Veuillez entrer un mot de passe.')
      .min(6, 'Le mot de passe est trop court 6 caractères minimum.'),
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [passwordFieldVisible, setPasswordFieldVisible] = useState(false);

  const userSubmitHandler = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('firstname', values.firstname);
      formData.append('pseudo', values.pseudo);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('picture', values.picture);
      formData.append('role', '601727566f33a7db18a485c6');
      formData.append('tabs', []);
      formData.append('news', []);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        'POST',
        formData
      );
      auth.login(
        responseData.userId,
        responseData.token,
        responseData.role[0],
        responseData.pseudo,
        responseData.picture
      );
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
              picture: '',
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={'form-group'}>
                  <input
                    id="picture"
                    name="picture"
                    className="form-control"
                    type="file"
                    onChange={(event) => {
                      setFieldValue('picture', event.currentTarget.files[0]);
                    }}
                    values={values.picture}
                    accept=".jpg,.png,.jpeg"
                  />
                  <div className="error">
                    {errors.picture && touched.picture && errors.picture}
                  </div>
                </div>
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
                <div className={'form-group show-password-auth-check'}>
                  <Field
                    className={'form-control'}
                    type={passwordFieldVisible ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder={'Mot de passe'}
                  />
                  <Checkbox
                    onClick={() =>
                      setPasswordFieldVisible(!passwordFieldVisible)
                    }
                  />
                  <label className="show-password-auth">
                    Voir le mot de passe
                  </label>
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
