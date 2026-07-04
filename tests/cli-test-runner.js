const fs = require('fs');
const testRunner = fs.readFileSync('/Users/anshul/Desktop/CulturAI_Upload/tests/test-runner.js', 'utf8');
const testContent = fs.readFileSync('/Users/anshul/Desktop/CulturAI_Upload/tests/app.test.js', 'utf8');

// Mock browser environment for Node
global.window = global;
global.document = {
  createElement: () => ({ className: '', innerHTML: '' }),
  getElementById: () => ({ appendChild: () => {}, innerHTML: '' })
};

eval(testRunner.replace('"use strict";', ''));
eval(testContent.replace('"use strict";', ''));

if (global.TestRunner.failed > 0) {
    console.log("TESTS FAILED");
    process.exit(1);
} else {
    console.log("ALL TESTS PASSED SUCCESSFULLY!");
    process.exit(0);
}
