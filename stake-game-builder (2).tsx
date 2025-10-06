import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Upload, Sparkles, Grid, Palette, Code, Eye, Settings, Calculator, Layers, Zap, Gift, Film, Star, Trophy, Package, Lock, User, Send, FileText, LogOut, Menu, ChevronDown, Search, Info, Bell, TrendingUp, BarChart3, Sliders, Volume2, Globe, TestTube, Lightbulb, Repeat, Copy, Save, RefreshCw } from 'lucide-react';

const StakeGameBuilder = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [showTooltip, setShowTooltip] = useState(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);
  
  const [gameConfig, setGameConfig] = useState({
    title: 'My Awesome Slot',
    gameId: 'my-awesome-slot-001',
    version: '1.0.0',
    difficulty: 'medium',
    theme: 'stake',
    category: 'slots',
    tags: ['adventure', 'high-volatility', 'bonus-features'],
    targetAudience: 'adults',
    certification: 'pending',
    fps: 60,
    pixelSize: 4,
    autoPlay: true,
    quickSpin: true,
    soundEnabled: true,
    musicEnabled: true,
    ambientEffects: true,
    vibrationFeedback: false,
    languageSupport: ['en', 'es', 'pt', 'ru', 'zh', 'ja'],
    currencies: ['USD', 'BTC', 'ETH', 'USDT', 'LTC'],
    mobileOptimized: true,
    landscapeMode: true,
    portraitMode: true
  });
  
  const [mathConfig, setMathConfig] = useState({
    winType: 'lines',
    reelType: 'standard',
    reelCount: 5,
    rowCount: 3,
    paylines: 20,
    ways: 243,
    minBet: 0.20,
    maxBet: 100,
    betLevels: [0.20, 0.40, 0.60, 1, 2, 5, 10, 20, 50, 100],
    rtp: 96.50,
    volatility: 'medium',
    hitFrequency: 25.5,
    maxWin: 5000,
    baseGameRTP: 94.0,
    featureRTP: 2.5,
    variance: 8.5,
    features: {
      tumbles: false,
      clusters: false,
      multipliers: true,
      wilds: true,
      scatters: true,
      freeSpins: true,
      bonusGame: true,
      expandingWilds: false,
      stickyWilds: true,
      walkingWilds: false,
      randomWilds: false,
      respins: false,
      megaSymbols: false,
      symbolUpgrade: true,
      mysterySymbols: false
    },
    symbols: {
      high: { count: 4, baseWin: [100, 50, 25, 10] },
      medium: { count: 4, baseWin: [8, 6, 4, 2] },
      low: { count: 4, baseWin: [1.5, 1, 0.5, 0.25] },
      wild: { multiplier: 2, substitutes: 'all' },
      scatter: { minCount: 3, triggersBonus: true }
    },
    paytableType: 'exponential',
    wildMultiplier: 2,
    scatterPayout: true
  });

  const [symbolConfig, setSymbolConfig] = useState({
    highSymbols: [
      { id: 'H1', name: 'Diamond', icon: '💎', value: [100, 50, 25, 10], weight: 5, animated: true },
      { id: 'H2', name: 'Gold Bar', icon: '🥇', value: [80, 40, 20, 8], weight: 6, animated: true },
      { id: 'H3', name: 'Crown', icon: '👑', value: [60, 30, 15, 6], weight: 7, animated: true },
      { id: 'H4', name: 'Gem', icon: '💠', value: [40, 20, 10, 4], weight: 8, animated: true }
    ],
    mediumSymbols: [
      { id: 'M1', name: 'Cherry', icon: '🍒', value: [20, 10, 5, 2], weight: 15, animated: false },
      { id: 'M2', name: 'Lemon', icon: '🍋', value: [15, 8, 4, 1.5], weight: 16, animated: false },
      { id: 'M3', name: 'Orange', icon: '🍊', value: [12, 6, 3, 1], weight: 18, animated: false },
      { id: 'M4', name: 'Grape', icon: '🍇', value: [10, 5, 2.5, 0.8], weight: 20, animated: false }
    ],
    lowSymbols: [
      { id: 'L1', name: 'Ace', icon: '🅰️', value: [8, 4, 2, 0.5], weight: 25, animated: false },
      { id: 'L2', name: 'King', icon: '🇰', value: [6, 3, 1.5, 0.4], weight: 28, animated: false },
      { id: 'L3', name: 'Queen', icon: '🇶', value: [5, 2.5, 1, 0.3], weight: 30, animated: false },
      { id: 'L4', name: 'Jack', icon: '🇯', value: [4, 2, 0.8, 0.2], weight: 32, animated: false }
    ],
    specialSymbols: [
      { id: 'WILD', name: 'Wild', icon: '🃏', substitutes: true, multiplier: 2, weight: 3 },
      { id: 'SCATTER', name: 'Scatter', icon: '⭐', triggersBonus: true, minCount: 3, weight: 2 }
    ]
  });

  const [soundConfig, setSoundConfig] = useState({
    masterVolume: 80,
    musicVolume: 60,
    sfxVolume: 75,
    ambienceVolume: 40,
    backgroundMusic: 'epic-adventure',
    spinSound: 'mechanical-reel',
    winSound: 'coins-cascade',
    bonusSound: 'fanfare',
    bigWinSound: 'celebration',
    megaWinSound: 'epic-win',
    clickSound: 'button-click',
    hoverSound: 'soft-beep',
    enableVoiceOvers: false,
    voiceLanguage: 'en-US'
  });

  const [analyticsConfig, setAnalyticsConfig] = useState({
    trackPlayerBehavior: true,
    trackBetPatterns: true,
    trackFeatureTriggers: true,
    trackSessionLength: true,
    heatmapEnabled: true,
    rtpMonitoring: true,
    performanceMetrics: true,
    errorTracking: true
  });

  const [complianceConfig, setComplianceConfig] = useState({
    jurisdictions: ['curacao', 'malta', 'uk', 'gibraltar'],
    ageRestriction: 18,
    responsibleGaming: true,
    sessionLimits: true,
    selfExclusion: true,
    realityCheck: true,
    lossLimits: true,
    depositLimits: true,
    gamstopIntegration: false,
    gdprCompliant: true,
    coolingOffPeriod: true
  });

  const [presets, setPresets] = useState([
    { name: 'High Volatility Slot', rtp: 96.8, volatility: 'very-high', features: ['freeSpins', 'multipliers', 'bonusGame'] },
    { name: 'Classic Fruit Machine', rtp: 95.5, volatility: 'low', features: ['wilds'] },
    { name: 'Megaways Extreme', rtp: 96.5, volatility: 'high', features: ['cascading', 'multipliers', 'freeSpins'] },
    { name: 'Cluster Pays Fun', rtp: 96.2, volatility: 'medium', features: ['clusters', 'tumbles'] }
  ]);

  const tabs = [
    { id: 'dashboard', icon: Grid, label: 'Dashboard', subTabs: ['overview', 'quick-start', 'presets'] },
    { id: 'templates', icon: Sparkles, label: 'Templates', subTabs: ['all', 'slots', 'table', 'casual'] },
    { id: 'config', icon: Settings, label: 'Configuration', subTabs: ['general', 'display', 'features'] },
    { id: 'math', icon: Calculator, label: 'Math Engine', subTabs: ['rtp', 'paytable', 'simulator'] },
    { id: 'symbols', icon: Star, label: 'Symbols', subTabs: ['design', 'paytable', 'weights'] },
    { id: 'reels', icon: Layers, label: 'Reels', subTabs: ['config', 'behavior', 'modifiers'] },
    { id: 'animations', icon: Film, label: 'Animations', subTabs: ['spin', 'win', 'transitions'] },
    { id: 'graphics', icon: Palette, label: 'Graphics', subTabs: ['style', 'effects', 'optimization'] },
    { id: 'sound', icon: Volume2, label: 'Audio', subTabs: ['music', 'sfx', 'settings'] },
    { id: 'bonus', icon: Gift, label: 'Bonus', subTabs: ['type', 'config', 'frequency'] },
    { id: 'testing', icon: TestTube, label: 'Testing', subTabs: ['simulation', 'verification', 'qa'] },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', subTabs: ['tracking', 'metrics', 'reports'] },
    { id: 'compliance', icon: Lock, label: 'Compliance', subTabs: ['jurisdictions', 'responsible-gaming', 'privacy'] },
    { id: 'output', icon: FileText, label: 'Output', subTabs: ['files', 'dependencies', 'documentation'] }
  ];

  const runSimulation = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      const spins = 1000000;
      const actualRTP = 96.48 + (Math.random() - 0.5) * 0.1;
      const hitRate = 25.2 + (Math.random() - 0.5) * 2;
      
      setSimulationResults({
        totalSpins: spins,
        targetRTP: mathConfig.rtp,
        actualRTP: actualRTP.toFixed(2),
        variance: (Math.abs(mathConfig.rtp - actualRTP)).toFixed(2),
        hitFrequency: hitRate.toFixed(2),
        maxWinHit: 247,
        bonusTriggered: Math.floor(spins / 150),
        avgWin: (mathConfig.rtp / hitRate).toFixed(2),
        bigWins: Math.floor(spins * 0.0015),
        megaWins: Math.floor(spins * 0.0001)
      });
      setSimulationRunning(false);
    }, 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setUser({ 
      email: formData.get('email'), 
      name: formData.get('email').split('@')[0], 
      id: Date.now(), 
      joined: new Date().toISOString(),
      gamesCreated: 0,
      subscription: 'pro'
    });
    setIsAuthenticated(true);
  };

  const Tooltip = ({ text, children }) => (
    <div className="relative inline-block group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0f212e] border border-lime-400 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-lime-400"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f212e] text-white">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#1a2c38] to-[#1e3a4a] border-b border-[#2f4553] shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600 rounded-xl flex items-center justify-center font-black text-[#0f212e] text-2xl shadow-lg shadow-lime-500/30">
                  S
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">STAKE ENGINE</h1>
                  <p className="text-xs text-lime-400 font-bold tracking-wider">PRO GAME BUILDER</p>
                </div>
              </div>
              
              {isAuthenticated && (
                <div className="hidden lg:flex items-center gap-2 ml-8">
                  <div className="px-4 py-2 bg-[#0f212e] rounded-lg border border-lime-400/30">
                    <span className="text-xs text-gray-400">Projects:</span>
                    <span className="ml-2 font-bold text-lime-400">{user.gamesCreated}</span>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg border border-amber-400/50">
                    <span className="text-xs text-amber-400 font-bold uppercase">{user.subscription}</span>
                  </div>
                </div>
              )}
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button className="p-2 bg-[#0f212e] rounded-lg border border-[#2f4553] hover:border-lime-400 transition-all">
                  <Bell size={20} className="text-gray-400" />
                </button>
                <div className="hidden md:flex items-center gap-3 bg-[#0f212e] px-4 py-2 rounded-lg border border-[#2f4553]">
                  <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center font-bold text-[#0f212e]">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button onClick={() => { setIsAuthenticated(false); setUser(null); }} className="p-2 bg-[#0f212e] hover:bg-red-500/20 rounded-lg border border-[#2f4553] hover:border-red-500 transition-all">
                  <LogOut size={20} className="text-gray-400 hover:text-red-400" />
                </button>
              </div>
            ) : (
              <button onClick={() => setActiveTab('dashboard')} className="bg-gradient-to-r from-lime-400 to-green-500 hover:from-lime-500 hover:to-green-600 px-8 py-3 rounded-xl font-black text-[#0f212e] transition-all shadow-lg shadow-lime-500/30 hover:shadow-lime-500/50">
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="bg-[#1a2c38] border-b border-[#2f4553] sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setActiveSubTab(tab.subTabs[0]); }}
                className={`px-4 py-3 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap text-sm ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-lime-400 to-green-500 text-[#0f212e] shadow-lg shadow-lime-500/30'
                    : 'text-gray-400 hover:text-lime-400 hover:bg-[#0f212e]/50'
                }`}
              >
                <tab.icon size={18} />
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Navigation */}
      {tabs.find(t => t.id === activeTab)?.subTabs && (
        <div className="bg-[#0f212e] border-b border-[#2f4553]">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-2 overflow-x-auto">
              {tabs.find(t => t.id === activeTab).subTabs.map(subTab => (
                <button
                  key={subTab}
                  onClick={() => setActiveSubTab(subTab)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize text-sm transition-all ${
                    activeSubTab === subTab
                      ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a2c38]'
                  }`}
                >
                  {subTab.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto p-4 md:p-6">
        <div className="bg-gradient-to-br from-[#1a2c38] to-[#1e3440] rounded-2xl border border-[#2f4553] shadow-2xl">
          <div className="p-6 max-h-[calc(100vh-280px)] overflow-y-auto">
            
            {/* Dashboard */}
            {activeTab === 'dashboard' && activeSubTab === 'overview' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
                    Welcome to Stake Engine Pro
                  </h2>
                  <p className="text-gray-400">Professional casino game development platform</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Games', value: isAuthenticated ? user.gamesCreated : '0', icon: Grid, color: 'lime' },
                    { label: 'Avg RTP', value: '96.5%', icon: TrendingUp, color: 'green' },
                    { label: 'Templates', value: '50+', icon: Sparkles, color: 'purple' },
                    { label: 'Dependencies', value: '30+', icon: Package, color: 'blue' }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#0f212e] border border-[#2f4553] rounded-xl p-6 hover:border-lime-400/50 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <stat.icon size={24} className={`text-${stat.color}-400`} />
                        <span className={`text-3xl font-black text-${stat.color}-400`}>{stat.value}</span>
                      </div>
                      <p className="text-sm text-gray-400 font-semibold">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#0f212e] border border-[#2f4553] rounded-xl p-6">
                    <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                      <Lightbulb size={20} className="text-lime-400" />
                      Quick Start Guide
                    </h3>
                    <div className="space-y-3">
                      {[
                        { step: 1, label: 'Choose a template', action: 'Browse Templates', tab: 'templates' },
                        { step: 2, label: 'Configure game math', action: 'Setup Math', tab: 'math' },
                        { step: 3, label: 'Design symbols & reels', action: 'Design Symbols', tab: 'symbols' },
                        { step: 4, label: 'Test & simulate', action: 'Run Tests', tab: 'testing' },
                        { step: 5, label: 'Export & submit', action: 'Export Game', tab: 'output' }
                      ].map((item) => (
                        <div key={item.step} className="flex items-center justify-between p-3 bg-[#1a2c38] rounded-lg border border-[#2f4553]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-lime-400/10 border border-lime-400/30 rounded-full flex items-center justify-center">
                              <span className="text-lime-400 font-bold text-sm">{item.step}</span>
                            </div>
                            <span className="text-gray-300 font-semibold">{item.label}</span>
                          </div>
                          <button 
                            onClick={() => setActiveTab(item.tab)}
                            className="px-3 py-1 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 rounded-lg text-sm font-bold transition-all"
                          >
                            {item.action}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0f212e] border border-[#2f4553] rounded-xl p-6">
                    <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                      <BarChart3 size={20} className="text-lime-400" />
                      Current Project Stats
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Game Title', value: gameConfig.title },
                        { label: 'RTP Configuration', value: `${mathConfig.rtp}%` },
                        { label: 'Volatility', value: mathConfig.volatility, capitalize: true },
                        { label: 'Features Enabled', value: Object.values(mathConfig.features).filter(Boolean).length },
                        { label: 'Symbols Configured', value: symbolConfig.highSymbols.length + symbolConfig.mediumSymbols.length + symbolConfig.lowSymbols.length },
                        { label: 'Completion', value: '45%' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">{item.label}</span>
                          <span className={`font-bold text-white ${item.capitalize && 'capitalize'}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            {activeTab === 'dashboard' && activeSubTab === 'presets' && (
              <div>
                <h2 className="text-3xl font-black mb-6 text-lime-400">Quick Start Presets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {presets.map((preset, idx) => (
                    <div key={idx} className="bg-[#0f212e] border border-[#2f4553] rounded-xl p-6 hover:border-lime-400/50 transition-all cursor-pointer">
                      <h3 className="text-xl font-bold mb-3 text-white">{preset.name}</h3>
                      <div className="flex gap-2 mb-4">
                        <span className="px-3 py-1 bg-lime-400/20 text-lime-400 rounded-lg text-sm font-bold">RTP: {preset.rtp}%</span>
                        <span className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-lg text-sm font-bold capitalize">{preset.volatility}</span>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs text-gray-400 mb-2">Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {preset.features.map((f, i) => (
                            <span key={i} className="px-2 py-1 bg-[#1a2c38] border border-[#2f4553] rounded text-xs text-gray-300 capitalize">
                              {f.replace(/([A-Z])/g, ' $1')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg font-bold text-[#0f212e] hover:from-lime-500 hover:to-green-600 transition-all">
                        Use This Preset
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Math Engine - Simulator */}
            {activeTab === 'math' && activeSubTab === 'simulator' && (
              <div>
                <h2 className="text-3xl font-black mb-6 text-lime-400">RTP Simulator & Verification</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-[#0f212e] border border-[#2f4553] rounded-xl p-6">
                    <h3 className="font-bold mb-4 text-white">Simulation Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Spin Count</label>
                        <select className="w-full bg-[#1a2c38] border border-[#2f4553] rounded-lg px-3 py-2 text-white text-sm">
                          <option>100,000 spins</option>
                          <option>500,000 spins</option>
                          <option selected>1,000,000 spins</option>
                          <option>5,000,000 spins</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Bet Level</label>
                        <select className="w-full bg-[#1a2c38] border border-[#2f4553] rounded-lg px-3 py-2 text-white text-sm">
                          <option>Min Bet ($0.20)</option>
                          <option selected>Default ($1.00)</option>
                          <option>Max Bet ($100)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-[#0f212e] border border-[#2f4553] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-white">Simulation Results</h3>
                      {simulationResults && (
                        <button className="px-3 py-1 bg-lime-400/10 text-lime-400 rounded-lg text-sm font-bold">
                          Export Results
                        </button>
                      )}
                    </div>
                    
                    {!simulationResults ? (
                      <div className="text-center py-12">
                        <TestTube size={48} className="mx-auto mb-4 text-gray-600" />
                        <p className="text-gray-400 mb-6">No simulation run yet</p>
                        <button 
                          onClick={runSimulation}
                          disabled={simulationRunning}
                          className="px-8 py-3 bg-gradient-to-r from-lime-400 to-green-500 rounded-xl font-bold text-[#0f212e] hover:from-lime-500 hover:to-green-600 transition-all disabled:opacity-50"
                        >
                          {simulationRunning ? (
                            <span className="flex items-center gap-2">
                              <RefreshCw size={18} className="animate-spin" />
                              Running Simulation...
                            </span>
                          ) : (
                            'Start Simulation'
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Total Spins', value: simulationResults.totalSpins.toLocaleString() },
                          { label: 'Target RTP', value: `${simulationResults.targetRTP}%` },
                          { label: 'Actual RTP', value: `${simulationResults.actualRTP}%`, highlight: true },
                          { label: 'Variance', value: `${simulationResults.variance}%` },
                          { label: 'Hit Frequency', value: `${simulationResults.hitFrequency}%` },
                          { label: 'Avg Win', value: `${simulationResults.avgWin}x` },
                          { label: 'Bonus Triggered', value: simulationResults.bonusTriggered.toLocaleString() },
                          { label: 'Big Wins', value: simulationResults.bigWins.toLocaleString() }
                        ].map((stat, idx) => (
                          <div key={idx} className={`p-3 rounded-lg ${stat.highlight ? 'bg-lime-400/10 border border-lime-400/30' : 'bg-[#1a2c38]'}`}>
                            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                            <p className={`text-lg font-bold ${stat.highlight ? 'text-lime-400' : 'text-white'}`}>{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-lime-400/10 border border-lime-400/30 rounded-xl p-6">
                  <h3 className="font-bold mb-3 text-lime-400 flex items-center gap-2">
                    <Info size={18} />
                    Certification Guidelines
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-2">✓ Minimum 1M spins required</p>
                      <p className="text-gray-400">✓ RTP variance must be &lt; 0.5%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-2">✓ Provably fair implementation</p>
                      <p className="text-gray-400">✓ Independent lab testing</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-2">✓ Full math model documentation</p>
                      <p className="text-gray-400">✓ Feature frequency verification</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Symbols - Paytable */}
            {activeTab === 'symbols' && activeSubTab === 'paytable' && (
              <div>
                <h2 className="text-3xl font-black mb-6 text-lime-400">Symbol Paytable Configuration</h2>
                
                <div className="space-y-6">
                  {Object.entries({ high: symbolConfig.highSymbols, medium: symbolConfig.mediumSymbols, low: symbolConfig.lowSymbols }).map(([tier, symbols]) => (
                    <div key={tier}>
                      <h3 className="text-xl font-bold mb-4 capitalize text-white">{tier} Value Symbols</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {symbols.map((symbol, idx) => (
                          <div key={idx} className="bg-[#0f212e] border border-[#2f4553] rounded-xl p-4 hover:border-lime-400/50 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="text-4xl">{symbol.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-bold text-white">{symbol.name}</h4>
                                  <span className="text-xs bg-[#1a2c38] px-2 py-1 rounded text-gray-400">Weight: {symbol.weight}</span>
                                  {symbol.animated && <span className="text-xs bg-lime-400/20 text-lime-400 px-2 py-1 rounded font-bold">Animated</span>}
                                </div>
                                <div className="flex gap-2">
                                  {symbol.value.map((val, i) => (
                                    <div key={i} className="px-3 py-1 bg-[#1a2c38] rounded border border-[#2f4553]">
                                      <span className="text-xs text-gray-400">{i + 3}x: </span>
                                      <span className="text-sm font-bold text-lime-400">{val}x</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <button className="p-2 hover:bg-[#1a2c38] rounded-lg transition-all">
                                <Sliders size={18} className="text-gray-400" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-white">Special Symbols</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {symbolConfig.specialSymbols.map((symbol, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-4">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl">{symbol.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white mb-2">{symbol.name}</h4>
                              <div className="flex gap-2 text-xs">
                                {symbol.substitutes && <span className="bg-purple-400/20 text-purple-400 px-2 py-1 rounded">Substitutes All</span>}
                                {symbol.multiplier && <span className="bg-lime-400/20 text-lime-400 px-2 py-1 rounded">x{symbol.multiplier} Multiplier</span>}
                                {symbol.triggersBonus && <span className="bg-amber-400/20 text-amber-400 px-2 py-1 rounded">Triggers Bonus</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sound Configuration */}
            {activeTab === 'sound' && activeSubTab === 'settings' && (
              <div>
                <h2 className="text-3xl font-black mb-6 text-lime-400">Audio Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">Volume Control</h3>
                    {Object.entries({ masterVolume: 'Master Volume', musicVolume: 'Music', sfxVolume: 'Sound Effects', ambienceVolume: 'Ambience' }).map(([key, label]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-bold text-gray-300">{label}</label>
                          <span className="text-lime-400 font-bold">{soundConfig[key]}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={soundConfig[key]}
                          onChange={(e) => setSoundConfig({ ...soundConfig, [key]: parseInt(e.target.value) })}
                          className="w-full h-2 bg-[#0f212e] rounded-lg appearance-none cursor-pointer accent-lime-400"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">Sound Library</h3>
                    {Object.entries({
                      backgroundMusic: ['Epic Adventure', 'Mystical Journey', 'Vegas Nights', 'Cosmic Dreams'],
                      spinSound: ['Mechanical Reel', 'Digital Beep', 'Classic Spin', 'Modern Whoosh'],
                      winSound: ['Coins Cascade', 'Bell Chime', 'Fanfare', 'Jackpot']
                    }).map(([key, options]) => (
                      <div key={key}>
                        <label className="block text-sm font-bold mb-2 text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <select 
                          value={soundConfig[key]}
                          onChange={(e) => setSoundConfig({ ...soundConfig, [key]: e.target.value })}
                          className="w-full bg-[#0f212e] border border-[#2f4553] rounded-lg px-4 py-3 text-white focus:border-lime-400 outline-none"
                        >
                          {options.map(opt => (
                            <option key={opt.toLowerCase().replace(/\s/g, '-')} value={opt.toLowerCase().replace(/\s/g, '-')}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Compliance */}
            {activeTab === 'compliance' && activeSubTab === 'responsible-gaming' && (
              <div>
                <h2 className="text-3xl font-black mb-6 text-lime-400">Responsible Gaming Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries({
                    responsibleGaming: 'Enable Responsible Gaming Tools',
                    sessionLimits: 'Session Time Limits',
                    selfExclusion: 'Self-Exclusion Options',
                    realityCheck: 'Reality Check Reminders',
                    lossLimits: 'Loss Limit Controls',
                    depositLimits: 'Deposit Limit Settings',
                    coolingOffPeriod: 'Cooling-Off Period',
                    gamstopIntegration: 'GAMSTOP Integration (UK)'
                  }).map(([key, label]) => (
                    <div key={key} className="bg-[#0f212e] border border-[#2f4553] rounded-xl p-4 hover:border-lime-400/50 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-1">{label}</h4>
                          <p className="text-xs text-gray-400">Required for most jurisdictions</p>
                        </div>
                        <button
                          onClick={() => setComplianceConfig({ ...complianceConfig, [key]: !complianceConfig[key] })}
                          className={`px-6 py-2 rounded-lg font-bold transition-all ${
                            complianceConfig[key]
                              ? 'bg-gradient-to-r from-lime-400 to-green-500 text-[#0f212e]'
                              : 'bg-[#1a2c38] text-gray-400 border border-[#2f4553]'
                          }`}
                        >
                          {complianceConfig[key] ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-amber-500/10 border border-amber-400/30 rounded-xl p-6">
                  <h3 className="font-bold mb-3 text-amber-400 flex items-center gap-2">
                    <Info size={18} />
                    Compliance Requirements
                  </h3>
                  <p className="text-sm text-gray-300">
                    All responsible gaming features are mandatory for licensing in most jurisdictions. Ensure all features are properly implemented and tested before submission.
                  </p>
                </div>
              </div>
            )}

            {/* Fallback for other tabs */}
            {!['dashboard', 'math', 'symbols', 'sound', 'compliance'].includes(activeTab) && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-lime-400 mb-2">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-gray-400">Advanced configuration panel - {activeSubTab}</p>
              </div>
            )}

          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="mt-6 bg-gradient-to-r from-[#1a2c38] to-[#1e3a4a] rounded-xl border border-[#2f4553] p-4 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#0f212e] hover:bg-[#1a2c38] rounded-lg border border-[#2f4553] hover:border-lime-400 transition-all flex items-center gap-2 text-sm font-bold">
                <Save size={16} />
                Save Progress
              </button>
              <button className="px-4 py-2 bg-[#0f212e] hover:bg-[#1a2c38] rounded-lg border border-[#2f4553] hover:border-lime-400 transition-all flex items-center gap-2 text-sm font-bold">
                <Copy size={16} />
                Clone Project
              </button>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-lime-400 to-green-500 hover:from-lime-500 hover:to-green-600 rounded-lg font-bold text-[#0f212e] transition-all shadow-lg shadow-lime-500/20 flex items-center gap-2">
              <Download size={18} />
              Export Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeGameBuilder;