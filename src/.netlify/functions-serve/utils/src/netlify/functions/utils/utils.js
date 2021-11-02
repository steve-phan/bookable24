var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../netlify/functions/utils/utils.ts
__export(exports, {
  getUrl: () => getUrl
});
var getUrl = (dbName) => `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUrl
});
//# sourceMappingURL=utils.js.map
