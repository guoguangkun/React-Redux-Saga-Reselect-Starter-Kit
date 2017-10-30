/**
 * Created by malin on 16/12/6.
 */
import {createSelector} from 'reselect'

export const appSelector = createSelector(
    state => state.app.running,
    state => state.app.notification,
    state => state.app.fetchErrMessage,
    state => state.table.dataSource,
    state => state.table.columns,
    state => state.table.tableName,
    state => state.app.modalVisible,
    (running, notification, fetchErrMessage, dataSource, columns, tableName, modalVisible) => {
        return {
            running,
            notification,
            fetchErrMessage,
            dataSource,
            columns,
	        tableName,
            modalVisible,
        };
    }
);
