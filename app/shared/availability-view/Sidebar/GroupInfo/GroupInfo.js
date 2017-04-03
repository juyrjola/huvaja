import React, { PropTypes } from 'react';
import Sticky from 'react-sticky-el';

import ResourceInfoContainer from './ResourceInfo';

GroupInfo.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default function GroupInfo(props) {
  return (
    <div className="group-info" title={props.name}>
      <Sticky>
        <div className="group-name"><div className="name">{props.name}</div></div>
      </Sticky>
      {props.resources.map(resource =>
        <ResourceInfoContainer date={props.date} key={resource} id={resource} />
      )}
    </div>
  );
}
