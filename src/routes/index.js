// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import CounterRoute from './Counter';
import NoFoundPageRoute from './NoFoundPage';

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = () => ({
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
        CounterRoute(),
        NoFoundPageRoute(),
    ],
});

export default createRoutes;
