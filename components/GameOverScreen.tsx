
import React from 'react';
import { GameState } from '../types';
import { downloadCSV } from '../services/csvExport';

interface GameOverScreenProps {
  gameState: GameState;
  onReset: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameState, onReset }) => {
  const handleDownload = () => {
    downloadCSV(
      Array.from(gameState.allPlayers),
      gameState.history,
      `quizbowl_stats_${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  const isWin = gameState.ourScore > gameState.opponentScore;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-center">
        <div className={`text-6xl mb-4 ${isWin ? 'text-yellow-500' : 'text-gray-400'}`}>
          {isWin ? '🏆' : '🏁'}
        </div>
        <h1 className="text-4xl font-black text-blue-900 mb-2">Game Over!</h1>
        <p className="text-gray-500 text-xl mb-8">Final Recap</p>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 p-6 rounded-2xl border-b-4 border-blue-600">
            <p className="text-sm font-bold text-blue-800 uppercase tracking-tighter">Our Score</p>
            <p className="text-5xl font-black text-blue-900">{gameState.ourScore}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border-b-4 border-red-600">
            <p className="text-sm font-bold text-red-800 uppercase tracking-tighter">Opponent</p>
            <p className="text-5xl font-black text-red-900">{gameState.opponentScore}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl text-left mb-8 border border-gray-200">
          <h3 className="font-bold text-gray-700 mb-4 uppercase text-sm">Quick Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Team Buzzes</span>
              <span className="font-bold">{gameState.history.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Correct Answers</span>
              <span className="font-bold text-green-600">{gameState.history.filter(h => h.isCorrect).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bonuses Earned</span>
              <span className="font-bold text-blue-600">{gameState.history.filter(h => h.bonusCorrect).length}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleDownload}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg transition transform active:scale-95 text-lg flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CSV
          </button>
          <button
            onClick={onReset}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-xl transition"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
