const { test, expect } = require('@playwright/test');

test('banking framework smoke test', async () => {
  expect(1 + 1).toBe(2);
});
