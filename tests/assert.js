export function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertDateEqual(actual, expected, context) {
  const errors = [];

  if (actual.year !== expected.year) {
    errors.push(`year: expected ${expected.year}, got ${actual.year}`);
  }
  if (actual.month !== expected.month) {
    errors.push(`month: expected ${expected.month}, got ${actual.month}`);
  }
  if (actual.day !== expected.day) {
    errors.push(`day: expected ${expected.day}, got ${actual.day}`);
  }

  if (errors.length) {
    throw new Error(
      context + '\n' + errors.join('\n')
    );
  }
}
