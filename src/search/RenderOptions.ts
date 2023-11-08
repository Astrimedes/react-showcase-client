const STANDARD = 'standard';
const DEFERRED = 'deferred';
const TRANSITION = 'transition';

type RenderOption = typeof STANDARD | typeof DEFERRED | typeof TRANSITION;

export { type RenderOption}