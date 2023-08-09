import React from "react";
import dcTrackTemplateArray from "../Data/dcTrackTemplateArray";
import { read, utils } from "xlsx";

export default function InputField({ setDcTrackObject, setUserInputData }) {
    function setSelected(e) {
        setDcTrackObject(dcTrackTemplateArray[e.target.value]);
    }

    function getFile() {
        const file = document.getElementById("fileInput").files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const data = event.target.result;
                const workbook = read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = utils.sheet_to_json(sheet, { header: 1 });
                const result = [];
                const header = jsonData[0];
                for (let i = 1; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    const item = {};
                    for (let j = 0; j < header.length; j++) {
                        item[header[j]] = row[j];
                    }
                    result.push(item);
                }
                const jsonStr = JSON.stringify(result, null, 2);
                setUserInputData(jsonStr);
            };
            reader.readAsBinaryString(file);
        } else {
            alert("Please select a file.");
        }
    }

    return (
        <div className="flex flex-row justify-start">
            <select onChange={setSelected}>
                <option>Select a Template</option>
                {dcTrackTemplateArray.map((dcTrackTemplate, index) => {
                    return (
                        <option key={index} value={index}>
                            {dcTrackTemplate.Object}
                        </option>
                    );
                })}
            </select>
            <input
                type="file"
                id="fileInput"
                accept=".xlsx, .xls"
                className="border-2 border-gray-300 rounded-md p-2 m-2"
            />
            <button
                id="convertBtn"
                className="border-2 border-gray-300 rounded-md p-2 m-2"
                onClick={getFile}
            >
                Convert to JSON
            </button>
        </div>
    );
}
