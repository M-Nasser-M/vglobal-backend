export default {
  config: {
    locales: ["ar", "en"],
    tutorials: false,
    notifications: { releases: false },
  },
  bootstrap(app) {
    console.log(app);
  },
};
