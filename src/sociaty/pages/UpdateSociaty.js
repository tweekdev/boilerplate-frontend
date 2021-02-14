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
import './ProjectForm.css';

const UpdateSociaty = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Veuillez entrer un nom de société.'),
    adresse: Yup.string().required('Veuillez entrer une adresse.'),
  });
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSociaty, setLoadedSociaty] = useState();
  const sid = useParams().sid;
  const history = useHistory();

  useEffect(() => {
    const fetchSociaty = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/sociatys/${sid}`
        );
        setLoadedSociaty(responseData.sociaty);
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSociaty();
  }, [sendRequest, sid]);

  const sociatyUpdateSubmitHandler = async (values, actions) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/sociatys/${sid}`,
        'PATCH',
        JSON.stringify({
          name: values.name,
          adresse: values.adresse,
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

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedSociaty && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Sociaty!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedSociaty && (
        <Formik
          onSubmit={sociatyUpdateSubmitHandler}
          initialValues={{
            name: loadedSociaty.name,
            adresse: loadedSociaty.adresse,
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
            <form className="tabs-form" onSubmit={handleSubmit}>
              <div className={'form-group'}>
                <Field
                  className={'form-control'}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder={'Nom de la société'}
                />
                <div className="error">
                  {errors.name && touched.name && errors.name}
                </div>
              </div>
              <div className={'form-group'}>
                <Field
                  className={'form-control'}
                  type="text"
                  name="adresse"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.adresse}
                  placeholder={'Adresse'}
                />
                <div className="error">
                  {errors.adresse && touched.adresse && errors.adresse}
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
      )}
    </React.Fragment>
  );
};

export default UpdateSociaty;
