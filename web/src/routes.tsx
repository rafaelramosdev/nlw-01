import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { Landing } from './pages/Landing';
import { CreatePoint } from './pages/CreatePoint';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/create-point" component={CreatePoint} />
      </Switch>
    </BrowserRouter>
  )
}