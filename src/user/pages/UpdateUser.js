import Skeleton from '@material-ui/lab/Skeleton';
import { Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';

const UpdateUser = (props) => {
  const schemas = Yup.object().shape({
    pseudo: Yup.string()
      .required('Veuillez entrer un pseudo.')
      .min(4, 'Le pseudo est trop court.'),
    firstname: Yup.string().required('Veuillez entrer un prénom.'),
    picture: Yup.string(),
    email: Yup.string().required('Veuillez entrer un email.'),
    name: Yup.string().required('Veuillez entrer un nom.'),
    role: Yup.string(),
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
        if (uid) {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/user/${uid}`
          );
          setLoadedUsers(responseData.users[0]);
        } else {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/user/${auth.userId}`
          );
          setLoadedUsers(responseData.users[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoles();
    fetchUser();
  }, [sendRequest, uid]);

  const userUpdateSubmitHandler = async (values, actions) => {
    try {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('firstname', values.firstname);
      formData.append('pseudo', values.pseudo);
      formData.append('email', values.email);
      formData.append(
        'picture',
        values.picture ? values.picture : loadedUsers.picture
      );
      formData.append('role', values.role);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${uid}`,
        'PATCH',
        formData,
        {
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
              picture: loadedUsers.picture ? loadedUsers.picture : null,
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
              setFieldValue,
            }) => (
              <form className="users-form" onSubmit={handleSubmit}>
                <div className={'form-group'}>
                  <input
                    encType="multipart/form-data"
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
                {loadedRoles &&
                  auth.role === '601724ea6f33a7db18a485c5' &&
                  loadedRoles.length > 0 && (
                    <div className={'form-group'}>
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
                      <div className="error">
                        {errors.role && touched.role && errors.role}
                      </div>
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
        <div>
          <Skeleton variant="text" />
          <Skeleton variant="circle" width={80} height={80} />
          <Skeleton variant="rect" width={500} height={500} />
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
