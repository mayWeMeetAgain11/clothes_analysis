import {apriori} from '../helper/aperiori.js';
import * as d3 from 'd3';
import fs from 'fs';
import path from 'path';

export const index = async (req, res, next) => {
    res.render('index-system-analysis')
}

export const result = async (req, res, next) => {
    const {minSupport} = req.body;
    // const doubleValue = parseFloat(selectedValue);
    const data = d3.csvParse(fs.readFileSync(path.join('./', 'OnlineRetail.csv'), 'utf8'), d3.autoType);

    const clothing_items = [
        "BLACK RECORD COVER FRAME",
        "WHITE METAL LANTERN",
        "POPPY'S PLAYHOUSE BEDROOM ",
        "WHITE HANGING HEART T-LIGHT HOLDER"
    ];

    const clothing_data = data.filter((d) => clothing_items.includes(d.Description));

    const groupedData = d3.group(clothing_data, d => d.CustomerID, d => d.InvoiceDate);

    const transactions = [];

    for (const [customerId, nestedMap] of groupedData) {
        for (const [invoiceDate, items] of nestedMap) {
            const transaction = items.map((d) => d.Description);
            transactions.push(transaction);
        }
    }

    let aprioriResult = apriori(transactions, minSupport);
    
    res.render('result', { aprioriResult: aprioriResult });
}