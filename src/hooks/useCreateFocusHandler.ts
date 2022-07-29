import * as React from 'react';

const useCreateFocusHandler = <ElementType>(
    onFocus: (event: React.FocusEvent<ElementType>) => void,
    disabled = false
) => {
    if (disabled) return () => {};

    return (event: React.FocusEvent<ElementType>) => {
        onFocus?.(event);
    };
};

export default useCreateFocusHandler;
