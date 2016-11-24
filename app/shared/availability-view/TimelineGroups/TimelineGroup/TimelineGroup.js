import React, { PropTypes } from 'react';

import AvailabilityTimelineContainer from './AvailabilityTimeline';
import utils from './utils';

function getHourRanges(date) {
  const ranges = [];
  const current = date.clone();
  const end = date.clone().add(1, 'day');
  while (current.isBefore(end)) {
    ranges.push({ startTime: current.clone(), endTime: current.clone().add(1, 'hour') });
    current.add(1, 'hour');
  }
  return ranges;
}

TimelineGroup.propTypes = {
  date: PropTypes.object.isRequired,
  resources: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default function TimelineGroup(props) {
  return (
    <div className="timeline-group">
      <div className="hours">
        {getHourRanges(props.date).map(range =>
          <div
            className="hour"
            key={range.startTime.format('HH')}
            style={{ width: utils.getTimeSlotWidth(range) }}
          >
            {range.startTime.format('HH:mm')}
          </div>
        )}
      </div>
      {props.resources.map(resource =>
        <AvailabilityTimelineContainer date={props.date} id={resource} key={resource} />
      )}
    </div>
  );
}