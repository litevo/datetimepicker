const tests = [];

export function test(name, fn) {
  tests.push({ name, fn });
}

export async function run() {
  let passed = 0;

  for (const t of tests) {
    try {
      await t.fn();
      console.log('✓', t.name);
      passed++;
    } catch (e) {
      console.error('✗', t.name);
      console.error(e.message);
    }
  }

  console.log(`\n${passed}/${tests.length} tests passed`);
}
