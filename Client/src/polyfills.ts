(window as any).global = window;
(window as any).process = {
  env: {},
  versions: { node: null }, // Prevents process.versions.node errors
};
