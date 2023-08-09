import React from "react";
import DropInput from "./DropInput";
import DropTemp from "./DropTemp";

export default function DataMatch({ dcTrackObject, userInputData }) {
    console.log(JSON.parse(userInputData)[0]);
    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
                {dcTrackObject.Data.map((data, index) => {
                    return (
                        <DropTemp
                            key={index}
                            data={dcTrackObject.Data}
                            sentIndex={index}
                        />
                    );
                })}
            </div>
            <div className="flex flex-col gap-4">
                {dcTrackObject.Data.map((data, index) => {
                    return (
                        <DropInput
                            key={index}
                            data={JSON.parse(userInputData)[1]}
                            sentMatch={dcTrackObject.Data[index]}
                        />
                    );
                })}
            </div>
        </div>
    );
}
