const loadAllItems = require('./datbase').loadAllItems;
const header = '***<没钱赚商店>购物清单***\n';
const itemTemplate = '名称：${name}，数量：${number}${unit}，单价：${price}(元)，小计：${subTotalAmount}(元)\n'
const splitLine = '----------------------\n';
const totalTemplate = '总计：${totalAmount}(元)\n';
const tailLine = '**********************';

function resolveTemplate(obj, template) {
    return [...Object.keys(obj)].reduce((tpl, key) => {
        return tpl.replace('${' + key + '}', obj[key]);
    }, template);
}

function printItem(item) {
    item.subTotalAmount = (item.price * item.number).toFixed(2);
    item.price = item.price.toFixed(2);
    return resolveTemplate(item, itemTemplate);
}

function printTotal(total) {
    return resolveTemplate({totalAmount: total}, totalTemplate);
}

function getItem(input) {
    return loadAllItems().find(item => item.barcode === input);
}

function getTotal(items) {
    return items.map(item=>item.price * item.number).reduce((sum, price)=>sum+=price, 0).toFixed(2);
}

module.exports = function printInventory(inputs) {
    let itemNumber={};
    let items;
    inputs.forEach(item => {
        itemNumber[item] = itemNumber[item] ? ++itemNumber[item] : 1;
    });
    items = [...Object.keys(itemNumber)].map(key=>Object.assign(getItem(key), {number: itemNumber[key]}));
    let result = header + printItem(items[0]) + splitLine + printTotal(getTotal(items)) + tailLine;
    console.log(result);
    return result;
};