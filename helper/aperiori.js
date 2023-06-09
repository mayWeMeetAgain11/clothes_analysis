
// // export function apriori(transactions, minSupport) {
// //     // Generate candidate itemsets of size 1
// //     let candidateItemsets = generateItemsetsOfSize1(transactions);
// //     let frequentItemsets = [];
// //     while (candidateItemsets.length > 0) {
// //         // Count the support of each candidate itemset
// //         let itemsetCounts = countItemsets(transactions, candidateItemsets);
// //         // Filter out candidate itemsets that don't meet the minimum support threshold
// //         let frequentItemsetsOfSizeK = filterItemsetsBySupport(
// //         itemsetCounts,
// //         minSupport
// //         );
// //         // Add frequent itemsets of size k to the list of frequent itemsets
// //         frequentItemsets.push(...frequentItemsetsOfSizeK);
// //         // Generate candidate itemsets of size k+1 from frequent itemsets of size k
// //         candidateItemsets = generateCandidateItemsets(frequentItemsetsOfSizeK);
// //         // If there are no candidate itemsets left, terminate the algorithm
// //         if (candidateItemsets.length == 0) {
// //             break;
// //         }
// //     }
// //     // frequentItemsets = frequentItemsets.filter((value, index) => frequentItemsets.indexOf(value) === index);
// //     /////////////////////////////////////////
// //     // frequentItemsets = frequentItemsets.filter((value, index, self) => {
// //     //     // Check if the index of the current array is the same as the index of its first occurrence
// //     //     return index === self.findIndex(array => array.every((item, i) => item === value[i]));
// //     // });
// //     /////////////////////////////////////////////////////////////
// //     // frequentItemsets = frequentItemsets.filter((value, index, self) => {
// //     //     // Check if the index of the current array is the same as the index of its first occurrence
// //     //     for (let i = 0; i < self.length; i++) {
// //     //         if (i !== index && self[i].length === value.length) {
// //     //             let equal = true;
// //     //             for (let j = 0; j < value.length; j++) {
// //     //                 if (self[i][j] !== value[j]) {
// //     //                     equal = false;
// //     //                     break;
// //     //                 }
// //     //             }
// //     //             if (equal) {
// //     //                 return false;
// //     //             }
// //     //         }
// //     //     }
// //     //     return true;
// //     // });
// //     //////////////////////////////////////////////////////////////////
// //     // frequentItemsets = frequentItemsets.filter((value, index, self) => {
// //     //     // Convert the current array to a string for comparison
// //     //     const valueString = JSON.stringify(value);
// //     //     // Check if the index of the current string is the same as the index of its first occurrence
// //     //     return index === self.findIndex(array => JSON.stringify(array) === valueString);
// //     // });
// //     return frequentItemsets;
// // }

// export function apriori(transactions, minSupport) {
//     // Generate candidate itemsets of size 1
//     let candidateItemsets = generateItemsetsOfSize1(transactions);
//     let frequentItemsets = new Set();
//     while (candidateItemsets.length > 0) {
//         // Count the support of each candidate itemset
//         let itemsetCounts = countItemsets(transactions, candidateItemsets);
//         // Filter out candidate itemsets that don't meet the minimum support threshold
//         let frequentItemsetsOfSizeK = filterItemsetsBySupport(
//             itemsetCounts,
//             minSupport
//         );
//         // Add frequent itemsets of size k to the set of frequent itemsets
//         for (let itemset of frequentItemsetsOfSizeK) {
//             let sortedItemset = Array.from(itemset).sort();
//             frequentItemsets.add(sortedItemset);
//         }
//         // Generate candidate itemsets of size k+1 from frequent itemsets of size k
//         candidateItemsets = generateCandidateItemsets(frequentItemsetsOfSizeK);
//         // If there are no candidate itemsets left, terminate the algorithm
//         if (candidateItemsets.length == 0) {
//             break;
//         }
//     }
//     // Convert the set of frequent itemsets back to an array and return it
//     return Array.from(frequentItemsets);
// }

// export function generateItemsetsOfSize1(transactions) {
//     let itemsets = new Set();
//     for (let transaction of transactions) {
//         for (let item of transaction) {
//             itemsets.add(new Set([item]));
//         }
//     }
//     return [...itemsets];
// }

