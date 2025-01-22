function onOpen() {}

// Web app entry point
function doGet() {
    const htmlService = HtmlService.createTemplateFromFile('html/index');
    const html = htmlService.evaluate();
    html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    html.setTitle(CONFIG.SET_TITLE);
    html.setFaviconUrl(CONFIG.SET_FAVICON_URL);
    return html;
  }
  
  // Function to include other HTML files
  function include(filename: string) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }

