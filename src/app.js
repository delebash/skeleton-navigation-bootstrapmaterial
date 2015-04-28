import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import 'bootstrap-material';

@inject(Router)
export class App {

    constructor(router) {
        this.router = router;
        this.router.configure(config => {
            config.title = 'Aurelia';
            // config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point
            config.addPipelineStep('modelbind', BSMaterial); // Transparently creates the pipeline "myname" if it doesn't already exist.
            //  config.addPipelineStep('modelbind', 'myname'); // Makes the entire `myname` pipeline run as part of the `modelbind` pipe
            config.map([
                {route: ['', 'welcome'], moduleId: './welcome', nav: true, title: 'Welcome'},
                {route: 'test', moduleId: './test', nav: true, title: 'Test'},
                {route: 'flickr', moduleId: './flickr', nav: true},
                {route: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router'}
            ]);
        });
    }
}
class AuthorizeStep {
    run(routingContext, next) {
       // debugger;
        //   debugger;
        // Check if the route has an "auth" key
        // The reason for using `nextInstructions` is because
        // this includes child routes.
        if (routingContext.nextInstructions.some(i => i.config.auth)) {
            var isLoggedIn = /* insert magic here */false;
            if (!isLoggedIn) {
                return next.cancel(new Redirect('login'));
            }
        }

        return next();
    }
}
//attached() {
//    $.material.init();
//}
class BSMaterial {
    run(routingContext, next) {
        $.material.init();
      console.log('bsmaterial fired');
        return next();
        //
    }
}

