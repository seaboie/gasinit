const CONFIG = {
  SET_FAVICON_URL:
    "https://raw.githubusercontent.com/seaboie/images/main/images/logo/logoTransparent.png",
  SET_TITLE: "",
  ERROR: {
    ERROR_NOT_FOUND: "",
  },
  EMAIL: {
    EMAIL_RECIPIENT: "",
  },
  CALENDAR: {
    CALENDAR_ID: "",
  },
  TELEGRAM: {
    TELEGRAM_TOKEN: "",
    TELEGRAM_CHAT_ID: "",
    TELEGRAM_GROUP_ID: "",
  },
  LINE: {
    LINE_TOKEN: "",
    LINE_USER_ID: "",
    LINE_GROUP_ID: "",
  },
};

// Basic Function

function getSheetId(): string {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheetId = spreadsheet.getId();
    Logger.log("Sheet ID: " + sheetId);
    return sheetId;
  } catch (error) {
    Logger.log("Error getting Sheet ID: " + error.message);
    throw error; // Re-throw to allow caller to handle
  }
}

function getScriptId(): string {
  try {
    const scriptId: string = ScriptApp.getScriptId();
    Logger.log(`Script ID: ` + scriptId);
    return scriptId;
  } catch (error) {
    Logger.log(`Error getting Script ID: ${error.message}`);
    throw error;
  }
}

function getFormId(): string {
  try {
    const formId = FormApp.getActiveForm().getId();
    Logger.log(`Form ID: ${formId}`);
    return formId;
  } catch (error) {
    Logger.log(`Error getting Form ID: ${error.message}`);
    throw error;
  }
}
