/* eslint-disable no-undef */
import React, { useEffect, useMemo } from 'react';

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const getHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const DESKTOP_BREAKPOINT = 768;

export function useCurrentWitdh() {
    // save current window width in the state object
    const [width, setWidth] = React.useState(getWidth());

    const isMobile = useMemo(() => width < DESKTOP_BREAKPOINT, [width]);

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;
        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    return [width, isMobile];
}

export function useCurrentHeight() {
    // save current window width in the state object
    const [height, setHeight] = React.useState(getHeight());

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;
        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setHeight(getHeight()), 150);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    return [height];
}
