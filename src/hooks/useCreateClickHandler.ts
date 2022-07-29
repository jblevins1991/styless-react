import * as React from 'react';

const useCreateClickHandler = <ElementType>(
    onClick: (event: React.MouseEvent<ElementType>) => void,
    disabled = false
) => {
    return (event: React.MouseEvent<ElementType>) => {
        if (disabled) return;

        onClick?.(event);
    };
};

export default useCreateClickHandler;
