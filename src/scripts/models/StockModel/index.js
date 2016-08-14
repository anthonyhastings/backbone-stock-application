// Loading dependencies.
import {Model} from 'backbone';
import moment from 'moment';

export default Model.extend({
    /**
     * URL to post stock information to and create a record.
     *
     * @type {String}
     */
    url: '/api/stock',

    /**
     * Take a date string and determines the unix timestamp in seconds.
     *
     * @param {String} dateString
     * @return {Number|Boolean}
     */
    getTimestampFromString: function(dateString) {
        if (typeof(dateString) !== 'string' || dateString.length <= 0) {
            return false;
        }

        return moment(dateString).unix();
    },

    /**
     * Parses raw model data and formats it for use within a view template.
     * Specifically we're converting a UTC timestamp to a readable date and
     * denoting whether price includes tax.
     *
     * @param {Object} response
     * @return {Object}
     */
    parse: function(response) {
        let formattedTimestamp = moment.unix(response.available).format('D/M/YYYY');

        response.availableFormatted = formattedTimestamp;
        response.priceFormatted = (response.taxable) ?
            `${response.price} (incl. tax)` : response.price.toString();

        return response;
    },

    /**
     * Validates the model data to ensure it is ready for persisting
     * to the server. If valid, nothing should be returned.
     *
     * @param {Object} attributes
     * @return {Array|Null}
     */
    validate: function(attributes) {
        let errors = [];

        if (!attributes.hasOwnProperty('name')
            || typeof(attributes.name) !== 'string'
            || attributes.name.length <= 0) {
            errors.push({field: 'name', message: 'Please supply a name.'});
        }

        if (!attributes.hasOwnProperty('description')
            || typeof(attributes.description) !== 'string'
            || attributes.description.length <= 0) {
            errors.push({field: 'description', message: 'Please supply a description.'});
        }

        if (!attributes.hasOwnProperty('available')
           || typeof(attributes.available) !== 'number'
           || !moment.unix(attributes.available).isValid()) {
            errors.push({field: 'available', message: 'Please supply an available date (YYYY-MM-DD).'});
        }

        if (!attributes.hasOwnProperty('price')
           || Number.isNaN(attributes.price)
           || typeof(attributes.price) !== 'number'
           || attributes.price <= 0) {
            errors.push({field: 'price', message: 'Please supply a price above zero.'});
        }

        if (!attributes.hasOwnProperty('taxable')
           || typeof(attributes.taxable) !== 'boolean') {
            errors.push({field: 'taxable', message: 'Please denote if the item is taxable.'});
        }

        return (errors.length > 0) ? errors : null;
    }
});
