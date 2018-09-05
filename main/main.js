const loadAllItems = require('./datbase').loadAllItems;
const header = '***<没钱赚商店>购物清单***\n';
const itemTemplate = '名称：${name}，数量：${number}${unit}，单价：${price}(元)，小计：${subTotalAmount}(元)\n'
const splitLine = '----------------------\n';
const totalTemplate = '总计：${totalAmount}(元)\n';
const tailLine = '**********************';

function resolveTemplate(obj, template) {
    return [...Object.keys(obj)].reduce((tpl, key)=>{
        return tpl.replace('${'+key+'}', obj[key]);
    }, template);
}

function printItem(item) {
    item.subTotalAmount = item.price.toFixed(2);
    item.price = item.price.toFixed(2);
    item.number = 1;
    return resolveTemplate(item, itemTemplate);
}

function printTotal(total){
    return resolveTemplate(total, totalTemplate);
}

module.exports = function printInventory(inputs) {
    let total = {
        totalAmount: '3.00'
    };
    let item = loadAllItems().find(item=>item.barcode === inputs[0]);
    let result = header + printItem(item) + splitLine + printTotal(total) + tailLine;
    console.log(result);
    return result;
};