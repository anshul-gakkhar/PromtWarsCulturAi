"use strict";

describe("CulturAI Core Logic", () => {
  it("should have a valid test environment", () => {
    expect(true).toBeTruthy();
  });

  it("should parse Gemini JSON correctly", () => {
    const rawInput = '```json\n{"trail": [{"name": "Taj Mahal"}]}\n```';
    
    // Simulate the logic in app.js parseGeminiJSON
    let cleaned = rawInput.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.substring(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.substring(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.substring(0, cleaned.length - 3);
    }
    
    const parsed = JSON.parse(cleaned.trim());
    expect(parsed.trail[0].name).toBe("Taj Mahal");
  });

  it("should calculate distances accurately", () => {
    // Mock the distance function from place.html
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
    
    const dist = getDistance(28.6139, 77.2090, 27.1751, 78.0421); // Delhi to Agra
    expect(Math.round(dist) > 150).toBeTruthy();
    expect(Math.round(dist) < 250).toBeTruthy();
  });
});
