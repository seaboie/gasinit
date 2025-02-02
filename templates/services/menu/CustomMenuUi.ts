namespace CustomMenuUi {
  // Union type for source path menu function
  export type MenuFunctions =
    | "CustomMenuUi.menuOneSelected"
    | "CustomMenuUi.subMenuOneSelected"
    | "CustomMenuUi.resultOfClickAlert"
    | "CustomMenuUi.nestedSubMenuOneSelected";
  // Define the base MenuItem type with clear usage rules
  export type MenuItem = SeparatorMenuItem | BaseMenuItem | SubMenuMenuItem;

  // Separator-only menu item
  export interface SeparatorMenuItem {
    type: "separator"; // Discriminant property
  }

  // Regular menu item
  export interface BaseMenuItem {
    type: "base"; // Discriminant property
    menuName: string; // Required for menu items
    menuFunction: MenuFunctions; // Function to be called when the item is selected
  }

  // Submenu item
  export interface SubMenuMenuItem {
    type: "submenu"; // Discriminant property
    menuName: string; // Required for submenus
    subMenu: MenuItem[]; // Array of menu items for the submenu
  }

  // Type guard for SeparatorMenuItem
  export function isSeparatorMenuItem(
    item: MenuItem
  ): item is SeparatorMenuItem {
    return item.type === "separator";
  }

  // Type guard for BaseMenuItem
  export function isBaseMenuItem(item: MenuItem): item is BaseMenuItem {
    return item.type === "base";
  }

  // Type guard for SubMenuMenuItem
  export function isSubMenuMenuItem(item: MenuItem): item is SubMenuMenuItem {
    return item.type === "submenu";
  }

  // Define the MenuData type
  export interface MenuData {
    caption: string; // The main menu caption (top-level)
    items: MenuItem[]; // Array of menu items
  }

  // Function to create menus
  export function createMenus(data: MenuData): void {
    try {
      const ui: GoogleAppsScript.Base.Ui = SpreadsheetApp.getUi();
      const menu = ui.createMenu(data.caption);

      // Recursive helper function to add menu items
      const addItems = (
        menu: GoogleAppsScript.Base.Menu,
        items: MenuItem[]
      ) => {
        items.forEach((item) => {
          if (isSeparatorMenuItem(item)) {
            // Add a separator
            menu.addSeparator();
          } else if (isSubMenuMenuItem(item)) {
            // Add a submenu
            const subMenu = ui.createMenu(item.menuName);
            addItems(subMenu, item.subMenu); // Recursively process the submenu
            menu.addSubMenu(subMenu);
          } else if (isBaseMenuItem(item)) {
            // Add a base menu item
            menu.addItem(item.menuName, item.menuFunction);
          } else {
            // Log an invalid configuration
            Logger.log(`⚠️ Invalid menu item: ${JSON.stringify(item)}`);
          }
        });
      };

      // Add items to the main menu
      addItems(menu, data.items);

      // Add the constructed menu to the UI
      menu.addToUi();
    } catch (error) {
      // Log and alert the error
      Logger.log(`🔥 Menu Creation Error: ${error.message}`);
      SpreadsheetApp.getUi().alert(
        `🔥 Menu Creation Error`,
        `An error occurred while creating the menu: ${error.message}`,
        GoogleAppsScript.Base.ButtonSet.OK
      );
      throw error; // Re-throw for debugging
    }
  }

  export interface UserType {
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    row: number;
  }

  //
  export function resultOfClickAlert() {
    const ui = SpreadsheetApp.getUi();

    const row = SpreadsheetApp.getActiveSheet().getActiveCell().getRow();
    Logger.log(row);

    const dataArray: UserType[][] =
      SheetServices.getAllDataRangeFromSheetName<UserType>("basic", {
        startRow: row,
        numRows: 1,
      });

    if (dataArray && dataArray.length > 0) {
      const rowData = dataArray[0];

      if (rowData.length >= 4) {
        // Ensure at least 4 columns exist
        const user: UserType = {
          firstName: String(rowData[0]),
          lastName: String(rowData[1]),
          email: String(rowData[2]),
          status: String(rowData[3]),
          row: row,
        };
        Logger.log(user);
        Logger.log(`User Data: ${user.firstName}`);

        const confirm = ui.alert(
          "Sent email to : ",
          `${user.firstName} : ${user.email}`,
          ui.ButtonSet.OK_CANCEL
        );
        Logger.log(confirm);

        if (confirm === ui.Button.OK) {
          sendEmailTo(user);
        }
      } else {
        Logger.log(`Insufficient data in row ${row}`);
      }
    } else {
      Logger.log(`No data found for row : ${row}`);
    }
  }

  export function sendEmailTo(user: UserType) {
    const htmlBody = Utils.generateHtmlFromFile<UserType>( "html/email/emailTemplate", user ); 
    try { 
      MailApp.sendEmail({
        to: user.email,
        subject: user.firstName,
        htmlBody: htmlBody,
      });
      Logger.log("send");

      SpreadsheetApp.getActiveSheet().getRange(user.row, 4).setValue("Sent");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "🔥 🔥 🔥 Unknown error";
      throw new Error(`🔥 🔥 🔥 Send email failed : ` + errorMessage);
    }
  }

  // Selected Action Functions
  export function menuOneSelected() {
    showAlert("Item 1", "You clicked Item 1!");
  }

  export function subMenuOneSelected() {
    showAlert("Sub Item 1", "You clicked Sub Item 1!");
  }

  export function nestedSubMenuOneSelected() {
    showAlert("Nested Sub Item 1", "You clicked Nested Sub Item 1!");
  }

  // Helper function to show alerts
  function showAlert(title: string, message: string): void {
    SpreadsheetApp.getUi().alert(
      title,
      message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}
