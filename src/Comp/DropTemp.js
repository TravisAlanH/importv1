import React from "react";

export default function DropTemp({ data, sentIndex }) {
    // console.log(data);
    return (
        <div>
            <select>
                <option value={data[sentIndex]}>{data[sentIndex]}</option>
                {data.map((item, index) => {
                    if (index === sentIndex) {
                        return;
                    }
                    return (
                        <option key={index} value={data[index]}>
                            {data[index]}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
