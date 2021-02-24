import Skeleton from '@material-ui/lab/Skeleton';
import { Field, Formik } from 'formik';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';
import './UpdatePassword.css';

toast.configure();
const ForgotPassword = (props) => {
  const schemas = Yup.object().shape({
    email: Yup.string()
      .email('Email invalide.')
      .required('Veuillez entrer un Email.'),
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const userUpdateSubmitHandler = async (values, actions) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/forgotPassword`,
        'POST',
        JSON.stringify({
          email: values.email,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      actions.isSubmitting = false;
      actions.resetForm();
      toast.success('🦄 Demande de reset de mot de passe envoyé!', {
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
    <div className="main auth-page">
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading ? (
        <Card className="authentication">
          <h2 className="title__auth">Mettre à jour le mot de passe</h2>
          <Formik
            onSubmit={userUpdateSubmitHandler}
            enableReinitialize={true}
            initialValues={{
              email: '',
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
                  <Field
                    className={'form-control'}
                    type="email"
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
                  <Button type="submit" disabled={isSubmitting}>
                    Envoyer
                  </Button>
                </div>
                <Link className="user-add" to={`/auth`}>
                  Se connecter
                </Link>
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

export default ForgotPassword;
