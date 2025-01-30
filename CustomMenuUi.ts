namespace CustomMenuUi {
    // Union type for source path menu function
    export type MenuFunctions =
      | "CustomMenuUi.menuOneSelected"
      | "CustomMenuUi.subMenuOneSelected"
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
  