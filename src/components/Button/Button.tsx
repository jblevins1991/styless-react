import * as React from 'react';
import classNames from 'classnames';

import {
    useCreateBlurHandler,
    useCreateClickHandler,
    useCreateFocusHandler
} from '../../hooks';

import { color, size } from '../../types/commonProps';

type ButtonOmitProps = 'size';

interface ButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, ButtonOmitProps> {
    /**
     * The color of the button.
     * 
     * Default value: 'primary'
     */
    color?: color | 'success' | 'error';
    /**
     * Makes the button non-interactive.
     * 
     * Default value: false
     */
    disabled?: boolean;
    /**
     * Makes the button take 100% of the parent's width.
     * 
     * Default value: false
     */
    fullWidth?: boolean;
    /**
     * Adds a class to the button based on the size prop's value.
     * 
     * Default value: 'medium'
     */
    size?: size;
    /**
     * The behavior of the button when it is clicked in a form.
     * 
     * Default value: 'button'
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * Controls the style of the button.
     * 
     * Default value: 'filled'
     */
    variant?: 'filled' | 'outlined' | 'text';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    className,
    color = 'primary',
    disabled = false,
    fullWidth = false,
    onBlur,
    onClick,
    onFocus,
    size = 'medium',
    type = 'button',
    variant = 'filled',
    ...props
}, ref) => {
    const handleBlur = useCreateBlurHandler<HTMLButtonElement>((event: React.FocusEvent<HTMLButtonElement>) => {
        onBlur?.(event);
    }, disabled);
    
    const handleClick = useCreateClickHandler<HTMLButtonElement>((event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
    }, disabled);
    
    const handleFocus = useCreateFocusHandler<HTMLButtonElement>((event: React.FocusEvent<HTMLButtonElement>) => {
        onFocus?.(event);
    }, disabled);

    return <button
        {...props}
        className={classNames(
            'button',
            color,
            fullWidth,
            size,
            variant,
            className
        )}
        disabled={disabled}
        onBlur={handleBlur}
        onClick={handleClick}
        onFocus={handleFocus}
        type={type}
        ref={ref}
    >
        {children}
    </button>
});

Button.displayName = 'Button';

export type {
    ButtonProps
};

export default Button;