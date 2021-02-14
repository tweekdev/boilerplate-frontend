import { Field, Formik } from 'formik';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ProjectForm.css';

const NewSociaty = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Veuillez entrer un nom de société.'),
    adresse: Yup.string().required('Veuillez entrer une adresse.'),
  });
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const sociatySubmitHandler = async (values, actions) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/sociatys`,
        'POST',
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="card-sociaty">
        <Formik
          onSubmit={sociatySubmitHandler}
          initialValues={{
            name: '',
            adresse: '',
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
            <form className="sociaty-form" onSubmit={handleSubmit}>
              <h2 className="title-sociaty">Ajouter une société</h2>
              {isLoading && <LoadingSpinner asOverlay />}
              <div className="form-input">
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
                    Ajouter
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Card>
    </React.Fragment>
  );
};

export default NewSociaty;
