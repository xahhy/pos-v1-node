const loadAllItems = require('./datbase').loadAllItems;
const header = '***<没钱赚商店>购物清单***\n';
const itemTemplate = '名称：${name}，数量：${number}${unit}，单价：${price}(元)，小计：${subTotalAmount}(元)\n';
const freeItemTemplate = '名称：${name}，数量：${freeNumber}${unit}\n';
const splitLine = '----------------------\n';
const totalTemplate = '总计：${totalAmount}(元)\n';
const totalFreeTemplate = '节省：${totalFreeAmount}(元)\n';
const tailLine = '**********************';
const freeItemHeader = '挥泪赠送商品：\n';

function resolveTemplate(obj, template) {
    return [...Object.keys(obj)].reduce((tpl, key) => {
        return tpl.replace('${' + key + '}', obj[key]);
    }, template);
}

function getNoneFreeItemNumber(number) {
    return parseInt(number/3);
}

function printItem(item) {
    item.subTotalAmount = (item.price * (item.number - getNoneFreeItemNumber(item.number))).toFixed(2);
    item.price = item.price.toFixed(2);
    return resolveTemplate(item, itemTemplate);
}

function getFreeTotal(items) {
    return items.filter(item=>item.freeNumber !== 0)
        .map(item=>item.price * item.freeNumber)
        .reduce((sum, num)=>sum+=num, 0)
        .toFixed(2);
}

function printTotal(items) {
    let total = getTotal(items);
    let totalFreeAmount = getFreeTotal(items);
    let totalString = resolveTemplate({totalAmount: total}, totalTemplate);
    console.log(totalFreeAmount);
    if (totalFreeAmount == 0){
        return totalString
    }else {
        return totalString + resolveTemplate({totalFreeAmount: totalFreeAmount}, totalFreeTemplate)
    }
}

function getItem(input) {
    return loadAllItems().find(item => item.barcode === input);
}

function getTotal(items) {
    return items.map(item => item.price * (item.number - item.freeNumber)).reduce((sum, price) => sum += price, 0).toFixed(2);
}

function getItems(inputs) {
    let itemNumber = {};
    inputs.forEach(item => {
        if (item.indexOf('-') > -1) {
            let [code, number] = item.split('-');
            itemNumber[code] = itemNumber[code] ? itemNumber[code] += number : number;
        } else {
            itemNumber[item] = itemNumber[item] ? ++itemNumber[item] : 1;
        }
    });
    return [...Object.keys(itemNumber)]
        .map(key => Object.assign(
            getItem(key),
            {
                number: itemNumber[key],
                freeNumber: parseInt(itemNumber[key]/3)
            }
        ));
}

function printItems(items) {
    return items.map(item => printItem(item)).join('');
}

function printFreeItem(item) {
    return resolveTemplate(item, freeItemTemplate);
}

function printFreeItems(items){
    return items.filter(item=>item.freeNumber !== 0).map(item=>printFreeItem(item)).join('');
}
function printInventory(inputs) {
    let items = getItems(inputs);
    let result;
    if(items.filter(item=>item.freeNumber !== 0).length !== 0){
        result = [header, printItems(items), splitLine, freeItemHeader, printFreeItems(items), splitLine, printTotal(items), tailLine].join('')
    }else{
        result = header + printItems(items) + splitLine + printTotal(items) + tailLine;
    }
    console.log(result);
    return result;
};

printInventory(['ITEM000001']);
module.exports = printInventory;