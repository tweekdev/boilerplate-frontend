import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ProjectList from '../components/ProjectList';

const Projects = () => {
  const [loadedProjects, setLoadedProjects] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(`/api/tweekdev/projects`);
        setLoadedProjects(responseData.projects);
      } catch (err) {}
    };
    fetchProjects();
  }, [sendRequest]);

  const projectDeletedHandler = (deletedProjectId) => {
    setLoadedProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== deletedProjectId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProjects && (
        <ProjectList
          items={loadedProjects}
          onDeleteProject={projectDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Projects;
