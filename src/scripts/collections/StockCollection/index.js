// Loading dependencies.
import {Collection} from 'backbone';
import StockModel from '../../models/StockModel';

export default Collection.extend({
    /**
     * URL to retrieve stock information from API.
     *
     * @type {String}
     */
    url: '/api/stock',

    /**
     * The model to use when parsing response data from API.
     *
     * @type {Backbone.Model}
     */
    model: StockModel
});
