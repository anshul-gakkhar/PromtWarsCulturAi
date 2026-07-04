"use strict";

const TestRunner = {
  passed: 0,
  failed: 0,
  
  describe(name, fn) {
    console.log(`%c📝 Test Suite: ${name}`, 'color: #3b82f6; font-weight: bold; font-size: 14px');
    const suiteDiv = document.createElement('div');
    suiteDiv.className = 'suite';
    suiteDiv.innerHTML = `<h3>📝 ${name}</h3>`;
    document.getElementById('test-results').appendChild(suiteDiv);
    
    // Bind the div to the context so it tests append to it
    this.currentSuiteDiv = suiteDiv;
    try {
      fn();
    } catch (e) {
      console.error(e);
    }
  },

  it(description, fn) {
    try {
      fn();
      this.passed++;
      console.log(`%c  ✅ ${description}`, 'color: #10b981');
      this.currentSuiteDiv.innerHTML += `<div class="test pass">✅ ${description}</div>`;
    } catch (e) {
      this.failed++;
      console.error(`%c  ❌ ${description}`, 'color: #ef4444');
      console.error(e);
      this.currentSuiteDiv.innerHTML += `<div class="test fail">❌ ${description}<br><small>${e.message}</small></div>`;
    }
    this.updateSummary();
  },

  expect(actual) {
    return {
      toBe(expected) {
        if (actual !== expected) {
          throw new Error(`Expected ${expected} but got ${actual}`);
        }
      },
      toContain(expected) {
        if (!actual.includes(expected)) {
          throw new Error(`Expected to contain ${expected} but got ${actual}`);
        }
      },
      toBeTruthy() {
        if (!actual) {
          throw new Error(`Expected truthy but got ${actual}`);
        }
      }
    };
  },

  updateSummary() {
    const summary = document.getElementById('summary');
    summary.innerHTML = `
      <span class="pass-count">Passed: ${this.passed}</span> | 
      <span class="fail-count">Failed: ${this.failed}</span>
    `;
  }
};

// Expose globally
window.describe = TestRunner.describe.bind(TestRunner);
window.it = TestRunner.it.bind(TestRunner);
window.expect = TestRunner.expect;
