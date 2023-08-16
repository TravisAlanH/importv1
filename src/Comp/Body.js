import React, { useState } from "react";
import InputField from "./InputField";
import stringSimilarity from "string-similarity";
import DataMatch from "./DataMatch";
import TableView from "./Tableview";

export default function Body() {
    const [dcTrackObject, setDcTrackObject] = useState();
    const [userInputData, setUserInputData] = useState();

    console.log("Temp", dcTrackObject);

    /**
     * The function `findBestMatches` takes in a list of keys and an input phrase, removes special
     * characters, compares the similarity of each key to the input phrase, and returns the four best
     * matching keys.
     * @param input - The `input` parameter is a string that represents the input phrase or text.
     * @returns The function `findBestMatches` returns an array of the best matching phrases from the
     * `firstKey` array based on the similarity scores calculated using the `inputPhrase`.
     */
    function removeSpecialCharacters(input) {
        return input.replace(/[^\w\s]/g, "");
    }

    function findBestMatches(firstKey, inputPhrase) {
        const firstKeyUpper = firstKey.map((key) =>
            removeSpecialCharacters(key).toUpperCase()
        );
        const inputPhraseUpper = removeSpecialCharacters(inputPhrase)
            .toUpperCase()
            .slice(0, -3);
        const similarityScores = firstKeyUpper.map((key) =>
            stringSimilarity.compareTwoStrings(key, inputPhraseUpper)
        );
        const sortedIndices = similarityScores
            .map((_, index) => index)
            .sort((a, b) => similarityScores[b] - similarityScores[a]);
        const bestMatches = sortedIndices
            .slice(0, 4)
            .map((index) => firstKey[index]);
        return bestMatches;
    }

    let newObjArray = [];

    /* This code block is responsible for processing the user input data and creating a new array of
objects (`newObjArray`) based on the matching keys between the user input data and the
`dcTrackObject.Data` array. */
    if (userInputData !== undefined) {
        let userInputDataArray = JSON.parse(userInputData);
        userInputDataArray.forEach((element) => {
            let newObj = {};
            let importNames = dcTrackObject.Data;
            for (let i = 0; i < importNames.length; i++) {
                let first = element;
                let firstKey = Object.keys(first);
                const match = importNames[i];
                /* The line `let bestMatches = findBestMatches(firstKey, match);` is calling the `findBestMatches`
                function and passing in two arguments: `firstKey` and `match`. */
                let bestMatches = findBestMatches(firstKey, match);
                let bestMatch = bestMatches[0];
                console.log(bestMatch);
                let value = first[bestMatch];
                newObj[match] = value;
                delete first[bestMatch];
            }
            newObjArray.push(newObj);
        });
    }

    /* The `return (` statement is the start of the JSX code that will be rendered as the output of the
`Body` component. It is returning a JSX element, which is a representation of the user interface.
The JSX code inside the `return (` statement defines the structure and content of the component's
   output. */
    return (
        <div className="flex flex-col justify-end">
            <InputField
                setDcTrackObject={setDcTrackObject}
                setUserInputData={setUserInputData}
            />
            {/* <select onChange={jsonLinkAssignment}>
                <option>Select a Template</option>
                <option value="AC Distribution.json">AC Distribution</option>
                <option value="Battery.json">Battery</option>
                <option value="Cabinet.json">Cabinet</option>
                <option value="Data Panel.json">Data Panel</option>
                <option value="DC Distribution.json">DC Distribution</option>
                <option value="DC Power.json">DC Power</option>
                <option value="Device.json">Device</option>
                <option value="Floor PDU.json">Floor PDU</option>
                <option value="HVAC.json">HVAC</option>
                <option value="Network.json">Network</option>
                <option value="Passive.json">Passive</option>
                <option value="Power Outlet.json">Power Outlet</option>
                <option value="Power Source.json">Power Source</option>
                <option value="Probe.json">Probe</option>
                <option value="Rack PDU.json">Rack PDU</option>
                <option value="UPS.json">UPS</option>
            </select>
            */}
            {userInputData !== undefined ? (
                <div>
                    <TableView data={JSON.parse(userInputData)} />
                    <div className="pt-8"></div>
                    <TableView data={newObjArray} />
                </div>
            ) : (
                <div>test2</div>
            )}
            {/* {userInputData && dcTrackObject && (
                <div>
                    <div>
                        <DataMatch
                            dcTrackObject={dcTrackObject}
                            userInputData={userInputData}
                        />
                    </div>
                </div>
            )} */}
        </div>
    );
}
