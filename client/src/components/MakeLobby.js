import React, { useState } from 'react';

const MakeLobby = ({ setIsLobbyActive, setCurrentLobbyCode }) => {
    const [lobbyCode, setLobbyCode] = useState("");

    const handleJoin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/lobbies/${lobbyCode}`);
            if (response.status === 200) {
                console.log("Successfully joined lobby!");
                setCurrentLobbyCode(lobbyCode);
                setIsLobbyActive(false);  // hide lobby and show CreateUser
            } else {
                console.log("Failed to join lobby.");
            }
        } catch (error) {
            console.error(error);
            console.log("Failed to join lobby.");
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
                console.log(`Lobby created! Your lobby code is ${data.lobbyCode}`);
                setCurrentLobbyCode(data.lobbyCode);
                setIsLobbyActive(false);  // hide lobby and show CreateUser

            } else {
                console.log("Failed to create lobby.");
            }
        } catch (error) {
            console.error(error);
            console.log("Failed to create lobby.");
        }
    };

    return (
        <div>
            <div className="grid-cols-1 w-5/12 h-64 bg-secondary rounded-3xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0)] ">
                <div className='text-black text-2xl font-rubik font-semibold'>
                    ROOM CODE
                </div>
                <form onSubmit={handleJoin}>
                    <input 
                        type="text" 
                        maxLength={"5"}
                        placeholder="5 - LETTER CODE" 
                        value={lobbyCode}
                        onChange={e => setLobbyCode(e.target.value)}
                        className="w-10/12 h-12 px-3 py-2 no-animation text-2xl text-black font-rubik font-semibold placeholder-gray-400  bg-white rounded-2xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0)]"
                    />
                    <div>
                        <button className="btn bg-primary w-5/12 h-14 text-white rounded-2xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0)]">Join Game</button>
                    </div>
                </form>
            </div>
            <button onClick={handleCreate} className="btn bg-white w-5/12 h-14 text-primary rounded-2xl border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0)]">Create Game</button>
        </div>
    );
};

export default MakeLobby;
