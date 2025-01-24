namespace Utils {
    
    // สร้าง html from file
    export function createHtmlFromFile<T extends object>(
        filename: string,
        datas: Partial<T> = {}
    ): string {
        try {
            const template: GoogleAppsScript.HTML.HtmlTemplate = HtmlService.createTemplateFromFile(filename);
            Object.entries(datas).forEach(([key, value]) => template[key] = value);
            return template.evaluate().getContent();
        } catch (error) {
            Logger.log(`🔥 🔥 🔥 🔥 🔥 Oops !!! : Error create HTML body ::: ${error}`);
            return "<p>🔥 🔥 🔥 🔥 🔥 Oops !!! : Error occurred while generate the email content.</p>";
        }
    }
}