import * as React from 'react';
import classNames from 'classnames';

import {
    useCreateBlurHandler,
    useCreateClickHandler,
    useCreateFocusHandler
} from '../../hooks';

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    /**
     * A URL to navigate to.
     */
    href: string;
    /**
     * Controls the style of the link.
     * 
     * Default value: 'link'
     */
    variant?: 'link' | 'button';
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({
    children,
    className,
    href,
    onBlur,
    onClick,
    onFocus,
    variant = 'link',
    ...props
}, ref) => {
    if (process.env.ENVIRONMENT !== 'production') {
        if (!href.startsWith('http://') || !href.startsWith('https://')) {
            console.error(`
                DS: links require their href prop to start with either http:// or https://.
            `);
        }
    }

    const handleBlur = useCreateBlurHandler((event: React.FocusEvent<HTMLAnchorElement>) => {
        onBlur?.(event);
    }, false);
    
    const handleClick = useCreateClickHandler((event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
    }, false);
    
    const handleFocus = useCreateFocusHandler((event: React.FocusEvent<HTMLAnchorElement>) => {
        onFocus?.(event);
    }, false);

    return <a
        {...props}
        className={
            classNames(
                'link',
                variant,
                className
            )
        }
        href={href}
        onBlur={handleBlur}
        onClick={handleClick}
        onFocus={handleFocus}
        ref={ref}
    >
        {children}
    </a>
});

Link.displayName = 'Link';

export type {
    LinkProps
};

export default Link;