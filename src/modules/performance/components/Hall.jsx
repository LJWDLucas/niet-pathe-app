import React from 'react';
import Screen from './Screen';
import PerformanceContext from './PerformanceContext';
import RowHolder from './RowsHolder';

const Hall = () => (
  <PerformanceContext.Consumer>
    {({ hallId }) => (
      <div id="hall">
        <RowHolder hallId={hallId} />
        <Screen />
      </div>
    )}
  </PerformanceContext.Consumer>
);

export default Hall;
