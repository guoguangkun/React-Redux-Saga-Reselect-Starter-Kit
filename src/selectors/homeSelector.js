/**
 * Created by malin on 16/12/6.
 */
import { createSelector } from 'reselect';

export const homeSelector = createSelector(
    state => state.home.host,
    state => state.home.address,
    (host, address) => {
        return {
            host,
            address,
        };
    },
);

// export default homeSelector;

