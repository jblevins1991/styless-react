import * as React from 'react';

import Accordion from "./Accordion";

export default {
    title: 'Components/Accordion',
    component: Accordion
};

export const DefualtButton = () => {
    return <Accordion title='Title'>
        Content
    </Accordion>
}