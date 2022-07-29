/**
 * @jest-environment jsdom
 */
 import * as React from 'react';
 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event';
 
 import Textarea from './Textarea';

 const eventHandlers = {
    onBlur: () => {},
    onChange: () => {},
    onClick: () => {},
    onFocus: () => {}
 }

 describe('Textarea Component', () => {
    it('should render', async () => {
        render(<Textarea label='Test' name='test' />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });     

    it('should contain an accessible label', () => {
        render(<Textarea label='Test' name='test' />);

        expect(screen.getByLabelText('Test')).toBeInTheDocument();
    });

    it('should render an accessible hint', () => {
        render(<Textarea label='Test' hint='Try something' name='test' />);

        const input = screen.getByLabelText('Test');
        const hint = screen.getByText('Try something');

        expect(hint).toBeInTheDocument();
        expect(input.getAttribute('aria-describedby')).toEqual(hint.getAttribute('id'));
    });

    it('should render an accessible error', () => {
        render(<Textarea label='Test' error='Error text' name='test' />);

        const input = screen.getByLabelText('Test');
        const error = screen.getByText('Error text');

        expect(error).toBeInTheDocument();
        expect(input.getAttribute('aria-errormessage')).toEqual(error.getAttribute('id'));
    });

    it('should focus the input when the label is clicked', async () => {
        const user = userEvent.setup();

        render(<Textarea
            label='Test'
            onBlur={eventHandlers.onBlur}
            name='test'
        />);

        await user.click(screen.getByText('Test'));

        expect(screen.getByLabelText('Test')).toHaveFocus();
    });

    it('should fire the `onBlur` event handler', async () => {
        const user = userEvent.setup();
        const spy = jest.spyOn(eventHandlers, 'onBlur');

        render(<Textarea
            label='Test'
            onBlur={eventHandlers.onBlur}
            name='test'
        />);

        await user.tab();
        await user.tab();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should fire the `onClick` event handler', async () => {
        const user = userEvent.setup();
        const spy = jest.spyOn(eventHandlers, 'onClick');

        render(<Textarea
            label='Test'
            onClick={eventHandlers.onClick}
            name='test'
        />);

        await user.click(screen.getByRole('textbox'));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should fire the `onChange` event handler', async () => {
        const user = userEvent.setup();
        const spy = jest.spyOn(eventHandlers, 'onChange');

        const changedValue = 'something';

        render(<Textarea
            label='Test'
            onChange={eventHandlers.onChange}
            name='test'
        />);

        await user.type(
            screen.getByLabelText('Test'),
            changedValue
        );

        expect(spy).toHaveBeenCalledTimes(changedValue.length);
    });

    it('should fire the `onFocus` event handler', async () => {
        const user = userEvent.setup();
        const spy = jest.spyOn(eventHandlers, 'onFocus');

        render(<Textarea
            label='Test'
            onFocus={eventHandlers.onFocus}
            name='test'
        />);

        await user.tab();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.skip('should not fire the `onBlur` event handler when disabled', async () => {
        const user = userEvent.setup();
        const spy = jest.spyOn(eventHandlers, 'onBlur');

        render(<Textarea
            disabled={true}
            label='Test'
            onBlur={eventHandlers.onBlur}
            name='test'
        />);

        await user.tab();
        await user.tab();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it.skip('should not fire the `onClick` event handler when disabled', async () => {
        const user = userEvent.setup();
        const spy = jest.spyOn(eventHandlers, 'onClick');

        render(<Textarea
            disabled={true}
            label='Test'
            onClick={eventHandlers.onClick}
            name='test'
        />);

        await user.click(screen.getByRole('textbox'));

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it.skip('should not fire the `onChange` event handler when disabled', async () => {
        const user = userEvent.setup();
        const spy = jest.spyOn(eventHandlers, 'onChange');

        const changedValue = 'something';

        render(<Textarea
            disabled={true}
            label='Test'
            onChange={eventHandlers.onChange}
            name='test'
        />);

        await user.type(
            screen.getByLabelText('Test'),
            changedValue
        );

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it.skip('should not fire the `onFocus` event handler when disabled', async () => {
        const user = userEvent.setup();
        const spy = jest.spyOn(eventHandlers, 'onFocus');

        render(<Textarea
            disabled={true}
            label='Test'
            onFocus={eventHandlers.onFocus}
            name='test'
        />);

        await user.tab();

        expect(spy).toHaveBeenCalledTimes(0);
    });
 });