import StockCollection from './index.js';
import StockModel from '../../models/StockModel/';

describe('StockCollection', function() {
    beforeEach(function() {
        this.collection = new StockCollection([{
            name: 'Test Name',
            description: 'Test Description',
            available: 1466326800,
            price: 8.99,
            taxable: true
        }]);
    });

    it('should have an API endpoint defined', function() {
        expect(this.collection.url.length).to.be.greaterThan(0);
    });

    it('should use StockModel internally', function() {
        expect(this.collection.models[0]).to.be.instanceof(StockModel);
    });
});
