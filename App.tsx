
import React, { useState, useEffect } from 'react';
import { Player, BuzzEvent, GameState, SavedGame } from './types';
import HomeScreen from './components/HomeScreen';
import SetupScreen from './components/SetupScreen';
import GameDashboard from './components/GameDashboard';
import GameOverScreen from './components/GameOverScreen';

type View = 'home' | 'setup' | 'game' | 'gameOver';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameHistory, setGameHistory] = useState<SavedGame[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quizbowl_game_history');
    if (saved) {
      try {
        setGameHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (game: GameState) => {
    const newSavedGame: SavedGame = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      allPlayers: Array.from(game.allPlayers),
      history: game.history,
      ourScore: game.ourScore,
      opponentScore: game.opponentScore
    };

    const updatedHistory = [...gameHistory, newSavedGame].slice(-5);
    setGameHistory(updatedHistory);
    localStorage.setItem('quizbowl_game_history', JSON.stringify(updatedHistory));
  };

  const handleStartGame = (playerNames: string[]) => {
    const players: Player[] = playerNames.map((name, index) => ({
      id: `player-${index}-${Date.now()}`,
      name: name.trim() || `Player ${index + 1}`
    }));

    setGameState({
      activePlayers: players,
      allPlayers: new Set(playerNames.map(n => n.trim())),
      history: [],
      isGameOver: false,
      ourScore: 0,
      opponentScore: 0
    });
    setView('game');
  };

  const handleBuzzOutcome = (playerId: string, isCorrect: boolean, bonusCorrect: boolean) => {
    setGameState(prev => {
      if (!prev) return null;
      const player = prev.activePlayers.find(p => p.id === playerId);
      if (!player) return prev;

      const newEvent: BuzzEvent = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        playerId,
        playerName: player.name,
        isCorrect,
        bonusCorrect: isCorrect ? bonusCorrect : false
      };

      return {
        ...prev,
        history: [...prev.history, newEvent]
      };
    });
  };

  const handleSubstitution = (index: number, newName: string) => {
    setGameState(prev => {
      if (!prev) return null;
      const updatedPlayers = [...prev.activePlayers];
      updatedPlayers[index] = {
        ...updatedPlayers[index],
        id: `player-${index}-${Date.now()}`,
        name: newName.trim()
      };
      
      const newAllPlayers = new Set(prev.allPlayers);
      newAllPlayers.add(newName.trim());

      return {
        ...prev,
        activePlayers: updatedPlayers,
        allPlayers: newAllPlayers
      };
    });
  };

  const handleEndGame = (ourFinal: number, oppFinal: number) => {
    setGameState(prev => {
      if (!prev) return null;
      const finalized: GameState = {
        ...prev,
        isGameOver: true,
        ourScore: ourFinal,
        opponentScore: oppFinal
      };
      saveToHistory(finalized);
      return finalized;
    });
    setView('gameOver');
  };

  const handleReset = () => {
    setGameState(null);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'home' && (
        <HomeScreen history={gameHistory} onNewGame={() => setView('setup')} />
      )}
      {view === 'setup' && (
        <SetupScreen onStart={handleStartGame} onBack={() => setView('home')} />
      )}
      {view === 'game' && gameState && (
        <GameDashboard
          gameState={gameState}
          onBuzzOutcome={handleBuzzOutcome}
          onSubstitution={handleSubstitution}
          onEndGame={handleEndGame}
        />
      )}
      {view === 'gameOver' && gameState && (
        <GameOverScreen gameState={gameState} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
