namespace Utils {

  export function fetchApiContentData(sheetName: string) {
    const rows = SheetServices.getAllDataRangeFromSheetName(sheetName);
    return outputApiContent(rows);
  }

  export function fetchHtmlWebapp(fileName: string) {
    try {
      return Utils.loadHtmlFromFile(fileName);
    } catch (error) {
      return Utils.errorLoadHtmlFromFile(error);
    }
  }

  export function loadHtmlFromFile(filename: string) {
    try {
      const htmlService: GoogleAppsScript.HTML.HtmlTemplate =
        HtmlService.createTemplateFromFile(filename);
      const html: GoogleAppsScript.HTML.HtmlOutput = htmlService.evaluate();
      html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      html.addMetaTag("viewport", "width=device-width, initial-scale=1");
      html.setTitle(CONFIG.SET_TITLE);
      html.setFaviconUrl(CONFIG.SET_FAVICON_URL);
      html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
      return html;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "🔥 🔥 🔥 Unknown error";
      throw new Error(`🔥 🔥 🔥 Error load html from file : ` + errorMessage);
    }
  }

  export function errorLoadHtmlFromFile(
    error: unknown
  ): GoogleAppsScript.HTML.HtmlOutput {
    const errorMessage =
      error instanceof Error
        ? error.message
        : `🔥 🔥 🔥 🔥 🔥 Oops !!! : Unknow error`;
    const errorTemplate = HtmlService.createTemplateFromFile(
      "error/html/errorLoadHtml"
    );
    errorTemplate.errorMessage = errorMessage;
    const html: GoogleAppsScript.HTML.HtmlOutput = errorTemplate.evaluate();
    html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    html.setTitle(CONFIG.ERROR.ERROR_NOT_FOUND);
    html.setFaviconUrl(CONFIG.SET_FAVICON_URL);
    html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
    return html;
  }
  // สร้าง html from file
  export function generateHtmlFromFile<T extends object>(
    filename: string,
    datas: Partial<T> = {}
  ): string {
    try {
      const template: GoogleAppsScript.HTML.HtmlTemplate =
        HtmlService.createTemplateFromFile(filename);
      // Injecting Data into the Template
      Object.entries(datas).forEach(([key, value]) => (template[key] = value));

      return template.evaluate().getContent();
    } catch (error) {
      Logger.log(
        `🔥 🔥 🔥 🔥 🔥 Oops !!! : Error create HTML body ::: ${error}`
      );
      throw new Error("Error generate HTML file");
    }
  }

  export function outputApiContent<T>(datas: T[][]): GoogleAppsScript.Content.TextOutput {
    const template: string = JSON.stringify({
      status: "Success",
      data: datas
    });
  
    return ContentService.createTextOutput(template).setMimeType(ContentService.MimeType.JSON);
  }
}
