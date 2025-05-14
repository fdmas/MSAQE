import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { loadScenicData } from '../data';
import './InteractiveDemo.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const InteractiveDemo = () => {
  const [allScenicData, setAllScenicData] = useState({ scenicAreas: [], scenicAreasByCategory: {} });
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' or a specific category key
  const [selectedArea, setSelectedArea] = useState(null);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await loadScenicData();
        setAllScenicData(data);
        // Initial population of filteredAreas and selectedArea
        if (data.scenicAreas && data.scenicAreas.length > 0) {
          setFilteredAreas(data.scenicAreas); // Initially show all
          setSelectedArea(data.scenicAreas[0]);
        } else {
          setFilteredAreas([]);
          setSelectedArea(null);
          if (!data.scenicAreas || data.scenicAreas.length === 0) {
             console.warn("No scenic areas loaded after fetch.");
          }
        }
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching scenic data in component:", e);
        setError("加载景区数据失败，请检查CSV文件和网络连接。");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Fetch data once on mount

  // Effect to update filteredAreas and selectedArea when category or allScenicData changes
  useEffect(() => {
    if (allScenicData.scenicAreas.length === 0 && !isLoading) return;

    let areasToShow = [];
    if (selectedCategory === 'all') {
      areasToShow = allScenicData.scenicAreas;
    } else {
      areasToShow = allScenicData.scenicAreasByCategory[selectedCategory] || [];
    }
    setFilteredAreas(areasToShow);

    // If current selectedArea is not in the new list or no area is selected, pick the first one
    if (areasToShow.length > 0) {
      if (!selectedArea || !areasToShow.find(a => a.id === selectedArea.id)) {
        setSelectedArea(areasToShow[0]);
      }
    } else {
      setSelectedArea(null); // No areas in this category
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, allScenicData.scenicAreas, allScenicData.scenicAreasByCategory, isLoading]); // isLoading is added to re-evaluate when loading finishes
  

  const chartScores = selectedArea && selectedArea.scores 
    ? Object.values(selectedArea.scores).map(s => s === "数据暂无" ? 0 : s) 
    : Array(8).fill(0); 
  
  const scoreKeys = selectedArea && selectedArea.scores 
    ? Object.keys(selectedArea.scores) 
    : ['BM', 'Exc', 'Hyg', 'PT', 'REP', 'TSA', 'TSH', 'TT'];

  const dimensionLabels = {
    'BM': '基础设施', 'Exc': '游览', 'Hyg': '卫生', 'PT': '邮政电信',
    'REP': '声誉', 'TSA': '旅游安全', 'TSH': '旅游购物', 'TT': '交通运输'
  };

  const chartData = {
    labels: scoreKeys.map(key => dimensionLabels[key] || key),
    datasets: [{
      label: '质量评分', data: chartScores, backgroundColor: 'rgba(66, 133, 244, 0.2)',
      borderColor: '#4285F4', borderWidth: 2, pointBackgroundColor: '#4285F4',
      pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#4285F4', pointRadius: 4, pointHoverRadius: 6
    }]
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: '各维度质量评分', font: { size: 16, family: 'Arial, sans-serif' } },
      tooltip: {
        callbacks: {
          label: function(context) {
            const datasetLabel = context.dataset.label || '';
            const rawValue = context.raw;
            const dimensionName = context.label || ''; 
            const originalScoreKey = scoreKeys[context.dataIndex];
            const originalScore = selectedArea && selectedArea.scores && selectedArea.scores[originalScoreKey];
            return `${datasetLabel}: ${originalScore === "数据暂无" ? "数据暂无" : rawValue} (${dimensionName})`;
          }
        }
      }
    },
    scales: { r: { angleLines: { display: true, color: 'rgba(0, 0, 0, 0.1)' }, suggestedMin: 0, suggestedMax: 5, ticks: { stepSize: 1, backdropColor: 'transparent' }, pointLabels: { font: { size: 12, family: 'Arial, sans-serif' } } } }
  };

  const handleAreaChange = (e) => {
    const areaId = parseInt(e.target.value);
    // Find in allScenicAreas as filteredAreas might not be up-to-date if category changes simultaneously
    const area = allScenicData.scenicAreas.find(a => a.id === areaId);
    if (area) setSelectedArea(area);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // The useEffect hook will handle updating filteredAreas and selectedArea
  };

  if (isLoading) {
    return <div className="loading-container"><div className="spinner"></div><p>正在加载景区数据...</p></div>;
  }

  if (error) { // Show error prominently if fetching failed
    return <div className="error-container"><p>{error}</p></div>;
  }

  if (allScenicData.scenicAreas.length === 0) {
    return <div className="error-container"><p>没有景区数据可显示。请确保CSV文件已正确放置在public目录并包含有效数据。</p></div>;
  }
  
  const currentSelectedArea = selectedArea; // Use state directly

  return (
    <section id="demo" className="interactive-demo">
      <h2><i className="fas fa-chart-bar"></i> <span>景区质量评估演示</span></h2>
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="scenic-category"><i className="fas fa-layer-group"></i> 景区分类:</label>
          <select id="scenic-category" value={selectedCategory} onChange={handleCategoryChange} className="select-styled" disabled={isLoading || Object.keys(allScenicData.scenicAreasByCategory).length === 0}>
            <option value="all">所有景区 ({allScenicData.scenicAreas.length})</option>
            {Object.keys(allScenicData.scenicAreasByCategory).map(category => (
              <option key={category} value={category}>
                {category} ({allScenicData.scenicAreasByCategory[category] ? allScenicData.scenicAreasByCategory[category].length : 0})
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="scenic-area"><i className="fas fa-map-marker-alt"></i> 选择景区:</label>
          <select id="scenic-area" value={currentSelectedArea ? currentSelectedArea.id : ''} onChange={handleAreaChange} className="select-styled" disabled={isLoading || filteredAreas.length === 0}>
            {filteredAreas.map(area => (
              <option key={area.id} value={area.id}>{area.name} (总评分: {area.rank})</option>
            ))}
          </select>
        </div>
      </div>

      {currentSelectedArea && (
        <div className="scenic-area-details">
          <div className="scenic-area-header">
            <img src={currentSelectedArea.image} alt={currentSelectedArea.name} className="scenic-area-image" />
            <div className="scenic-area-info">
              <h3>{currentSelectedArea.name}</h3>
              <div className="scenic-area-level">
                <span className="category-badge">{currentSelectedArea.category}</span> 
                <span className="rank-badge">总体评分: {currentSelectedArea.rank}</span>
              </div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '400px' }}> 
            {currentSelectedArea.scores ? <Radar data={chartData} options={chartOptions} /> : <p>该景区评分数据暂无。</p>}
          </div>
          <div className="dimension-ranks">
            <h4>各维度排名 (仅显示前10名)</h4>
            {currentSelectedArea.dimensionRanks ? (
              <div className="ranks-grid">
                {scoreKeys.map(key => {
                  const rank = currentSelectedArea.dimensionRanks[key];
                  const rankDisplay = (typeof rank === 'number' && rank <= 10) ? `第 ${rank} 名` : '—';
                  return (
                    <div className="rank-item" key={key}>
                      <span className="dimension-label">{dimensionLabels[key] || key}</span>
                      <span className="rank-value">{rankDisplay}</span>
                    </div>
                  );
                })}
              </div>
            ) : <p>该景区各维度排名数据暂无。</p>}
          </div>
        </div>
      )}
      {!currentSelectedArea && !isLoading && !error && <div className="error-container"><p>请选择一个景区查看详情，或当前分类下无景区数据。</p></div>}
    </section>
  );
};

export default InteractiveDemo; 