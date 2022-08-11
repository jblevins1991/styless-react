import * as React from 'react';
import classNames from 'classnames';

import { AttributeType } from '../../types/AttributeType';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UnorderedListProps extends AttributeType<HTMLUListElement> {}

const UnorderedList: React.FC<UnorderedListProps> = ({
    children,
    className,
    ...props
}) => {
    return <ul
        className={
            classNames(
                'unordered-list',
                className
            )
        }
        {...props}
    >
        {children}
    </ul>;
};

UnorderedList.displayName = 'UnorderedList';

export type {
    UnorderedListProps
};

export default UnorderedList;