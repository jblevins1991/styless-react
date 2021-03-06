import * as React from 'react';
import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {}

const ListItem: React.FC<ListItemProps> = ({
    children,
    className,
    ...props
}) => {
    return <li
        className={
            classNames(
                'list-item',
                className
            )
        }
        {...props}
    >
        {children}
    </li>
};

ListItem.displayName = 'ListItem';

export type {
    ListItemProps
};

export default ListItem;
