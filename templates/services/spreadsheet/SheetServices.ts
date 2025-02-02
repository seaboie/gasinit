namespace SheetServices {
    // HTML Page
    export function openHtmlFile(fileName: string) {
      try {
        var htmlService: GoogleAppsScript.HTML.HtmlTemplate =
          HtmlService.createTemplateFromFile(fileName);
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
  
    // Type
    export interface RangeOptions {
      startRow?: number;
      startColumn?: number;
      numRows?: number;
      numColumns?: number;
    }
  
    // All Functions
    export function getAllDataRangeFromSheetName<T>(
      sheetName: string,
      rangeOptions?: RangeOptions
    ): T[][] {
      try {
        if (!sheetName || typeof sheetName !== "string") {
          throw new Error("Sheet name must be a non-empty string");
        }
  
        // Get Spreadsheet and sheet
        const spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet =
          SpreadsheetApp.openById(getSheetId());
        const sheet: GoogleAppsScript.Spreadsheet.Sheet =
          spreadsheet.getSheetByName(sheetName);
  
        if (!sheet) {
          throw new Error(`Sheet "${sheetName}" not found in spreadsheet`);
        }
  
        //
        const lastRow = sheet.getLastRow();
        const lastColumn = sheet.getLastColumn();
  
        // Check if has options
        if (rangeOptions) {
          return sheet
            .getRange(
              rangeOptions.startRow || 1,
              rangeOptions.startColumn || 1,
              rangeOptions.numRows || lastRow,
              rangeOptions.numColumns || lastColumn
            )
            .getValues() as T[][];
        }
  
        return sheet.getDataRange().getValues() as T[][];
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "🔥 🔥 🔥 Unknown error";
        throw new Error(
          `🔥 🔥 🔥 Failed to get data from sheet : ` + errorMessage
        );
      }
    }
  
    export function outputContent<T>(
      data: T[][]
    ): GoogleAppsScript.Content.TextOutput {
      const jsonFormat = JSON.stringify({
        status: "success",
        data: data,
      });
      return ContentService.createTextOutput(jsonFormat).setMimeType(
        ContentService.MimeType.JSON
      );
    }
  }
  