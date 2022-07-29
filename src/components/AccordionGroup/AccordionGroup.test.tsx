/**
 * @jest-environment jsdom
 */
 import * as React from 'react';
 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event';
 
 import AccordionGroup from './AccordionGroup';
import Accordion from '../Accordion/Accordion';

 describe('AccordionGroup Component', () => {
    it('should render', async () => {
        render(<AccordionGroup>
            <Accordion title='Title'>
                Content
            </Accordion>
        </AccordionGroup>);

        await screen.findByRole('button');
        await screen.findByText(/Title/i);

        await screen.findByText(/Content/i);
    });
 })