const transformRemoveConsolePlugin = [];
// 改，2022.10.02，临时注释
if (process.env.NODE_ENV === "production") {
  transformRemoveConsolePlugin.push(["transform-remove-console", { exclude: ["error", "warn"] }]);
}
module.exports = {
  presets: ["@vue/app"],
  plugins: [...transformRemoveConsolePlugin],
};
