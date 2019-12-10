function createLogger(cb) {
	return val =>
		void cb(val) || val;
}

const log = createLogger((val) => console.log(`Valor atual: "${val}".`));

// Usage:

[1, 2, 3]
	.map(log)
	.map((val) => val * 2)
	.map(log);
