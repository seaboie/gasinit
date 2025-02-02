function onOpen() {}

// Web app entry point
function doGet() {
  return Utils.fetchHtmlWebapp("html/index");
}



function doSomethings(): string {
  Logger.log("Do somethingssss");
  console.log("Debug: logssss");

  return "Hello World!";
}
