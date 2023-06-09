import express from 'express'
import * as d3 from 'd3';
import fs from 'fs';
import path from 'path';
import {apriori} from './helper/aperiori.js';
import bodyParser from 'body-parser';
import router from './routes/main.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use(router);

app.listen( { port: 3000,}, async () => {
    console.log('starting');
});