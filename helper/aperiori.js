
export function apriori(transactions, minSupport) {
    // Generate candidate itemsets of size 1
    let candidateItemsets = generateItemsetsOfSize1(transactions);
    let frequentItemsets = [];
    while (candidateItemsets.length > 0) {
        // Count the support of each candidate itemset
        let itemsetCounts = countItemsets(transactions, candidateItemsets);
        // Filter out candidate itemsets that don't meet the minimum support threshold
        let frequentItemsetsOfSizeK = filterItemsetsBySupport(
        itemsetCounts,
        minSupport
        );
        // Add frequent itemsets of size k to the list of frequent itemsets
        frequentItemsets.push(...frequentItemsetsOfSizeK);
        // Generate candidate itemsets of size k+1 from frequent itemsets of size k
        candidateItemsets = generateCandidateItemsets(frequentItemsetsOfSizeK);
        // If there are no candidate itemsets left, terminate the algorithm
        if (candidateItemsets.length == 0) {
            break;
        }
    }
    return frequentItemsets;
}

export function generateItemsetsOfSize1(transactions) {
    let itemsets = new Set();
    for (let transaction of transactions) {
        for (let item of transaction) {
            itemsets.add(new Set([item]));
        }
    }
    return [...itemsets];
}

export function countItemsets(transactions, itemsets) {
    let itemsetCounts = new Map();
    for (let transaction of transactions) {
        for (let itemset of itemsets) {
            if (isSubset(itemset, new Set(transaction))) {
                let count = itemsetCounts.get(itemset) || 0;
                itemsetCounts.set(itemset, count + 1);
            }
        }
    }
    return itemsetCounts;
}

export function filterItemsetsBySupport(itemsetCounts, minSupport) {
    let frequentItemsets = [];
    for (let [itemset, count] of itemsetCounts) {
        if (count >= minSupport) {
            frequentItemsets.push(itemset);
        }
    }
    return frequentItemsets;
}

export function generateCandidateItemsets(frequentItemsets) {
    let candidateItemsets = new Set();
    for (let i = 0; i < frequentItemsets.length; i++) {
        for (let j = i + 1; j < frequentItemsets.length; j++) {
            let union = new Set([...frequentItemsets[i], ...frequentItemsets[j]]);
            if (union.size == frequentItemsets[i].size + 1) {
                candidateItemsets.add(union);
            }
        }
    }
    return [...candidateItemsets];
}

export function isSubset(setA, setB) {
    for (let item of setA) {
        if (!setB.has(item)) {
            return false;
        }
    }
    return true;
}
