import * as React from 'react';
import classNames from 'classnames';

import {
    useControlled,
    useCreateBlurHandler,
    useCreateClickHandler,
    useCreateFocusHandler
} from '../../hooks';

interface AccordionProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onChange?: (open: boolean) => void;
    onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    open?: boolean;
    title: React.ReactNode;
}

type AccordionHandle = {
    button: React.MutableRefObject<HTMLButtonElement>,
    close: () => void,
    open: () => void,
}

const Accordion = React.forwardRef<
    AccordionHandle,
    AccordionProps
>(({
    children,
    className,
    disabled = false,
    onBlur,
    onClick,
    onChange,
    onFocus,
    onKeyDown,
    open: openProp,
    title,
}, ref) => {
    const id = React.useId();
    const [open, setOpenIfUncontrolled] = useControlled({
        controlled: openProp,
        default: false,
        name: 'Accordion'
    });
    const button = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => {
        return {
            button,
            close: () => {
                setOpenIfUncontrolled(false);
                onChange?.(false);
            },
            open: () => {
                setOpenIfUncontrolled(true);
                onChange?.(false);
            },
        }
    }, [button]);

    React.useEffect(() => {
        onChange?.(open);
    }, [open]);

    const handleBlur = useCreateBlurHandler((event: React.FocusEvent<HTMLButtonElement>) => {
        onBlur?.(event);
    }, disabled);
    
    const handleClick = useCreateClickHandler((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenIfUncontrolled(!open);

        onClick?.(event);
    }, disabled);
    
    const handleFocus = useCreateFocusHandler((event: React.FocusEvent<HTMLButtonElement>) => {
        onFocus?.(event);
    }, disabled);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        onKeyDown?.(event);
    };

    return <>
        <button
            aria-owns={`${id}-accordion-body`}
            className={
                classNames(
                    'accordion-header',
                    className
                )}
            onBlur={handleBlur}
            onClick={handleClick}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            ref={button}
        >
            { title }
        </button>

        <div
            className={
                classNames(
                    'accordion-content',
                    open ? 'visible' : 'hidden'
                )}
            id={`${id}-accordion-body`}
        >
            { children }
        </div>
    </>;
});

Accordion.displayName = 'Accordion';

export type {
    AccordionProps,
    AccordionHandle
};

export default Accordion;