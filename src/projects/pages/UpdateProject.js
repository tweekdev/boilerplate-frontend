import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Util/validators';
import './ProjectForm.css';

const UpdateProject = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const projectId = useParams().projectId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `/api/tweekdev/projects/${projectId}`
        );
        setLoadedPlace(responseData.project);
        setFormData(
          {
            title: {
              value: responseData.project.title,
              isValid: true,
            },
            description: {
              value: responseData.project.description,
              isValid: true,
            },
            technos: {
              value: responseData.project.technos,
              isValid: true,
            },
            lien: {
              value: responseData.project.lien,
              isValid: true,
            },
            repository: {
              value: responseData.project.repository,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, projectId, setFormData]);

  const projectUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `/api/tweekdev/projects/${projectId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          technos: formState.inputs.technos.value,
          lien: formState.inputs.lien.value,
          repository: formState.inputs.repository.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );

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

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find project!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={projectUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Input
            id="technos"
            element="input"
            label="technos"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid technos."
            onInput={inputHandler}
            initialValue={loadedPlace.technos}
            initialValid={true}
          />
          <Input
            id="lien"
            element="input"
            label="lien"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid lien."
            onInput={inputHandler}
            initialValue={loadedPlace.lien}
            initialValid={true}
          />
          <Input
            id="repository"
            element="input"
            label="repository"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid repository."
            onInput={inputHandler}
            initialValue={loadedPlace.repository}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PROJECT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateProject;
