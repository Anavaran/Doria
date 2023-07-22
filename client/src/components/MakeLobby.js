import React, { useState } from 'react';

const LobbyComponent = () => {
    const [lobbyCode, setLobbyCode] = useState("");
    const [message, setMessage] = useState("");

    const handleJoin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/lobbies/${lobbyCode}`);
            if (response.status === 200) {
                setMessage("Successfully joined lobby!");
            } else {
                setMessage("Failed to join lobby.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to join lobby.");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/lobbies/create', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            if (response.status === 200) {
                setMessage(`Lobby created! Your lobby code is ${data.lobbyCode}`);
            } else {
                setMessage("Failed to create lobby.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to create lobby.");
        }
    };

    return (
        <div>
            <div className="w-5/12 h-64 bg-secondary rounded-3xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0)]">
                <div className='text-black text-xl font-bold'>
                    ROOM CODE
                </div>
                <form onSubmit={handleJoin}>
                    <input 
                        type="text" 
                        maxLength={"5"}
                        placeholder="5 - LETTER CODE" 
                        value={lobbyCode}
                        onChange={e => setLobbyCode(e.target.value)}
                        className="w-10/12 px-3 py-2 no-animation text-xl text-black font-bold placeholder-gray-400  bg-white rounded-2xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0)]"
                    />
                    <div>
                        <button className="btn btn-primary text-xl text-white rounded-2xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0)]">Join Game</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LobbyComponent;