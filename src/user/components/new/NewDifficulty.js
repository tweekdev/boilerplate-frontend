import { Field, Formik } from 'formik';
import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import './New.css';

toast.configure();

const NewTabs = () => {
  const auth = useContext(AuthContext);
  const schema = Yup.object().shape({
    name: Yup.string().required('Veuillez entrer une difficulté.'),
  });
  const { error, sendRequest, clearError } = useHttpClient();

  const userSubmitHandler = async (values, actions) => {
    try {
      await sendRequest(
        `/api/tweektabs/difficulties`,
        'POST',
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
      toast.success('🦄 Success!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error('🦄 An error occurred!', {
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
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <ToastContainer />
      <Card className="add-admin">
        <h2 className="title-tabs-add">Ajouter une difficulté</h2>
        <Formik
          onSubmit={userSubmitHandler}
          initialValues={{
            name: '',
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
            <form onSubmit={handleSubmit} className="tabs-form">
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
                  Soumettre
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Card>
    </React.Fragment>
  );
};

export default NewTabs;
