import React from "react";
import Login from "../../dashboard/login";
import {Details} from "../../dashboard/details";
import MainPage from "../../pages/main-page/MainPage";


export const firstLevelRoutes = [
    {
        name: 'product',
        component: ({id}) => <Details id={id}/>
    }
]

export const firstLevelRouterWithoutId = [
    {
        name: 'main',
        component: () => <MainPage/>
    },
    {
        name: 'login',
        component: () => <Login/>
    }
]
