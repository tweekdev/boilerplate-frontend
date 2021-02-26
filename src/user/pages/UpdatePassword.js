import { Checkbox } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';
import './UpdatePassword.css';

toast.configure();
const UpdateUser = (props) => {
  const schemas = Yup.object().shape({
    password: Yup.string()
      .required('Veuillez entrer un mot de passe.')
      .min(6, 'Le pseudo est trop court.'),
    confirmPassword: Yup.string()
      .required('Veuillez re entrer le mot de passe.')
      .min(6, 'Le pseudo est trop court.')
      .oneOf([Yup.ref('password'), null], 'Le mot de passe doit correspondre.'),
  });
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [passwordFieldVisible, setPasswordFieldVisible] = useState(false);
  const uid = useParams().uid;
  const history = useHistory();

  useEffect(() => {
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
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, uid, auth.userId]);

  const userUpdateSubmitHandler = async (values, actions) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/user/password/${
          uid ? uid : loadedUsers.id
        }`,
        'PATCH',
        JSON.stringify({
          password: values.password,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      actions.isSubmitting = false;
      actions.resetForm();
      toast.success('🦄 Profil mit à jour!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push('/');
    } catch (err) {
      toast.error('An error occurred!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="main auth-page upd-password">
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUsers ? (
        <Card className="authentication update-password">
          <h2 className="title__auth">Mettre à jour le mot de passe</h2>
          <Formik
            onSubmit={userUpdateSubmitHandler}
            enableReinitialize={true}
            initialValues={{
              password: '',
              confirmPassword: '',
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
              <>
                <form className="users-form" onSubmit={handleSubmit}>
                  <div className={'form-group'}>
                    <Field
                      className={'form-control'}
                      type={passwordFieldVisible ? 'text' : 'password'}
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
                    <Field
                      className={'form-control'}
                      type={passwordFieldVisible ? 'text' : 'password'}
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      placeholder={'Comfirmer mot de passe'}
                    />
                    <div className="error">
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </div>
                  </div>

                  <div className={'form-group'}>
                    <Button type="submit" disabled={isSubmitting}>
                      Mettre à jour
                    </Button>
                  </div>
                </form>
                <div className={'form-group show-pass'}>
                  <label>Voir le mot de passe</label>
                  <Checkbox
                    onClick={() =>
                      setPasswordFieldVisible(!passwordFieldVisible)
                    }
                  />
                </div>
              </>
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
