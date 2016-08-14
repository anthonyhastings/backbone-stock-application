// Loading dependencies.
import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.View.extend({
    /**
     * Reference to the table body element (for adding new rows).
     *
     * @param {Object}
     */
    tableBodyElement: null,

    /**
     * Pre-compiled template function for this view.
     * @type {Function}
     */
    template: require('./view-template.handlebars'),

    /**
     * Pre-compiled template for an individual row.
     *
     * @type {Function}
     */
    rowElementTemplate: require('./row.handlebars'),

    /**
     * Setting up collection listeners for the retrieval of data.
     */
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.onCollectionReset);
        this.listenTo(this.collection, 'add', this.onCollectionAdd);
    },

    /**
     * Renders this views template into the view element.
     *
     * @return {Backbone.View}
     */
    render: function() {
        this.$el.html(this.template({
            stock: this.collection.toJSON()
        }));

        this.tableBodyElement = this.el.querySelector('.js-table-body');

        return this;
    },

    /**
     * Renders an individual stock model into the table body of the view.
     *
     * @param {Backbone.Model} stockModel
     */
    renderIndividual: function(stockModel) {
        let rowElement = $(this.rowElementTemplate(stockModel.toJSON()));

        this.tableBodyElement.appendChild(rowElement[0]);
    },

    /**
     * Whenever the collection resets itself due to a full sync,
     * re-render the whole view.
     */
    onCollectionReset: function() {
        this.render();
    },

    /**
     * Whenever a single model has been saved to the server, render a single
     * row and inject into the table.
     *
     * @param {Backbone.Model} stockModel
     */
    onCollectionAdd: function(stockModel) {
        this.renderIndividual(stockModel);
    }
});
