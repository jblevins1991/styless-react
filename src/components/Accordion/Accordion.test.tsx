/**
 * @jest-environment jsdom
 */
 import * as React from 'react';
 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event';
 
 import Accordion from './Accordion';
 
 const eventHandlers = {
     // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
     onBlur: (event: React.FocusEvent<HTMLButtonElement>) => {},
     // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
     onClick: (event: React.MouseEvent<HTMLButtonElement>) => {},
     // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
     onFocus: (event: React.FocusEvent<HTMLButtonElement>) => {},
 };

 describe('Accordion Component', () => {
    it('should render', () => {
        render(<Accordion title='Title'>
            Content
        </Accordion>);

        screen.findByText(/Title/i);
        screen.findByText(/Content/i);
    });

    it('should have a class name of hidden', async () => {
        const user = userEvent.setup();

        render(<Accordion title='Title'>
            Content
        </Accordion>);

        expect((await screen.findByText(/Content/i)).classList).toContain('hidden');
    });

    it('should have a class name of visible', async () => {
        const user = userEvent.setup();

        render(<Accordion title='Title'>
            Content
        </Accordion>);

        await user.click(screen.getByRole('button'));

        expect((await screen.findByText(/Content/i)).classList).toContain('visible');
    });
 });