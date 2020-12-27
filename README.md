# RegistryServiceUi

This project is created using [Angular 10](https://angular.io/) and the [Angular Material](https://material.angular.io/) component library. 

## Development server
Please install angular-cli before running the project.
`npm install -g @angular/cli`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

## Temperory workaround for the CORS issue

Despite adding the CORS header(Access-Control-Allow-Origin: *) in the server the Angular
still showing a CORS header missing error for POST requests. As a temperory workaround the calls to server are routed through a proxy. The proxy configuration is defined at  src/proxy.conf.json


