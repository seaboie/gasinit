// https://gist.github.com/seaboie/a0143062e2dc7e87f3d39f86ec3aff85#file-formatdatetime-md

function formatThaiDateOrTime(date: Date, isDisplayDate: boolean = true, isFullWeek: boolean = true, isFullMonth: boolean = true, isFullYear: boolean = true): string {
    const options: Intl.DateTimeFormatOptions = isDisplayDate
        ? {
            timeZone: "Asia/Bangkok",
            year: isFullYear ? "numeric" : "2-digit",
            month: isFullMonth ? "long" : "short",
            day: "numeric",
            weekday: isFullWeek ? "long" : undefined
        }
        : {
            timeZone: "Asia/Bangkok",
            hour: "2-digit",
            minute: "2-digit"
        };

    const formattedThaiDateOrTime = isDisplayDate
        ? date.toLocaleDateString("th-TH", options)
        : date.toLocaleTimeString("th-TH", options);

        Logger.log(formattedThaiDateOrTime);
    return formattedThaiDateOrTime;
}

function formatThaiDateTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit"
    };
  
    // Use toLocaleString to format both date and time
    const formattedDateTime = date.toLocaleString("th-TH", options);
    Logger.log(formattedDateTime);
  
    return formattedDateTime;
  }