import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Util/validators';
import './ProjectForm.css';

const NewProject = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      technos: {
        value: '',
        isValid: false,
      },
      lien: {
        value: '',
        isValid: false,
      },
      repository: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('technos', formState.inputs.technos.value);
      formData.append('lien', formState.inputs.lien.value);
      formData.append('repository', formState.inputs.repository.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('/api/tweekdev/projects', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token,
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="technos"
          element="input"
          label="technos"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid technos."
          onInput={inputHandler}
        />
        <Input
          id="lien"
          element="input"
          label="lien"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid lien."
          onInput={inputHandler}
        />
        <Input
          id="repository"
          element="input"
          label="repository"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid repository."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
          center
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PROJECT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewProject;
