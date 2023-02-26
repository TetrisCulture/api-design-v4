setTimeout(() => {
  throw new Error("oops");
}, 300);

// process is an object that represents the current process that you're in, every piece of meta data like hardware ip etc

process.on("uncaughtException", () => {}); //for general errors in node

process.on("unhandledRejection", () => {}); // for async stuff in node
