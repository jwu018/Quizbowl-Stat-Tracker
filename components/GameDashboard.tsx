
import React, { useState } from 'react';
import { GameState, Player } from '../types';
import BuzzOutcomeModal from './BuzzOutcomeModal';
import SubstitutionModal from './SubstitutionModal';
import EndGameModal from './EndGameModal';

interface GameDashboardProps {
  gameState: GameState;
  onBuzzOutcome: (playerId: string, isCorrect: boolean, bonusCorrect: boolean) => void;
  onSubstitution: (index: number, newName: string) => void;
  onEndGame: (our: number, opp: number) => void;
}

const GameDashboard: React.FC<GameDashboardProps> = ({
  gameState,
  onBuzzOutcome,
  onSubstitution,
  onEndGame,
}) => {
  const [activeBuzzPlayer, setActiveBuzzPlayer] = useState<Player | null>(null);
  const [subIndex, setSubIndex] = useState<number | null>(null);
  const [isEndingGame, setIsEndingGame] = useState(false);

  const playerStats = gameState.activePlayers.map(p => {
    const playerBuzzes = gameState.history.filter(h => h.playerName === p.name);
    return {
      ...p,
      correctCount: playerBuzzes.filter(b => b.isCorrect).length,
      totalBuzzes: playerBuzzes.length,
    };
  });

  const totalBonuses = gameState.history.filter(h => h.bonusCorrect).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-900 text-white py-6 px-4 shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-widest">In-Game Tracker</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEndingGame(true)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold transition text-sm shadow-lg transform active:scale-95"
            >
              End Game
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 space-y-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-around items-center border-b-4 border-blue-500">
          <div className="text-center">
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">Total Buzzes</p>
            <p className="text-4xl font-black text-blue-900">{gameState.history.length}</p>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">Team Bonuses Correct</p>
            <p className="text-4xl font-black text-green-600">{totalBonuses}</p>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${playerStats.length > 1 ? 'md:grid-cols-2' : ''} ${playerStats.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-' + playerStats.length} gap-6`}>
          {playerStats.map((player, index) => (
            <div key={player.id} className="bg-white rounded-3xl p-6 shadow-md border border-gray-200 flex flex-col items-center">
              <div className="w-full flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-tighter">Pos {index + 1}</span>
                <button 
                  onClick={() => setSubIndex(index)}
                  className="text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
              
              <h3 className="text-2xl font-black text-gray-800 truncate w-full text-center mb-1">{player.name}</h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
                {player.correctCount} / {player.totalBuzzes} <span className="text-gray-300">Correct</span>
              </p>

              <button
                onClick={() => setActiveBuzzPlayer(player)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-8 rounded-2xl shadow-xl transform active:scale-95 transition-all text-2xl tracking-tighter"
              >
                BUZZ
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h4 className="font-black text-gray-400 uppercase text-xs tracking-widest">Recent Activity</h4>
            <span className="text-xs text-gray-300 font-bold uppercase">Game Log</span>
          </div>
          <div className="divide-y divide-gray-50">
            {gameState.history.length === 0 ? (
              <p className="p-8 text-center text-gray-300 italic font-medium">No actions yet recorded...</p>
            ) : (
              gameState.history.slice(-5).reverse().map(event => (
                <div key={event.id} className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <span className="font-black text-gray-800 mr-2">{event.playerName}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${event.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {event.isCorrect ? 'CORRECT' : 'INCORRECT'}
                      </span>
                    </div>
                  </div>
                  {event.isCorrect && (
                    <span className={`text-xs font-black tracking-widest px-3 py-1 rounded-full border ${event.bonusCorrect ? 'bg-blue-50 text-blue-600 border-blue-100' : 'text-gray-300 border-gray-100'}`}>
                      BONUS: {event.bonusCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {activeBuzzPlayer && (
        <BuzzOutcomeModal
          playerName={activeBuzzPlayer.name}
          onClose={() => setActiveBuzzPlayer(null)}
          onSubmit={(isCorrect, bonusCorrect) => {
            onBuzzOutcome(activeBuzzPlayer.id, isCorrect, bonusCorrect);
            setActiveBuzzPlayer(null);
          }}
        />
      )}

      {subIndex !== null && (
        <SubstitutionModal
          currentIndex={subIndex}
          currentName={gameState.activePlayers[subIndex].name}
          onClose={() => setSubIndex(null)}
          onSubmit={(newName) => {
            onSubstitution(subIndex, newName);
            setSubIndex(null);
          }}
        />
      )}

      {isEndingGame && (
        <EndGameModal
          onClose={() => setIsEndingGame(false)}
          onSubmit={(our, opp) => {
            onEndGame(our, opp);
            setIsEndingGame(false);
          }}
        />
      )}
    </div>
  );
};

export default GameDashboard;
