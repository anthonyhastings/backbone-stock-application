// Loading dependencies.
import _ from 'underscore';
import {Events} from 'backbone';

/**
 * Creating an event bus with internal application keys.
 *
 * @type {Backbone.Events}
 */
export default _.extend({}, Events, {
    eventKeys: {
        STOCK_ADDED: 'app.stockAdded'
    }
});
