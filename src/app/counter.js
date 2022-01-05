import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, multiply } from './counterSlice';

export function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => {
                        if (typeof count === 'number') {
                        dispatch(increment());
                        } else {
                            dispatch(multiply());
                        }

                    }}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}