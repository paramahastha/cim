import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const Loader = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <main className="loader-layout">
        <CircularProgress color="primary" />
      </main>
    </React.Fragment>
  );
};

export default Loader;
