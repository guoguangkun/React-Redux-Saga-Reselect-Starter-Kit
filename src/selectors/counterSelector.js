/**
 * Created by malin on 16/12/6.
 */
import {createSelector} from 'reselect'

export const counterSelector = createSelector(
    state => state.counter.counter,
    state => state.app.running,
    (counter, running) => {
        return {
            counter,
            running
        };
    }
);
