import { Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import '../../shared/components/FormElements/EditPage.css';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

toast.configure();

const UpdateTabs = () => {
  const tid = useParams().tabsId;

  const auth = useContext(AuthContext);
  const schema = Yup.object().shape({
    chanteur: Yup.string()
      .required('Veuillez entrer un chanteur.')
      .min(4, 'Le chanteur est trop court.'),
    file: Yup.string(),
    description: Yup.string(),
    name: Yup.string().required('Veuillez entrer un nom.'),
    type: Yup.string().required('Veuillez entrer un type.'),
    difficulty: Yup.string().required('Veuillez choisir une difficulté.'),
    instrument: Yup.string().required(),
  });
  const { error, sendRequest, clearError } = useHttpClient();
  const [loadedTypes, setLoadTypes] = useState();
  const [loadedDifficulty, setLoadDifficulty] = useState();
  const [loadedInstrument, setLoadInstrument] = useState();
  const [loadedTabs, setLoadTabs] = useState();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/types`
        );
        setLoadTypes(responseData.types);
      } catch (err) {}
    };
    const fetchInstruments = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/instruments`
        );
        setLoadInstrument(responseData.instruments);
      } catch (err) {}
    };
    const fetchDifficulty = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/difficulties`
        );
        setLoadDifficulty(responseData.difficulties);
      } catch (err) {}
    };
    const fetchTab = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs/${tid}`
        );
        console.log(responseData);
        setLoadTabs(responseData.tabs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTypes();
    fetchInstruments();
    fetchDifficulty();
    fetchTab();
  }, [sendRequest, tid]);

  const history = useHistory();

  const userSubmitHandler = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('chanteur', values.chanteur);
      formData.append('file', values.file);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('type', values.type);
      formData.append('difficulty', values.difficulty);
      formData.append('instrument', values.instrument);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/tabs/${tid}`,
        'PATCH',
        formData,
        {
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
      setTimeout(() => {
        history.push('/tabs');
      }, 4000);
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
      <div className="main main-edit">
        <Card className="card-edit">
          {loadedDifficulty && loadedTypes && loadedInstrument && loadedTabs && (
            <>
              <h2 className="title-edit">Mettre à jour</h2>
              <Formik
                onSubmit={userSubmitHandler}
                initialValues={{
                  chanteur: loadedTabs.chanteur,
                  file: loadedTabs.file,
                  name: loadedTabs.name,
                  type: loadedTabs.type.id,
                  description: loadedTabs.description,
                  difficulty: loadedTabs.difficulty.id,
                  instrument: loadedTabs.instrument.id,
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
                  <form onSubmit={handleSubmit} className="edit-form">
                    <div className={'form-group'}>
                      <Field
                        className={' edit-control'}
                        type="text"
                        name="chanteur"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.chanteur}
                        placeholder={'chanteur'}
                      />
                      <div className="error">
                        {errors.chanteur && touched.chanteur && errors.chanteur}
                      </div>
                    </div>
                    <div className={'form-group'}>
                      <input
                        id="file"
                        name="file"
                        className="edit-control"
                        type="file"
                        onChange={(event) => {
                          setFieldValue('file', event.currentTarget.files[0]);
                        }}
                        values={values.file}
                        accept=".pdf"
                      />
                    </div>

                    <div className={'form-group'}>
                      <Field
                        className={'edit-control'}
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
                      <textarea
                        className={'edit-control'}
                        type="text"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder={'description'}
                      />
                      <div className="error">
                        {errors.description &&
                          touched.description &&
                          errors.description}
                      </div>
                    </div>

                    {loadedTypes && loadedTypes.length > 0 && (
                      <div className={'form-group'}>
                        <Field
                          className={' edit-control'}
                          as="select"
                          name="type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.type}
                          placeholder={'type'}
                        >
                          <option value="">Choisit un type</option>
                          {loadedTypes.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </Field>
                        <div className="error">
                          {errors.type && touched.type && errors.type}
                        </div>
                      </div>
                    )}
                    {loadedInstrument && loadedInstrument.length > 0 && (
                      <div className={'form-group'}>
                        <Field
                          className={' edit-control'}
                          as="select"
                          name="instrument"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.instrument}
                          placeholder={'instrument'}
                        >
                          <option value="">Choisit une instrument</option>
                          {loadedInstrument.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </Field>
                        <div className="error">
                          {errors.instrument &&
                            touched.instrument &&
                            errors.instrument}
                        </div>
                      </div>
                    )}
                    {loadedDifficulty && loadedDifficulty.length > 0 && (
                      <div className={'form-group'}>
                        <Field
                          className={' edit-control'}
                          as="select"
                          name="difficulty"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.difficulty}
                          placeholder={'Difficulté'}
                        >
                          <option value="">Choisit une difficulté</option>
                          {loadedDifficulty.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </Field>
                        <div className="error">
                          {errors.difficulty &&
                            touched.difficulty &&
                            errors.difficulty}
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
            </>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UpdateTabs;
