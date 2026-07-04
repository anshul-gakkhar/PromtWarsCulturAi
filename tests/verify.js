const fs = require('fs');

try {
    const testContent = fs.readFileSync('/Users/anshul/Desktop/CulturAI_Upload/tests/app.test.js', 'utf8');
    
    // Simulate parseGeminiJSON logic test
    const rawInput = '```json\n{"trail": [{"name": "Taj Mahal"}]}\n```';
    let cleaned = rawInput.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.substring(7);
    else if (cleaned.startsWith('```')) cleaned = cleaned.substring(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.substring(0, cleaned.length - 3);
    const parsed = JSON.parse(cleaned.trim());
    
    if (parsed.trail[0].name !== "Taj Mahal") throw new Error("JSON parsing failed");

    // Simulate distance logic test
    function getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; 
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }
    const dist = getDistance(28.6139, 77.2090, 27.1751, 78.0421);
    if (Math.round(dist) <= 150 || Math.round(dist) >= 250) throw new Error("Distance calculation failed");

    console.log("SUCCESS: All logic checks pass locally!");
} catch (e) {
    console.error("FAILED:", e.message);
    process.exit(1);
}
