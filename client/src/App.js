import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./containers/Home/Home'));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              name="Home"
              render={() => (
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              )}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
