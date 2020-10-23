import React, { useEffect } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import ErrorBoundary from 'components/errors/ErrorBoundary';
import CoreLayout from 'components/layouts/CoreLayout';
import RetailItemsContainer from './containers/retailItems/RetailItemsContainer';
import history from 'store/history';
import { client } from 'store/apollo/ApolloClient';
import { useBreadCrumbs } from 'contexts/breadcrumbsContext';
import { capitalize, substringReplace } from 'utils/stringUtils';

// TODO: Remove once all routes completed
const TempContainer = ({ location: { pathname } }) => {
  const { setBreadcrumbs } = useBreadCrumbs();

  useEffect(() => setBreadcrumbs([{ name: capitalize(substringReplace(pathname, '/', '')), url: pathname }]), [
    setBreadcrumbs,
    pathname,
  ]);

  return <div>&nbsp;&nbsp;{pathname}</div>;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Router history={history}>
          <Switch>
            <Redirect exact from="/" to="retail" />
            <Route path="/appointments" render={props => <CoreLayout component={TempContainer} {...props} />} />
            <Route path="/conversations" render={props => <CoreLayout component={TempContainer} {...props} />} />
            <Route path="/leads" render={props => <CoreLayout component={TempContainer} {...props} />} />
            <Route path="/tasks" render={props => <CoreLayout component={TempContainer} {...props} />} />
            <Route
              path="/retail/:retailItemId?"
              render={props => <CoreLayout component={RetailItemsContainer} {...props} />}
            />
            <Route path="/customers" render={props => <CoreLayout component={TempContainer} {...props} />} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default App;
