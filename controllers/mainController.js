import { apriori } from '../helper/aperiori.js';
import * as d3 from 'd3';
import fs from 'fs';
import path from 'path';

export const index = async (req, res, next) => {
    res.render('index-system-analysis', { aprioriResult: '' })
}

export const result = async (req, res, next) => {
    const { option } = req.body;;
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
    let transactions2 = [
        ['WHITE HANGING HEART T-LIGHT HOLDER'],
        ["POPPY'S PLAYHOUSE BEDROOM "],
        ["POPPY'S PLAYHOUSE KITCHEN"],
        ['WHITE HANGING HEART T-LIGHT HOLDER'],
        [
            'WHITE HANGING HEART T-LIGHT HOLDER',
            "POPPY'S PLAYHOUSE BEDROOM",
            "POPPY'S PLAYHOUSE KITCHEN"
        ],
        [
            "POPPY'S PLAYHOUSE BEDROOM ",
            'WHITE HANGING HEART T-LIGHT HOLDER'
        ],
        [
            'BLACK RECORD COVER FRAME',
            "POPPY'S PLAYHOUSE BEDROOM ",
            'WHITE METAL LANTERN',
            'WHITE HANGING HEART T-LIGHT HOLDER'
        ],
    ];

    // transactions2 = new Set(transactions2.map(transaction => new Set(transaction)));

    let aprioriResult = apriori(transactions2, option);

    let finalAprioriResult = [];
    let unique = true;
    for (let i = 0; i < aprioriResult.length; i++) {
        for (let j = i+1; j < aprioriResult.length; j++) {
            if (aprioriResult[i].itemset.size === aprioriResult[j].itemset.size && [...aprioriResult[i].itemset].every(value => aprioriResult[j].itemset.has(value))) {
                unique = false;
                break;
            }
        }
        if (unique) {
            finalAprioriResult.push(aprioriResult[i]);
        }
        unique = true;
    }
    
    res.render('index-system-analysis', { aprioriResult: finalAprioriResult });
}