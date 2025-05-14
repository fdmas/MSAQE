// src/data.js

// 辅助函数：解析CSV文本
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    // This is a simplified CSV parser. For robust CSV parsing, a library is recommended,
    // especially if values can contain commas within quotes.
    const values = line.split(','); // Simple split, assumes no commas within quoted fields
    const rowObject = {};
    headers.forEach((header, index) => {
      rowObject[header] = values[index] ? values[index].trim() : '';
    });
    return rowObject;
  });
  return rows.filter(row => row.scenic_name); 
}

// Predefined image data. Category from CSV will be prioritized.
const predefinedImageData = {
  "青海湖（青海）": { image: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg" }, 
  "周庄（江苏）": { image: "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg" },
  "神农架（湖北）": { image: "https://images.pexels.com/photos/161401/bg-scenic-earthquake-in-the-sky-161401.jpeg" },
  "颐和园（北京）": { image: "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg" },
  "杭州西湖（浙江）": { image: "https://images.pexels.com/photos/249798/pexels-photo-249798.jpeg" },
  "故宫（北京）": { image: "https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg" },
  "万里长城（八达岭/慕田峪等）": { image: "https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg" }, // Adjusted name to match common CSV entry
  "万里长城（八达岭）": { image: "https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg" }, // Kept for broader matching
  "秦始皇兵马俑（陕西西安）": { image: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg" },
  // Add more images as needed, matching the scenic_name from your CSV
};
const defaultImage = "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg";
const defaultCategoryNameFromCode = "未分类景区"; // Fallback if CSV has no category


function calculateDimensionRanks(areas) {
  const dimensions = ['BM', 'Exc', 'Hyg', 'PT', 'REP', 'TSA', 'TSH', 'TT'];
  const areasCopy = areas.map(area => ({ ...area, dimensionRanks: {} }));

  dimensions.forEach(dim => {
    const validAreasForDim = areasCopy
      .filter(area => area.scores && typeof area.scores[dim] === 'number')
      .map(area => ({ id: area.id, name: area.name, score: area.scores[dim] }));

    validAreasForDim.sort((a, b) => b.score - a.score);

    let rank = 0;
    let lastScore = -Infinity;
    validAreasForDim.forEach((sortedArea, index) => {
      if (sortedArea.score !== lastScore) {
        rank = index + 1;
        lastScore = sortedArea.score;
      }
      const targetArea = areasCopy.find(a => a.id === sortedArea.id);
      if (targetArea) {
        targetArea.dimensionRanks[dim] = rank;
      }
    });

    areasCopy.forEach(area => {
      if (!(area.scores && typeof area.scores[dim] === 'number') || area.dimensionRanks[dim] === undefined) {
        area.dimensionRanks[dim] = "N/A";
      }
    });
  });
  return areasCopy;
}

export async function loadScenicData() {
  try {
    const response = await fetch('/8.final_summary_scores_aligned_to_rank_3.csv');
    if (!response.ok) {
      console.error(`HTTP error! status: ${'${response.status}'} when fetching CSV.`);
      throw new Error(`HTTP error! status: ${'${response.status}'}`);
    }
    const csvText = await response.text();
    const csvData = parseCSV(csvText);
    
    if (!csvData || csvData.length === 0) {
        console.warn("CSV data is empty or parsing failed. Returning empty data.");
        return { scenicAreas: [], scenicAreasByCategory: {} };
    }

    let scenicAreasFromCSV = csvData.map((row, index) => {
      const name = row.scenic_name; 
      const predefined = predefinedImageData[name] || {};
      // Assumes your CSV has a column named "Category"
      const categoryFromCSV = row.Category ? row.Category.trim() : defaultCategoryNameFromCode;

      const getScore = (value) => {
        const num = parseFloat(value);
        return !isNaN(num) ? num : "数据暂无";
      };

      const scores = {
        BM: getScore(row.BM_weighted),
        Exc: getScore(row.Exc_weighted),
        Hyg: getScore(row.Hyg_weighted),
        PT: getScore(row.PT_weighted),
        REP: getScore(row.REP_weighted),
        TSA: getScore(row.TSA_weighted),
        TSH: getScore(row.TSH_weighted),
        TT: getScore(row.TT_weighted),
      };
      
      const hasInvalidScore = Object.values(scores).some(s => s === "数据暂无");
      const overallRank = parseFloat(row.Rank);

      return {
        id: index + 1, 
        name: name || "未知景区",
        category: categoryFromCSV, // Category from CSV
        image: predefined.image || defaultImage,
        rank: !isNaN(overallRank) && !hasInvalidScore ? overallRank : "数据暂无",
        scores: scores, 
        dimensionRanks: {} 
      };
    });

    scenicAreasFromCSV = calculateDimensionRanks(scenicAreasFromCSV);

    const scenicAreasByCategory = scenicAreasFromCSV.reduce((acc, area) => {
      const category = area.category; // Already determined from CSV or default
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(area);
      return acc;
    }, {});

    return { scenicAreas: scenicAreasFromCSV, scenicAreasByCategory };

  } catch (error) {
    console.error("Failed to load or process scenic data:", error);
    return { scenicAreas: [], scenicAreasByCategory: {} };
  }
} 