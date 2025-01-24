function onOpen() {}

// Web app entry point
function doGet() {
  try {
    var htmlService: GoogleAppsScript.HTML.HtmlTemplate =
      HtmlService.createTemplateFromFile("html/index");
    var html: GoogleAppsScript.HTML.HtmlOutput = htmlService.evaluate();
    html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    html.setTitle(CONFIG.SET_TITLE);
    html.setFaviconUrl(CONFIG.SET_FAVICON_URL);
    html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
    return html;
  } catch (error) {
    Logger.log("Have Error, %s", error);
  }
}

// Function to include other HTML files
function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function doSomethings(): string {
  Logger.log("Do somethingssss");
  console.log("Debug: logssss");

  return "Hello World!";
}
