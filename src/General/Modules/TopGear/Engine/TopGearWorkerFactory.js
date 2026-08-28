// Spawning the Top Gear worker lives in its own module because `import.meta.url` can only be parsed by the webpack
// build. Keeping it out of TopGearEngineShared means the engine helpers in that file stay importable from tests,
// which otherwise fail to parse the whole module before running a single assertion.
export function createTopGearWorker() {
  return new Worker(new URL('./TopGearWorker.js', import.meta.url), { type: 'module' });
}
