import React from "react";
import Login from "../../dashboard/login";
import {Details} from "../../dashboard/details";
import MainPage from "../../pages/main-page/MainPage";
import {Project} from "../../dashboard/project";
import {Developer} from "../../dashboard/developer";


export const firstLevelRoutes = [
    // {
    //     name: 'product',
    //     component: ({id}) => <Details id={id}/>
    // },
    {
        name: 'project',
        component: ({id}) => <Project id={id}/>
    },
    {
        name: 'developer',
        component: ({id}) => <Developer id={id}/>
    },
];

export const firstLevelRouterWithoutId = [
    {
        name: 'main',
        component: () => <MainPage/>
    },
    {
        name: 'login',
        component: () => <Login/>
    }
];
