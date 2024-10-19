export class Utils {
  static sanitizeDashboardTotalValue(value: any) {
    value = value.split("$").pop();
    return parseFloat(value.replace(/,/g, ""));
  }

  static sanitizeDashboardOpenValue(value: any) {
    let returnVal = value.split("/").shift();
    returnVal = returnVal.split("$").pop();
    return parseFloat(returnVal.replace(/,/g, ""));
  }
}
