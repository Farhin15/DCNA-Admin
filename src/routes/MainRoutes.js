import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'guard/AuthGuards';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Requests = Loadable(lazy(() => import('pages/requests')));
const Templates = Loadable(lazy(() => import('pages/templates')));
const Users = Loadable(lazy(() => import('pages/users')));
const TemplateForm = Loadable(lazy(() => import('pages/template-form/')));
const UserForm = Loadable(lazy(() => import('pages/user-detail/')));
const RequestDetail = Loadable(lazy(() => import('pages/request-detail')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <AuthGuard component={<MainLayout />} />,
    children: [
        {
            path: '/',
            element: <AuthGuard component={<DashboardDefault />} />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <AuthGuard component={<DashboardDefault />} />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        },
        {
            path: 'requests',
            element: <AuthGuard component={<Requests />} />
        },
        {
            path: 'requests/request-detail/:id',
            element: <AuthGuard component={<RequestDetail />} />
        },
        {
            path: 'templates',
            element: <AuthGuard component={<Templates />} />
        },
        {
            path: 'templates/detail',
            element: <AuthGuard component={<TemplateForm />} />
        },
        {
            path: 'templates/detail/:id',
            element: <AuthGuard component={<TemplateForm />} />
        },
        {
            path: 'users',
            element: <AuthGuard component={<Users />} />
        },
        {
            path: 'users/user-detail',
            element: <AuthGuard component={<UserForm />} />
        },
        {
            path: 'users/user-detail/:id',
            element: <AuthGuard component={<UserForm />} />
        },
    ]
};

export default MainRoutes;
