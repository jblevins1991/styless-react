import * as React from 'react';

import Button from "./Button";

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        onBlur: { action: true },
        onClick: { action: true },
        onFocus: { action: true }
    }
};

export const DefualtButton = (args) => {
    return <Button {...args}>
        Click me
    </Button>
}