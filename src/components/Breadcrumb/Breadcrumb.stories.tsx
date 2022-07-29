import * as React from 'react';

import Breadcrumb from "./Breadcrumb";

export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumb
};

export const DefaultBreadcrumb = () => {
    return <Breadcrumb
        crumbs={[
            {
                label: 'one',
                url: ''
            },
            {
                label: 'two',
                url: ''
            },
            {
                label: 'three',
                url: ''
            }
        ]}
    />;
}