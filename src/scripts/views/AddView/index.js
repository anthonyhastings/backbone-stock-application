// Loading dependencies.
import Backbone from 'backbone';
import $ from 'jquery';
import eventBus from '../../utils/eventBus/';
import StockModel from '../../models/StockModel/';

export default Backbone.View.extend({
    /**
     * Will contain references to all form elements.
     *
     * @type {Object}
     */
    formElements: null,

    /**
     * CSS selector for form field error elements.
     *
     * @type {String}
     */
    errorElementClass: 'js-error-message',

    /**
     * Pre-compiled template function for this view.
     *
     * @type {Function}
     */
    template: require('./view-template.handlebars'),

    /**
     * Pre-compiled template function for form field error elements.
     *
     * @type {Function}
     */
    errorElementTemplate: require('./error-template.handlebars'),

    /**
     * DOM events relevant to the elements within this particular view.
     *
     * @type {Object}
     */
    events: {
        'blur input': 'onInputBlur',
        'click button[type="submit"]': 'onSubmitClick'
    },

    /**
     * Creates an object to store DOM selectors for form field elements after
     * they're rendered to the DOM, and creating a blank stock model.
     */
    initialize: function() {
        this.formElements = {};
        this.createNewModel();
    },

    /**
     * Rendering the views template and caching re-used DOM selectors.
     *
     * @return {Backbone.View}
     */
    render: function() {
        this.$el.html(this.template());
        this.cacheFormFields();

        return this;
    },

    /**
     * Stops listening to any existing model before creating a new one
     * and storing its reference over the old models.
     */
    createNewModel: function() {
        if (this.model instanceof StockModel) {
            this.stopListening(this.model, 'invalid', this.onModelInvalid);
            this.stopListening(this.model, 'sync', this.onModelSaved);
            this.model = null;
        }

        this.model = new StockModel();
        this.listenTo(this.model, 'invalid', this.onModelInvalid);
        this.listenTo(this.model, 'sync', this.onModelSaved);
    },

    /**
     * Caches form field elements for future use during this views lifetime.
     */
    cacheFormFields: function() {
        this.formElements.name = this.el.querySelector('input[name="name"]');
        this.formElements.description = this.el.querySelector('input[name="description"]');
        this.formElements.price = this.el.querySelector('input[name="price"]');
        this.formElements.taxable = this.el.querySelector('input[name="taxable"]');
        this.formElements.available = this.el.querySelector('input[name="available"]');
    },

    /**
     * Cycles each of the form fields and resets their values.
     */
    clearFormFields: function() {
        for (let key in this.formElements) {
            let element = this.formElements[key];

            if (element.getAttribute('type') === 'checkbox') {
                element.checked = false;
            } else {
                element.value = '';
            }
        }
    },

    /**
     * Determines if a form field has an error message present and if so,
     * removes the error element.
     *
     * @param {Object} fieldElement
     */
    clearFieldError: function(fieldElement) {
        let parentElement = fieldElement.parentNode;
        let errorElement = parentElement.querySelector(`.${this.errorElementClass}`);

        if (errorElement) {
            parentElement.removeChild(errorElement);
        }
    },

    /**
     * Cycles validation error stack and creates/re-uses error elements to
     * display the latest validation error for a particular field.
     *
     * @param {Backbone.Model} model
     * @param {Array} errors
     */
    onModelInvalid: function(model, errors) {
        errors.forEach(function(error) {
            let formField = this.formElements[error.field];
            let fieldParent = formField.parentNode;
            let errorElement = fieldParent.querySelector(`.${this.errorElementClass}`);

            if (errorElement) {
                errorElement.textContent = error.message;
            } else {
                errorElement = $(this.errorElementTemplate({
                    selectorClass: this.errorElementClass,
                    message: error.message
                }));

                fieldParent.appendChild(errorElement[0]);
            }
        }, this);
    },

    /**
     * Whenever the current view model has successfully been saved to the
     * server we reset the form and create a new model for populating.
     */
    onModelSaved: function() {
        this.clearFormFields();
        this.createNewModel();
    },

    /**
     * After the user leaves a form field we will assume they've updated it
     * and corrected any potential errors that the field had.
     *
     * @param {Object} event
     */
    onInputBlur: function(event) {
        this.clearFieldError(event.target);
    },

    /**
     * Upon submitting the form we clear old errors, set model data and
     * validate the submission; if all is well then save the model.
     *
     * @param {Object} event
     */
    onSubmitClick: function(event) {
        event.preventDefault();

        for (let key in this.formElements) {
            this.clearFieldError(this.formElements[key]);
        }

        this.model.set({
            name: this.formElements.name.value,
            description: this.formElements.description.value,
            price: parseFloat(this.formElements.price.value),
            taxable: this.formElements.taxable.checked,
            available: this.model.getTimestampFromString(this.formElements.available.value)
        });

        if (this.model.isValid()) {
            this.model.save(null, {
                success: () => {
                    eventBus.trigger(eventBus.eventKeys.STOCK_ADDED, this.model);
                }
            });
        }
    }
});
