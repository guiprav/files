import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';

import routes from './routes/index';

@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
  }

  configureRouter(config) {
    config.title = 'files';
    config.options.pushState = true;
    config.map(routes);
  }
}
