import React, { useState, useEffect } from 'react';
import './TicTacToeGame.css';

const TicTacToeGame = () => {
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [gameActive, setGameActive] = useState(true);

    // Function to check for a winner
    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winning symbol (X or O)
            }
        }

        if (!board.includes('')) {
            return 'T'; // Return 'T' for a tie
        }

        return null; // No winner yet
    };

    // Function to handle a move
    const handleMove = (index) => {
        if (board[index] || !gameActive) {
            return; // Cell already filled or game over
        }

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
    };

    useEffect(() => {
        const winner = checkWinner();
        if (winner) {
            setGameActive(false);
            if (winner === 'T') {
                alert('It\'s a tie!');
            } else {
                alert(`Player ${winner} wins!`);
            }
        } else {
            setCurrentPlayer((prevPlayer) => (prevPlayer === 'O' ? 'X' : 'O'));
        }
    }, [board, gameActive]);

    // Function to render the game board
    const renderBoard = () => {
        return (
            <div id="board-container">
                {board.map((cell, index) => (
                    <div key={index} className="cell" onClick={() => handleMove(index)}>
                        {cell}
                    </div>
                ))}
            </div>
        );
    };

    // Initialize the game board
    return (
        <div>
            {renderBoard()}
        </div>
    );
};

export default TicTacToeGame;