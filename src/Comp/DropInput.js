import React from "react";

export default function DropInput({ data, sentMatch }) {
    // console.log(sentMatch);

    let optionsFilled = [];

    Object.keys(data).forEach((key, index) => {
        optionsFilled.push(key);
    });

    function customSort(arr, inputLetter) {
        arr.sort((a, b) => {
            if (a.startsWith(inputLetter) && !b.startsWith(inputLetter)) {
                return -1;
            } else if (
                !a.startsWith(inputLetter) &&
                b.startsWith(inputLetter)
            ) {
                return 1;
            } else if (a.startsWith(inputLetter) && b.startsWith(inputLetter)) {
                if (a[1] === inputLetter[1] && b[1] !== inputLetter[1]) {
                    return -1;
                } else if (a[1] !== inputLetter[1] && b[1] === inputLetter[1]) {
                    return 1;
                } else {
                    return a.localeCompare(b);
                }
            } else {
                return a.localeCompare(b);
            }
        });

        return arr;
    }

    let twoSetMatch = sentMatch[0] + sentMatch[1];

    const sortedOptions = customSort(optionsFilled, twoSetMatch);

    return (
        <div>
            <select>
                {sortedOptions.map((item, index) => {
                    return (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
