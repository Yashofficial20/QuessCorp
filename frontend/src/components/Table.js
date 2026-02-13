import React from 'react';
import '../index.css';

const Table = ({ columns, data, onDelete }) => {
    if (!data || data.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <div className="empty-state-text">No data available</div>
                <div className="empty-state-subtext">Start by adding some records</div>
            </div>
        );
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                        {onDelete && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row.id || index}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {column.render ? column.render(row) : row[column.key]}
                                </td>
                            ))}
                            {onDelete && (
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onDelete(row.id)}
                                        style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
