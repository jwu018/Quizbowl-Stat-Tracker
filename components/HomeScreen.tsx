
import React from 'react';
import { SavedGame } from '../types';
import { downloadCSV } from '../services/csvExport';

interface HomeScreenProps {
  history: SavedGame[];
  onNewGame: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ history, onNewGame }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
          <div>
            <h1 className="text-5xl font-black text-blue-900 tracking-tighter">Quizbowl Tracker</h1>
            <p className="text-gray-500 mt-2 font-medium">Professional stat tracking for teams</p>
          </div>
          <button
            onClick={onNewGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl shadow-xl transform active:scale-95 transition-all text-xl uppercase tracking-widest"
          >
            Start New Game
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Past 5 Games</h2>
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{history.length} Games Stored</span>
          </div>

          <div className="divide-y divide-gray-100">
            {history.length === 0 ? (
              <div className="p-12 text-center text-gray-400 italic">
                No game history available yet. Start your first match!
              </div>
            ) : (
              history.map((game) => (
                <div key={game.id} className="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{new Date(game.date).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400 font-bold uppercase">{game.history.length} Buzzes</span>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <p className="text-2xl font-black text-gray-800">
                        {game.ourScore} <span className="text-gray-300 font-light mx-1">vs</span> {game.opponentScore}
                      </p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${game.ourScore > game.opponentScore ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {game.ourScore > game.opponentScore ? 'WIN' : 'LOSS'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadCSV(game.allPlayers, game.history, `quizbowl_history_${game.id}.csv`)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl transition-colors text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      CSV
                    </button>
                  </div>
                </div>
              )).reverse() // Show newest first
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
