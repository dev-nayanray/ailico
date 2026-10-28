// Stub for the server-only guard in Node test environments.
// The real package throws when imported outside RSC; unit/integration tests
// run in plain Node and must be allowed to import server modules.
export {};
