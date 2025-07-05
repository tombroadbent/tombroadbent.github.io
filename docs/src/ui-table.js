window.Table = ({ headers, rows, onParagraphClick }) => {
    return (
            <table className="min-w-full border border-gray-300 text-left table-auto">
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map((header, hIndex) => (
                            <th key={hIndex} className="px-4 py-2 border-b font-semibold text-gray-800">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rIndex) => (
                        <tr key={rIndex} className="hover:bg-gray-50">
                            {row.map((cell, cIndex) => (
                                <td
                                    key={cIndex}
                                    className="px-4 py-2 border-b text-gray-700 align-top"
                                    onClick={() => onParagraphClick({ type: 'text', content: cell })}
                                >
                                    {window.parseScriptureLinks(cell)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};