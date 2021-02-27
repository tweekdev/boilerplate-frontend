import { Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import Button from '../../shared/components/FormElements/Button';
import '../../shared/components/FormElements/NewPage.css';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

toast.configure();

const NewTutorial = () => {
  const auth = useContext(AuthContext);
  const schema = Yup.object().shape({
    chanteur: Yup.string()
      .required('Veuillez entrer un chanteur.')
      .min(4, 'Le chanteur est trop court.'),
    link: Yup.string().required(),
    tab: Yup.string(),
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

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/types`);
        setLoadTypes(responseData.types);
      } catch (err) {}
    };
    const fetchInstruments = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/instruments`);
        setLoadInstrument(responseData.instruments);
      } catch (err) {}
    };
    const fetchDifficulty = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/difficulties`);
        setLoadDifficulty(responseData.difficulties);
      } catch (err) {}
    };
    fetchTypes();
    fetchInstruments();
    fetchDifficulty();
  }, [sendRequest]);

  const history = useHistory();

  const userSubmitHandler = async (values, actions) => {
    try {
      var video_id = values.link.split('v=')[1];
      var ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      await sendRequest(
        `/api/tweektabs/tutorials`,
        'POST',
        JSON.stringify({
          chanteur: values.chanteur,
          link: video_id,
          name: values.name,
          tab: values.tab,
          description: values.description,
          type: values.type,
          difficulty: values.difficulty,
          instrument: values.instrument,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      actions.isSubmitting = false;
      actions.resetForm();
      toast.success('🦄 Tutoriel ajouté!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push('/tutorials');
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
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className="main main-new">
        <Card className="card-new">
          {loadedDifficulty && loadedTypes && loadedInstrument && (
            <>
              <h2 className="title-add">Ajouter un tutoriel</h2>
              <Formik
                onSubmit={userSubmitHandler}
                initialValues={{
                  chanteur: '',
                  link: '',
                  tab: '',
                  name: '',
                  description: '',
                  type: '',
                  difficulty: '',
                  instrument: '',
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
                  <form onSubmit={handleSubmit} className="new-form">
                    <div className={'form-group'}>
                      <Field
                        className={' new-control'}
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
                      <Field
                        className={'new-control'}
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
                        className={' new-control'}
                        type="text"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder={'Description'}
                      />
                      <div className="error">
                        {errors.description &&
                          touched.description &&
                          errors.description}
                      </div>
                    </div>
                    <div className={'form-group'}>
                      <Field
                        name="link"
                        className="new-control"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values.link}
                        placeholder={'Lien video'}
                      />
                      <div className="error">
                        {errors.link && touched.link && errors.link}
                      </div>
                    </div>
                    <div className={'form-group'}>
                      <Field
                        name="tab"
                        className="new-control"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values.tab}
                        placeholder={'Lien tablature'}
                      />
                      <div className="error">
                        {errors.tab && touched.tab && errors.tab}
                      </div>
                    </div>

                    {loadedTypes && loadedTypes.length > 0 && (
                      <div className={'form-group'}>
                        <Field
                          className={'new-control'}
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
                          className={' new-control'}
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
                          className={' new-control'}
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
                        Soumettre
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default NewTutorial;
