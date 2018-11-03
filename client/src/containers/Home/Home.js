import React, { Component, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const Company = lazy(() =>
  import('../../views/CompanyManagement/CompanyManagement'),
);

class Home extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/company"
            name="Company"
            render={() => (
              <Suspense fallback={<Loader />}>
                <Company />
              </Suspense>
            )}
          />
          <Redirect from="/" to="/company" />
        </Switch>
      </div>
    );
  }
}

export default Home;
