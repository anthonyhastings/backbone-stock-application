// Loading dependencies.
import Backbone from 'backbone';
import dataStore from '../../utils/dataStore/';
import eventBus from '../../utils/eventBus/';
import StockCollection from '../../collections/StockCollection';
import AddView from '../AddView';
import ListView from '../ListView';

export default Backbone.View.extend({
    /**
     * Selector for view element already in the DOM.
     *
     * @type {String}
     */
    el: '.js-main-container',

    /**
     * Stores references to the instantiated views.
     *
     * @type {Array}
     */
    subViews: null,

    /**
     * Pre-compiled template function for this view.
     *
     * @type {Function}
     */
    template: require('./template.handlebars'),

    /**
     * Sets up an internal array to house the sub-views that will be made
     * during the rendering process. Creates our Stock collection and fetches
     * data from the API. Also binds application event listener(s).
     */
    initialize: function() {
        dataStore.stock = new StockCollection();
        dataStore.stock.fetch({reset: true});

        this.subViews = [];
        this.listenTo(eventBus, eventBus.eventKeys.STOCK_ADDED, this.onStockAdded);
    },

    /**
     * Renders this views template then initializes and renders sub-views.
     *
     * @return {Backbone.View}
     */
    render: function() {
        this.$el.html(this.template());

        let addView = new AddView({
            el: this.$el.find('.js-add-view')
        }).render();

        let listView = new ListView({
            el: this.$el.find('.js-list-view'),
            collection: dataStore.stock
        }).render();

        this.subViews.push(addView, listView);

        return this;
    },

    /**
     * Adds a stock model to the stock collection after it has been
     * persisted to the server.
     *
     * @param {Backbone.Model} stockModel
     */
    onStockAdded: function(stockModel) {
        dataStore.stock.add(stockModel);
    },

    /**
     * Calls cleanup logic for sub-views, resets the internal array then
     * triggers the standard view removal logic on itself.
     *
     * @return {Backbone.View}
     */
    remove: function() {
        this.subViews.forEach(function(subView, index) {
            subView.remove();
            this.subViews[index] = null;
        }, this);

        this.subViews.length = 0;

        return Backbone.View.prototype.remove.apply(this, arguments);
    }
});
