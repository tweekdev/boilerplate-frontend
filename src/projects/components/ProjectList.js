import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './ProjectItem';
import './ProjectList.css';

const ProjectList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No projects found. Maybe create one?</h2>
          <Button to="/projects/new">Add project?</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="project-content">
      <div className="center projects">
        <h2>MY PROJECTS</h2>
        <h3 className="subtitle-project">Others projects are coming soon...</h3>
      </div>
      <div className="place-list">
        {props.items.map((project) => (
          <PlaceItem
            key={project.id}
            id={project.id}
            image={project.image}
            title={project.title}
            description={project.description}
            technos={project.technos}
            creatorId={project.creator}
            lien={project.lien}
            repository={project.repository}
            onDelete={props.onDeletePlace}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
