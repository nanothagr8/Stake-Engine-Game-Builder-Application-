import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Upload, Sparkles, Grid, Palette, Code, Eye, Settings } from 'lucide-react';

const StakeGameBuilder = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameConfig, setGameConfig] = useState({
    title: 'My Game',
    difficulty: 'medium',
    theme: 'neon',
    pixelSize: 4,
    fps: 60
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [pixelatedImage, setPixelatedImage] = useState(null);
  const canvasRef = useRef(null);
  const previewRef = useRef(null);

  const gameTemplates = [
    {
      id: 'slots',
      name: 'Slot Machine',
      description: 'Classic 3-reel slot game with animations',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'dice',
      name: 'Dice Roller',
      description: 'Animated dice rolling game',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'wheel',
      name: 'Spin Wheel',
      description: 'Fortune wheel with customizable segments',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'cards',
      name: 'Card Game',
      description: 'Poker-style card game with animations',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'mines',
      name: 'Mine Sweeper',
      description: 'Grid-based reveal game',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'plinko',
      name: 'Plinko Board',
      description: 'Physics-based ball drop game',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const themes = {
    neon: {
      primary: '#00ff88',
      secondary: '#ff00ff',
      background: '#0a0e27',
      accent: '#00d4ff'
    },
    gold: {
      primary: '#ffd700',
      secondary: '#ff8c00',
      background: '#1a1a2e',
      accent: '#ffed4e'
    },
    cyber: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      background: '#000000',
      accent: '#ff0080'
    },
    classic: {
      primary: '#ff0000',
      secondary: '#0000ff',
      background: '#ffffff',
      accent: '#00ff00'
    }
  };

  const pixelateImage = (image, pixelSize) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.imageSmoothingEnabled = false;
      
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      const scaledWidth = Math.ceil(img.width / pixelSize);
      const scaledHeight = Math.ceil(img.height / pixelSize);
      
      tempCanvas.width = scaledWidth;
      tempCanvas.height = scaledHeight;
      
      tempCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      
      ctx.drawImage(tempCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, img.width, img.height);
      
      setPixelatedImage(canvas.toDataURL());
    };
    
    img.src = image;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        pixelateImage(event.target.result, gameConfig.pixelSize);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (uploadedImage) {
      pixelateImage(uploadedImage, gameConfig.pixelSize);
    }
  }, [gameConfig.pixelSize, uploadedImage]);

  const GamePreview = () => {
    if (!selectedGame) return null;

    const theme = themes[gameConfig.theme];

    switch (selectedGame.id) {
      case 'slots':
        return <SlotMachinePreview theme={theme} />;
      case 'dice':
        return <DiceRollerPreview theme={theme} />;
      case 'wheel':
        return <SpinWheelPreview theme={theme} />;
      case 'cards':
        return <CardGamePreview theme={theme} />;
      case 'mines':
        return <MineSweeperPreview theme={theme} />;
      case 'plinko':
        return <PlinkoBoardPreview theme={theme} />;
      default:
        return null;
    }
  };

  const SlotMachinePreview = ({ theme }) => {
    const [spinning, setSpinning] = useState(false);
    const [reels, setReels] = useState(['🍒', '🍋', '🍊']);
    const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];

    const spin = () => {
      setSpinning(true);
      let iterations = 0;
      const interval = setInterval(() => {
        setReels([
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ]);
        iterations++;
        if (iterations > 20) {
          clearInterval(interval);
          setSpinning(false);
        }
      }, 100);
    };

    return (
      <div className="flex flex-col items-center justify-center h-full" style={{ backgroundColor: theme.background }}>
        <div className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
          {gameConfig.title}
        </div>
        <div className="flex gap-4 mb-8">
          {reels.map((symbol, i) => (
            <div
              key={i}
              className={`w-24 h-24 flex items-center justify-center text-5xl rounded-lg border-4 ${spinning ? 'animate-pulse' : ''}`}
              style={{ 
                borderColor: theme.accent,
                backgroundColor: theme.background,
                boxShadow: `0 0 20px ${theme.accent}`
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
        <button
          onClick={spin}
          disabled={spinning}
          className="px-8 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105"
          style={{
            backgroundColor: theme.primary,
            color: theme.background,
            boxShadow: `0 0 20px ${theme.primary}`
          }}
        >
          {spinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>
    );
  };

  const DiceRollerPreview = ({ theme }) => {
    const [rolling, setRolling] = useState(false);
    const [dice, setDice] = useState([1, 1]);

    const roll = () => {
      setRolling(true);
      let iterations = 0;
      const interval = setInterval(() => {
        setDice([
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1
        ]);
        iterations++;
        if (iterations > 15) {
          clearInterval(interval);
          setRolling(false);
        }
      }, 100);
    };

    return (
      <div className="flex flex-col items-center justify-center h-full" style={{ backgroundColor: theme.background }}>
        <div className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
          {gameConfig.title}
        </div>
        <div className="flex gap-6 mb-8">
          {dice.map((value, i) => (
            <div
              key={i}
              className={`w-32 h-32 flex items-center justify-center text-6xl font-bold rounded-2xl border-4 ${rolling ? 'animate-spin' : ''}`}
              style={{
                borderColor: theme.accent,
                backgroundColor: theme.background,
                color: theme.primary,
                boxShadow: `0 0 30px ${theme.accent}`
              }}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="text-2xl mb-8" style={{ color: theme.secondary }}>
          Total: {dice[0] + dice[1]}
        </div>
        <button
          onClick={roll}
          disabled={rolling}
          className="px-8 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105"
          style={{
            backgroundColor: theme.primary,
            color: theme.background,
            boxShadow: `0 0 20px ${theme.primary}`
          }}
        >
          {rolling ? 'ROLLING...' : 'ROLL DICE'}
        </button>
      </div>
    );
  };

  const SpinWheelPreview = ({ theme }) => {
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const spin = () => {
      setSpinning(true);
      const finalRotation = rotation + 1800 + Math.random() * 360;
      setRotation(finalRotation);
      setTimeout(() => setSpinning(false), 3000);
    };

    return (
      <div className="flex flex-col items-center justify-center h-full" style={{ backgroundColor: theme.background }}>
        <div className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
          {gameConfig.title}
        </div>
        <div className="relative mb-8">
          <div
            className="w-64 h-64 rounded-full border-8 transition-transform duration-3000 ease-out"
            style={{
              borderColor: theme.accent,
              background: `conic-gradient(
                ${theme.primary} 0deg 60deg,
                ${theme.secondary} 60deg 120deg,
                ${theme.accent} 120deg 180deg,
                ${theme.primary} 180deg 240deg,
                ${theme.secondary} 240deg 300deg,
                ${theme.accent} 300deg 360deg
              )`,
              transform: `rotate(${rotation}deg)`,
              boxShadow: `0 0 40px ${theme.primary}`
            }}
          />
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-0 h-0"
            style={{
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderTop: `40px solid ${theme.accent}`
            }}
          />
        </div>
        <button
          onClick={spin}
          disabled={spinning}
          className="px-8 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105"
          style={{
            backgroundColor: theme.primary,
            color: theme.background,
            boxShadow: `0 0 20px ${theme.primary}`
          }}
        >
          {spinning ? 'SPINNING...' : 'SPIN WHEEL'}
        </button>
      </div>
    );
  };

  const CardGamePreview = ({ theme }) => {
    const [cards, setCards] = useState(['A♠', 'K♥', 'Q♦', 'J♣', '10♠']);
    const [revealed, setRevealed] = useState([false, false, false, false, false]);

    const shuffleCards = () => {
      const suits = ['♠', '♥', '♦', '♣'];
      const values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7'];
      const newCards = Array(5).fill(0).map(() => 
        values[Math.floor(Math.random() * values.length)] + 
        suits[Math.floor(Math.random() * suits.length)]
      );
      setCards(newCards);
      setRevealed([false, false, false, false, false]);
      setTimeout(() => setRevealed([true, true, true, true, true]), 100);
    };

    return (
      <div className="flex flex-col items-center justify-center h-full" style={{ backgroundColor: theme.background }}>
        <div className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
          {gameConfig.title}
        </div>
        <div className="flex gap-4 mb-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`w-20 h-28 flex items-center justify-center text-2xl font-bold rounded-lg border-4 transition-all duration-500 ${revealed[i] ? 'rotate-0' : 'rotate-y-180'}`}
              style={{
                borderColor: theme.accent,
                backgroundColor: revealed[i] ? '#fff' : theme.primary,
                color: card.includes('♥') || card.includes('♦') ? '#ff0000' : '#000',
                boxShadow: `0 0 15px ${theme.accent}`,
                transform: revealed[i] ? 'rotateY(0deg)' : 'rotateY(180deg)'
              }}
            >
              {revealed[i] ? card : '🂠'}
            </div>
          ))}
        </div>
        <button
          onClick={shuffleCards}
          className="px-8 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105"
          style={{
            backgroundColor: theme.primary,
            color: theme.background,
            boxShadow: `0 0 20px ${theme.primary}`
          }}
        >
          DEAL CARDS
        </button>
      </div>
    );
  };

  const MineSweeperPreview = ({ theme }) => {
    const [grid, setGrid] = useState(Array(25).fill(false));
    const [mines] = useState(() => {
      const m = new Set();
      while (m.size < 5) {
        m.add(Math.floor(Math.random() * 25));
      }
      return m;
    });

    const reveal = (index) => {
      const newGrid = [...grid];
      newGrid[index] = true;
      setGrid(newGrid);
    };

    return (
      <div className="flex flex-col items-center justify-center h-full" style={{ backgroundColor: theme.background }}>
        <div className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
          {gameConfig.title}
        </div>
        <div className="grid grid-cols-5 gap-2 mb-8">
          {grid.map((revealed, i) => (
            <button
              key={i}
              onClick={() => !revealed && reveal(i)}
              className="w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg border-2 transition-all transform hover:scale-105"
              style={{
                borderColor: theme.accent,
                backgroundColor: revealed ? (mines.has(i) ? '#ff0000' : theme.primary) : theme.background,
                color: theme.background,
                boxShadow: `0 0 10px ${theme.accent}`
              }}
            >
              {revealed && (mines.has(i) ? '💣' : '💎')}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const PlinkoBoardPreview = ({ theme }) => {
    const [balls, setBalls] = useState([]);
    const [score, setScore] = useState(0);

    const dropBall = () => {
      const id = Date.now();
      setBalls(prev => [...prev, { id, position: 4 }]);
      
      setTimeout(() => {
        const finalPosition = Math.floor(Math.random() * 9);
        const multipliers = [10, 5, 2, 1, 0.5, 1, 2, 5, 10];
        setScore(prev => prev + multipliers[finalPosition]);
        setBalls(prev => prev.filter(b => b.id !== id));
      }, 2000);
    };

    return (
      <div className="flex flex-col items-center justify-center h-full" style={{ backgroundColor: theme.background }}>
        <div className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>
          {gameConfig.title}
        </div>
        <div className="text-xl mb-8" style={{ color: theme.secondary }}>
          Score: {score.toFixed(1)}x
        </div>
        <div className="relative w-80 h-96 mb-8 border-4 rounded-lg" style={{ borderColor: theme.accent }}>
          <div className="grid grid-cols-9 gap-4 p-4">
            {Array(45).fill(0).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.accent }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 w-full flex justify-around p-2">
            {[10, 5, 2, 1, 0.5, 1, 2, 5, 10].map((mult, i) => (
              <div
                key={i}
                className="w-8 h-12 flex items-center justify-center text-xs font-bold rounded"
                style={{
                  backgroundColor: mult > 5 ? theme.primary : mult > 2 ? theme.secondary : theme.accent,
                  color: theme.background
                }}
              >
                {mult}x
              </div>
            ))}
          </div>
          {balls.map(ball => (
            <div
              key={ball.id}
              className="absolute top-0 w-4 h-4 rounded-full animate-bounce"
              style={{
                backgroundColor: theme.primary,
                left: `${ball.position * 10}%`,
                boxShadow: `0 0 15px ${theme.primary}`
              }}
            />
          ))}
        </div>
        <button
          onClick={dropBall}
          className="px-8 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105"
          style={{
            backgroundColor: theme.primary,
            color: theme.background,
            boxShadow: `0 0 20px ${theme.primary}`
          }}
        >
          DROP BALL
        </button>
      </div>
    );
  };

  const exportGame = () => {
    const gameCode = {
      config: gameConfig,
      template: selectedGame,
      theme: themes[gameConfig.theme],
      pixelatedAssets: pixelatedImage ? [pixelatedImage] : [],
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(gameCode, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gameConfig.title.replace(/\s+/g, '-')}-game-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Stake Engine Game Builder
          </h1>
          <p className="text-gray-400">Professional game development tool - From concept to production</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'templates', icon: Grid, label: 'Templates' },
            { id: 'config', icon: Settings, label: 'Config' },
            { id: 'assets', icon: Palette, label: 'Assets' },
            { id: 'preview', icon: Eye, label: 'Preview' },
            { id: 'export', icon: Code, label: 'Export' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl min-h-[600px]">
          {activeTab === 'templates' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="text-cyan-400" />
                Choose Game Template
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameTemplates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedGame(template)}
                    className={`p-6 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                      selectedGame?.id === template.id
                        ? 'ring-4 ring-cyan-400 shadow-xl shadow-cyan-500/50'
                        : 'hover:shadow-xl'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${template.color.split(' ')[0].replace('from-', '')} 0%, ${template.color.split(' ')[1].replace('to-', '')} 100%)`
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                    <p className="text-sm opacity-90">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Game Configuration</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Game Title</label>
                  <input
                    type="text"
                    value={gameConfig.title}
                    onChange={(e) => setGameConfig({ ...gameConfig, title: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Theme</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(themes).map(themeName => (
                      <button
                        key={themeName}
                        onClick={() => setGameConfig({ ...gameConfig, theme: themeName })}
                        className={`p-4 rounded-lg font-semibold capitalize transition-all ${
                          gameConfig.theme === themeName
                            ? 'ring-4 ring-cyan-400'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: themes[themeName].primary, color: themes[themeName].background }}
                      >
                        {themeName}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Pixelation Size: {gameConfig.pixelSize}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    value={gameConfig.pixelSize}
                    onChange={(e) => setGameConfig({ ...gameConfig, pixelSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Frame Rate: {gameConfig.fps} FPS
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    step="15"
                    value={gameConfig.fps}
                    onChange={(e) => setGameConfig({ ...gameConfig, fps: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Difficulty</label>
                  <select
                    value={gameConfig.difficulty}
                    onChange={(e) => setGameConfig({ ...gameConfig, difficulty: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Asset Management & Pixelation</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <Upload size={20} />
                      Choose Image
                    </label>
                  </div>
                </div>

                {uploadedImage && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Original</h3>
                      <img src={uploadedImage} alt="Original" className="w-full rounded-lg border-2 border-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Pixelated ({gameConfig.pixelSize}px)</h3>
                      {pixelatedImage && (
                        <img src={pixelatedImage} alt="Pixelated" className="w-full rounded-lg border-2 border-cyan-400" />
                      )}
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Live Game Preview</h2>
              {selectedGame ? (
                <div className="bg-gray-900 rounded-lg h-[500px]" ref={previewRef}>
                  <GamePreview />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[500px] bg-gray-900 rounded-lg">
                  <p className="text-gray-500 text-xl">Select a game template to preview</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'export' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Export Game</h2>
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Game Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Template:</span> {selectedGame?.name || 'None selected'}</p>
                    <p><span className="text-gray-400">Title:</span> {gameConfig.title}</p>
                    <p><span className="text-gray-400">Theme:</span> {gameConfig.theme}</p>
                    <p><span className="text-gray-400">Difficulty:</span> {gameConfig.difficulty}</p>
                    <p><span className="text-gray-400">FPS:</span> {gameConfig.fps}</p>
                    <p><span className="text-gray-400">Pixel Size:</span> {gameConfig.pixelSize}px</p>
                  </div>
                </div>

                <button
                  onClick={exportGame}
                  disabled={!selectedGame}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-xl flex items-center justify-center gap-3 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={24} />
                  Export Game Configuration
                </button>

                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Production Checklist</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> Game template configured
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> Theme and styling applied
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> Animation system integrated
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> Pixel art processor ready
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> Preview tested
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> Export configuration available
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StakeGameBuilder;