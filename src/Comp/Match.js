function findBestMatches(data, targetMake, numMatches) {
    const bestMatches = [];

    const targetMakeUpperCase = targetMake.toUpperCase();

    for (const entry of data) {
        const makeKey = "Make *";
        const entryMake = entry[makeKey].toUpperCase();

        const levenshteinDistance = calculateLevenshteinDistance(
            entryMake,
            targetMakeUpperCase
        );

        bestMatches.push({
            entry,
            distance: levenshteinDistance,
        });
    }

    bestMatches.sort((a, b) => a.distance - b.distance);

    const closestMatches = bestMatches
        .slice(0, numMatches)
        .map((entry) => entry.entry);

    return closestMatches;
}

function calculateLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = new Array(a.length + 1);
    for (let i = 0; i <= a.length; i++) {
        matrix[i] = new Array(b.length + 1).fill(0);
        matrix[i][0] = i;
    }

    for (let j = 0; j <= b.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[a.length][b.length];
}

const inputJSON = [
    {
        "Make *": "Eaton",
        "Model Name *": "V48M28T30CUEE",
        "Class *": "AC Distribution",
        "Rack Units *": "18",
    },
    // ... (other entries)
];

const targetMake = "eaton"; // Example target input
const numMatches = 3;

const bestMatches = findBestMatches(inputJSON, targetMake, numMatches);

if (bestMatches.length > 0) {
    console.log(`Best ${numMatches} matches for "${targetMake}":`);
    bestMatches.forEach((entry, index) => {
        console.log(`${index + 1}:`, entry);
    });
} else {
    console.log("No matches found");
}
