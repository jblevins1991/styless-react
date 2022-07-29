import * as React from 'react';

import Accordion from '../Accordion/Accordion';
import AccordionGroup from "./AccordionGroup";

export default {
    title: 'Components/AccordionGroup',
    component: AccordionGroup
};

export const DefaultAccordionGroup = () => {
    return <AccordionGroup>
        <Accordion title='Title'>
            Content
        </Accordion>
        
        <Accordion title='Title'>
            Content
        </Accordion>
    </AccordionGroup>;
}