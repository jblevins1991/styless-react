import * as React from 'react';
import { useListFocusTrap } from '../../hooks';

import { AccordionHandle } from '../Accordion/Accordion';

interface AccordionGroupProps {
    children?: React.ReactNode;
}

const AccordionGroup: React.FC<AccordionGroupProps> = ({
    children
}) => {
    const accordionGroup = React.useRef(null);

    const returnFocus = () => accordionGroup.current.focus();

    const [
        isTrapped,
        setIsTrapped,
        focusableIndex,
        setFocusableIndex,
        handleOnKeyDown,
        previousFocusableIndex,
        setPreviousFocuableIndex,
    ] = useListFocusTrap(
        React.Children.count(children),
        returnFocus
    );

    const activeAccordion = React.useRef<AccordionHandle>(null);
    const previousAccordion = React.useRef<AccordionHandle>(null);

    React.useEffect(() => {
        if (isTrapped && activeAccordion.current) {
            activeAccordion.current.button.current.focus();
        }
    }, [isTrapped]);

    React.useEffect(() => {
        if (activeAccordion.current?.button.current) {
           activeAccordion.current.button.current.focus();
        }
    }, [focusableIndex]);

    React.useEffect(() => {
        activeAccordion.current?.open();
    }, [
        focusableIndex
    ]);

    React.useEffect(() => {
        previousAccordion.current?.close();
    }, [
        previousFocusableIndex
    ]);

    const handleOnAccordionClick = async (index: number) => {
        if (focusableIndex !== index) {
            await setPreviousFocuableIndex(focusableIndex);
            await setFocusableIndex(index);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log('key down')
        switch (event.key) {
            case 'ArrowDown':
                console.log('arrow down')
                setIsTrapped(true);
                break;
            default:
                break;
        }
    };

    return <div
        onKeyDown={handleKeyDown}
        tabIndex={0}
    >
        {
            React.Children.map(children, (child: React.ReactNode, index: number) => {
                const assertedChild = child as React.ReactElement;

                return React.cloneElement(assertedChild, {
                    key: assertedChild.props.title,
                    ...assertedChild.props,
                    onClick: () => {
                        handleOnAccordionClick(index);
                    },
                    onKeyDown: handleOnKeyDown,
                    ...(index === focusableIndex && { ref: activeAccordion }),
                    ...(index === previousFocusableIndex && { ref: previousAccordion })
                });
            })
        }
    </div>
};

export default AccordionGroup;