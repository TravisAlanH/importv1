import React from "react";

export default function TableView({ data }) {
    console.log(typeof data);
    return (
        <table className="border-spacing-1">
            <thead>
                <tr className="border-spacing-1 my-4">
                    {Object.keys(data[0]).map((header, index) => (
                        <th key={index} className="px-8">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((entry, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(entry).map((value, colIndex) => (
                            <td key={colIndex} className="px-8">
                                <select>
                                    <option>{value}</option>
                                </select>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
