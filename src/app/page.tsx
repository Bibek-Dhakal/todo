'use client';

import React, {useEffect, useState} from 'react';

interface ListItem {
    id: number;
    value: string;
}

const App: React.FC = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [list, setList] = useState<ListItem[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // Set a user input value
    const updateInput = (value: string): void => {
        setUserInput(value);
    };

    // Add or edit item
    const handleAction = (): void => {
        if (userInput.trim() === '') return;

        if (editIndex !== null) {
            const updatedList = list.map((item, index) =>
                index === editIndex ? { ...item, value: userInput } : item
            );
            localStorage.setItem('list', JSON.stringify(updatedList));
            setList(updatedList);
            setEditIndex(null);
        } else {
            const newItem: ListItem = {
                id: Math.random(),
                value: userInput,
            };
            localStorage.setItem('list', JSON.stringify([...list, newItem]));
            setList([...list, newItem]);
        }

        setUserInput('');
    };

    // Function to delete item from list using id to delete
    const deleteItem = (id: number): void => {
        const updatedList = list.filter((item) => item.id !== id);
        localStorage.setItem('list', JSON.stringify(updatedList));
        setList(updatedList);
    };

    // Function to enable editing mode
    const startEdit = (index: number): void => {
        setUserInput(list[index].value);
        setEditIndex(index);
    };

    useEffect(() => {
        const list = localStorage.getItem('list');
        if (list) {
            setList(JSON.parse(list));
        }
    }, []);

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    color: 'green',
                }}
            >
                Aswin
            </div>
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                }}
            >
                TODO LIST
            </div>
            <div
                style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
            >
                <input
                    style={{
                        fontSize: '1.2rem',
                        color: 'black',
                        padding: '10px',
                        marginRight: '10px',
                        flexGrow: '1',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                    placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
                    value={userInput}
                    onChange={(e) => updateInput(e.target.value)}
                />
                <button
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={handleAction}
                >
                    {editIndex !== null ? 'Update' : 'ADD'}
                </button>
            </div>
            <div
                style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}
            >
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px',
                                color: 'black',
                            }}
                        >
                            <span style={{ fontSize: '1.2rem', flexGrow: '1' }}>
                                {item.value}
                            </span>
                            <span>
                                <button
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        marginRight: '10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#2196f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => startEdit(index)}
                                >
                                    Edit
                                </button>
                            </span>
                        </div>
                    ))
                ) : (
                    <div
                        style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777' }}
                    >
                        No items in the list
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;