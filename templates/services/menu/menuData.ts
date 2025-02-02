const menuData: CustomMenuUi.MenuData = {
  caption: "Menu",
  items: [
    {
      type: "base",
      menuName: "Send Gmail",
      menuFunction: "CustomMenuUi.resultOfClickAlert"
    },
    {
      type: "separator"
    },
    {
      type: "base",
      menuName: "Item 1",
      menuFunction: "CustomMenuUi.menuOneSelected",
    },
    {
      type: "separator",
    },
    {
      type: "submenu",
      menuName: "Submenu 1",
      subMenu: [
        {
          type: "base",
          menuName: "Sub Item 1",
          menuFunction: "CustomMenuUi.subMenuOneSelected",
        },
        {
          type: "submenu",
          menuName: "Nested Submenu 1",
          subMenu: [
            {
              type: "base",
              menuName: "Nested Sub Item 1",
              menuFunction: "CustomMenuUi.nestedSubMenuOneSelected",
            },
          ],
        },
      ],
    },
    {
      type: "base",
      menuName: "Item 2",
      menuFunction: "CustomMenuUi.menuOneSelected",
    },
    {
      type: "separator",
    },
    {
      type: "submenu",
      menuName: "Submenu 2",
      subMenu: [
        {
          type: "base",
          menuName: "Sub Item 2",
          menuFunction: "CustomMenuUi.subMenuOneSelected",
        },
        
      ],
    },
  ],
};
