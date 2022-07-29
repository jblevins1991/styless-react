/**
 * @jest-environment jsdom
 */
 import * as React from 'react';
 import { render, screen } from '@testing-library/react';
 
 import {
    Breadcrumb
 } from '..';

 describe('Breadcrumb Component', () => {
    it('should render', async () => {
        render(
            <Breadcrumb
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
            />
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
 });