// // export function countItemsets(transactions, itemsets) {
// //     let itemsetCounts = new Map();
// //     for (let transaction of transactions) {
// //         for (let itemset of itemsets) {
// //             if (isSubset(itemset, new Set(transaction))) {
// //                 let count = itemsetCounts.get(itemset) || 0;
// //                 itemsetCounts.set(itemset, count + 1);
// //             }
// //         }
// //     }
// //     return itemsetCounts;
// // }

// function countItemsets(transactions, candidateItemsets) {
//     let itemsetCounts = new Map();
//     for (let transaction of transactions) {
//         for (let candidateItemset of candidateItemsets) {
//             if (isSubset(candidateItemset, transaction)) {
//                 let count = itemsetCounts.get(candidateItemset) || 0;
//                 itemsetCounts.set(candidateItemset, count + 1);
//             }
//         }
//     }
//     return itemsetCounts;
// }

// // export function filterItemsetsBySupport(itemsetCounts, minSupport) {
// //     let frequentItemsets = [];
// //     for (let [itemset, count] of itemsetCounts) {
// //         if (count >= minSupport) {
// //             frequentItemsets.push(itemset);
// //         }
// //     }
// //     return frequentItemsets;
// // }

// function filterItemsetsBySupport(itemsetCounts, minSupport) {
//     let frequentItemsets = new Set();
//     for (let [itemset, count] of itemsetCounts) {
//         if (count >= minSupport) {
//             frequentItemsets.add(itemset);
//         }
//     }
//     return frequentItemsets;
// }

// export function generateCandidateItemsets(frequentItemsets) {
//     let candidateItemsets = new Set();
//     for (let i = 0; i < frequentItemsets.length; i++) {
//         for (let j = i + 1; j < frequentItemsets.length; j++) {
//             let union = new Set([...frequentItemsets[i], ...frequentItemsets[j]]);
//             if (union.size == frequentItemsets[i].size + 1) {
//                 candidateItemsets.add(union);
//             }
//         }
//     }
//     return [...candidateItemsets];
// }

// export function isSubset(setA, setB) {
//     for (let item of setA) {
//         if (!setB.has(item)) {
//             return false;
//         }
//     }
//     return true;
// }



export function apriori(transactions, minSupport) {
    // Generate candidate itemsets of size 1
    let candidateItemsets = generateItemsetsOfSize1(transactions);
    let frequentItemsets = new Set();
    while (candidateItemsets.length > 0) {
        // Count the support of each candidate itemset
        let itemsetCounts = countItemsets(transactions, candidateItemsets);
        // Filter out candidate itemsets that don't meet the minimum support threshold
        let frequentItemsetsOfSizeK = filterItemsetsBySupport(
            itemsetCounts,
            minSupport
        );
        // Add frequent itemsets of size k to the set of frequent itemsets
        for (let itemset of frequentItemsetsOfSizeK) {
            let sortedItemset = Array.from(itemset).sort();
            frequentItemsets.add(sortedItemset);
        }
        // Generate candidate itemsets of size k+1 from frequent itemsets of size k
        candidateItemsets = generateCandidateItemsets(frequentItemsetsOfSizeK);
        // If there are no candidate itemsets left, terminate the algorithm
        if (candidateItemsets.length == 0) {
            break;
        }
    }
    // Convert the set of frequent itemsets back to an array and return it
    return Array.from(frequentItemsets);
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

function countItemsets(transactions, candidateItemsets) {
    let itemsetCounts = new Map();
    for (let transaction of transactions) {
        for (let candidateItemset of candidateItemsets) {
            if (isSubset(candidateItemset, transaction)) {
                let count = itemsetCounts.get(candidateItemset) || 0;
                itemsetCounts.set(candidateItemset, count + 1);
            }
        }
    }
    return itemsetCounts;
}

function filterItemsetsBySupport(itemsetCounts, minSupport) {
    let frequentItemsets = new Set();
    for (let [itemset, count] of itemsetCounts) {
        if (count >= minSupport) {
            frequentItemsets.add(itemset);
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