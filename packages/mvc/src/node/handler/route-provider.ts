import { Component, Autowired, Deferred } from '@malagu/core';
import { Route, RouteProvider } from './handler-protocol';
import { RouteBuilder } from './route-builder';
import { postConstruct } from 'inversify';

@Component(RouteProvider)
export class RouteProviderImpl implements RouteProvider {

    protected route: Route;

    protected routeDeferred = new Deferred<Route>();

    @Autowired(RouteBuilder)
    protected readonly routeBuilder: RouteBuilder;

    @postConstruct()
    protected init() {
        this.routeBuilder.build().then(route => {
            this.route = route;
            this.routeDeferred.resolve(route);
        });
    }

    provide(): Promise<Route> {
        return this.routeDeferred.promise;
    }

}
