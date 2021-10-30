export const getUrl = (dbName: string) =>
  `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/${dbName}?retryWrites=true&w=majority`
