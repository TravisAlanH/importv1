import React from "react";

export default function TableView({ data }) {
    console.log(typeof data);
    return (
        <table border="1">
            <thead>
                <tr>
                    {Object.keys(data[0]).map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((entry, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(entry).map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
