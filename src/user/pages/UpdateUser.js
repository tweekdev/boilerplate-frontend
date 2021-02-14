import { Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';

const UpdateUser = () => {
  const schemas = Yup.object().shape({
    pseudo: Yup.string()
      .required('Veuillez entrer un pseudo.')
      .min(4, 'Le pseudo est trop court.'),
    firstname: Yup.string().required('Veuillez entrer un prénom.'),
    email: Yup.string().required('Veuillez entrer un email.'),
    name: Yup.string().required('Veuillez entrer un nom.'),
    role: Yup.string().required('Veuillez choisir un role.'),
  });
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedRoles, setLoadRoles] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const uid = useParams().uid;
  const history = useHistory();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/roles`
        );
        setLoadRoles(responseData.roles);
      } catch (err) {}
    };
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/user/${uid}`
        );
        console.log(responseData.users[0].email);
        setLoadedUsers(responseData.users[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoles();
    fetchUser();
  }, [sendRequest, uid]);

  const userUpdateSubmitHandler = async (values, actions) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${uid}`,
        'PATCH',
        JSON.stringify({
          pseudo: values.pseudo,
          firstname: values.firstname,
          name: values.name,
          role: values.role,
          email: values.email,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      actions.isSubmitting = false;
      actions.resetForm();
      history.push('/');
    } catch (err) {}
  };

  return (
    <div className="main auth-page">
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUsers ? (
        <Card className="authentication">
          <h2 className="title__auth">Mettre à jour</h2>
          <Formik
            onSubmit={userUpdateSubmitHandler}
            enableReinitialize={true}
            initialValues={{
              pseudo: loadedUsers.pseudo ? loadedUsers.pseudo : '',
              firstname: loadedUsers.firstname ? loadedUsers.firstname : '',
              name: loadedUsers.name ? loadedUsers.name : '',
              email: loadedUsers.email ? loadedUsers.email : '',
              role: loadedUsers.role[0].id ? loadedUsers.role[0].id : '',
            }}
            validationSchema={schemas}
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
              <form className="users-form" onSubmit={handleSubmit}>
                <div className="error">
                  {errors.pseudo && touched.pseudo && errors.pseudo}
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
                </div>
                <div className={'form-group'}>
                  <div className="error">
                    {errors.firstname && touched.firstname && errors.firstname}
                  </div>
                  <Field
                    className={'form-control'}
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                    placeholder={'Prénom'}
                  />
                </div>
                <div className={'form-group'}>
                  <div className="error">
                    {errors.email && touched.email && errors.email}
                  </div>
                  <Field
                    className={'form-control'}
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder={'Email'}
                  />
                </div>
                <div className={'form-group'}>
                  <div className="error">
                    {errors.name && touched.name && errors.name}
                  </div>
                  <Field
                    className={'form-control'}
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder={'Nom'}
                  />
                </div>
                {loadedRoles && loadedRoles.length > 0 && (
                  <div className={'form-group'}>
                    <div className="error">
                      {errors.role && touched.role && errors.role}
                    </div>
                    <Field
                      className={'form-control'}
                      as="select"
                      name="role"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.role}
                      placeholder={'Role'}
                      multiple={false}
                    >
                      <option value="">Choisit un role</option>
                      {loadedRoles.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                )}

                <div className={'form-group'}>
                  <Button type="submit" disabled={isSubmitting}>
                    Mettre à jour
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Card>
      ) : (
        <LoadingSpinner asOverlay />
      )}
    </div>
  );
};

export default UpdateUser;
