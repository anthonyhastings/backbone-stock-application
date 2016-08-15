// Loading dependencies.
import StockModel from '../../models/StockModel/';

/**
 * Validates a form field by blanking it, ensuring there's an error, then
 * checking the error disappears after applying a passing value.
 *
 * @param {Backbone.Model} model
 * @param {String} fieldName
 * @param {String} passValue
 */
function validateFormField(model, fieldName, passValue) {
    model.set(fieldName, '');
    let validationAttempt = model.validate(model.attributes);

    expect(validationAttempt).to.be.object;
    expect(validationAttempt[0].field).to.equal(fieldName);
    model.set(fieldName, passValue);
    expect(model.isValid()).to.be.true;
};

describe('StockModel', function() {
    beforeEach(function() {
        this.model = new StockModel({
            name: 'Test Name',
            description: 'Test Description',
            available: 1466326800,
            price: 8.99,
            taxable: true
        }, {parse: true});
    });

    it('should have an API endpoint defined', function() {
        expect(this.model.url.length).to.be.greaterThan(0);
    });

    it('should be able to create a unix timestamp from a string', function() {
        let exampleDate = '2016/12/25';
        let exampleDatesTimestamp = 1482624000;
        let result = this.model.getTimestampFromString(exampleDate);

        expect(result).to.equal(exampleDatesTimestamp);
    });

    it('should parse initial data and output available/price formatted strings', function() {
        expect(this.model.attributes.availableFormatted.length).to.be.greaterThan(0);
        expect(this.model.attributes.priceFormatted.length).to.be.greaterThan(0);
    });

    it('should validate the name field', function() {
        validateFormField(this.model, 'name', 'Test Name');
    });

    it('should validate the description field', function() {
        validateFormField(this.model, 'description', 'Test Description');
    });

    it('should validate the available field', function() {
        validateFormField(this.model, 'available', 1458118800);
    });

    it('should validate the price field', function() {
        validateFormField(this.model, 'price', 80);
    });

    it('should validate the taxable field', function() {
        validateFormField(this.model, 'taxable', false);
    });
});
