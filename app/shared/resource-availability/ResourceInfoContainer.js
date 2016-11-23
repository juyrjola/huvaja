import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

ResourceInfo.propTypes = {
  name: PropTypes.string.isRequired,
  peopleCapacity: PropTypes.number.isRequired,
};
export function ResourceInfo(props) {
  return (
    <div className="resource-info">
      <div className="name">{props.name}</div>
      <div className="capacity">{props.peopleCapacity}</div>
    </div>
  );
}

export function selector() {
  function idSelector(state, props) { return props.id; }
  function resourcesSelector(state) {
    return state.data.resources;
  }
  const resourceSelector = createSelector(
    resourcesSelector,
    idSelector,
    (resources, id) => resources[id]
  );
  return createSelector(
    resourceSelector,
    resource => ({
      name: resource.name.fi,
      peopleCapacity: resource.peopleCapacity,
    })
  );
}

const ResourceInfoContainer = connect(selector)(ResourceInfo);
ResourceInfoContainer.propTypes = {
  id: PropTypes.string.isRequired,
};
export default ResourceInfoContainer;