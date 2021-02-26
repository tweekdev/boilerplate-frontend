import Skeleton from '@material-ui/lab/Skeleton';
import { Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '../../../../shared/components/FormElements/Button';
import Card from '../../../../shared/components/UIElements/Card';
import ErrorModal from '../../../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../../../shared/context/auth-context';
import { useHttpClient } from '../../../../shared/hooks/http-hook';
import './../../Auth.css';

toast.configure();
const EditDifficulty = (props) => {
  const schemas = Yup.object().shape({
    name: Yup.string().required('Veuillez entrer un type.'),
  });
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDifficulty, setLoadDifficulty] = useState();
  const did = useParams().difficultyId;
  const history = useHistory();

  useEffect(() => {
    const fetchDifficulty = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/difficulties/${did}`
        );
        setLoadDifficulty(responseData.difficulty);
      } catch (err) {}
    };

    fetchDifficulty();
  }, [sendRequest, did]);

  const userUpdateSubmitHandler = async (values, actions) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/difficulties/${did}`,
        'PATCH',
        JSON.stringify({
          name: values.name,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      actions.isSubmitting = false;
      actions.resetForm();
      toast.success('🦄 Difficulté mit à jour!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push('/admin');
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
      {!isLoading && loadedDifficulty ? (
        <Card className="authentication">
          <h2 className="title__auth">Mettre à jour</h2>
          <Formik
            onSubmit={userUpdateSubmitHandler}
            enableReinitialize={true}
            initialValues={{
              name: loadedDifficulty.name ? loadedDifficulty.name : '',
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

export default EditDifficulty;
