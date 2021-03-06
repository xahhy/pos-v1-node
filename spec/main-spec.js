const printInventory = require('../main/main');
describe('pos', function () {
    var inputs;

    beforeEach(function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });
    
    it('should print correct text', function () {
        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(printInventory(inputs)).toBe(expectText);
    });

    describe('item', function () {
        it('should print one item', function () {
            var expectText =
                '***<没钱赚商店>购物清单***\n' +
                '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
                '----------------------\n' +
                '总计：3.00(元)\n' +
                '**********************';
            expect(printInventory(['ITEM000001'])).toBe(expectText);
        });

        it('should print one item with quantity 2', function () {
            var expectText =
                '***<没钱赚商店>购物清单***\n' +
                '名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n' +
                '----------------------\n' +
                '总计：6.00(元)\n' +
                '**********************';
            expect(printInventory(['ITEM000001', 'ITEM000001'])).toBe(expectText);
        });

        it('should print one item with quantity 2 again', function () {
            var expectText =
                '***<没钱赚商店>购物清单***\n' +
                '名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n' +
                '----------------------\n' +
                '总计：6.00(元)\n' +
                '**********************';
            expect(printInventory(['ITEM000001-2'])).toBe(expectText);
        });

        it('should print two items', function () {
            var expectText =
                '***<没钱赚商店>购物清单***\n' +
                '名称：雪碧，数量：1瓶，单价：3.00(元)，小计：3.00(元)\n' +
                '名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)\n' +
                '----------------------\n' +
                '总计：18.00(元)\n' +
                '**********************';

            expect(printInventory(['ITEM000001', 'ITEM000003'])).toBe(expectText);
        });

        it('should print free item', function () {
            var expectText =
                '***<没钱赚商店>购物清单***\n' +
                '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
                '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
                '----------------------\n' +
                '挥泪赠送商品：\n' +
                '名称：雪碧，数量：1瓶\n' +
                '名称：方便面，数量：1袋\n' +
                '----------------------\n' +
                '总计：21.00(元)\n' +
                '节省：7.50(元)\n' +
                '**********************';

            expect(printInventory(['ITEM000001-5', 'ITEM000005-3'])).toBe(expectText);
        });
    });
});
