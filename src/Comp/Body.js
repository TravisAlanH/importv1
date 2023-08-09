import React, { useState } from "react";
import InputField from "./InputField";
import stringSimilarity from "string-similarity";
import DataMatch from "./DataMatch";
import TableView from "./Tableview";

export default function Body() {
    const [dcTrackObject, setDcTrackObject] = useState();
    const [userInputData, setUserInputData] = useState();

    console.log("Temp", dcTrackObject);

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

    if (userInputData !== undefined) {
        let userInputDataArray = JSON.parse(userInputData);

        // dcTrackObject.Data.map((importName, index) => {
        let importNames = [
            "# Operation",
            "Object",
            "Name",
            "Make",
            "Model",
            "Location",
            "Cabinet",
            "U Position",
            "Rails Used",
            "Orientation",
        ];

        let newObj = {};

        for (let i = 0; i < importNames.length; i++) {
            // userInputDataArray.map((items, index) => {
            // let first = userInputDataArray[index];
            let first = userInputDataArray[0];
            let firstKey = Object.keys(first);

            const match = importNames[i];
            let bestMatches = findBestMatches(firstKey, match);
            let bestMatch = bestMatches[0];
            // console.log(bestMatch);
            let value = first[bestMatch];
            // let object = {
            //     [match]: value,
            // };
            newObj[match] = value;
            // object = { ...object, ...first };
            // delete object[bestMatch];
            // userInputDataArray[0] = object;
            // userInputDataArray[index] = object;
            delete first[bestMatch];

            //}
            //);
            console.log(newObj);
        }
        // });

        // userInputDataArray.map((items) => {
        //     delete Object.assign(items, { match: items.bestMatch }).bestMatch;
        // });

        // need to replace the key in userInputDataArray with the match

        // console.log("Input Parsed", userInputDataArray[0]);
        // console.log("First", first);
        // console.log("First Key", firstKey);
        // console.log(`Matches to : "${match}"`, bestMatches);
        // console.log("Best Match :", value);
        // console.log("Array Changed", userInputDataArray);
    }

    // let jsonLink;

    // function jsonLinkAssignment(e) {
    //     jsonLink = e.target.value;
    //     console.log(jsonLink);
    // }

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

            {userInputData !== undefined ? (
                <div>
                    <TableView data={JSON.parse(userInputData)} />
                </div>
            ) : (
                <div>test2</div>
            )} */}
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
