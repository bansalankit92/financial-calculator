export class Constants {
  public static readonly SIP_BASE_AMT = 3000;
  public static readonly WEBSITE_URL = 'https://fincalculator.in';
  public static readonly SIP_BASE_INTEREST = 12;
  public static readonly SIP_BASE_YEARS = 3;
  public static readonly CHART_PIE_COLOR_SCHEME = {
    domain: ['#3F51B5', '#FFC300']
  };

  public static readonly SALARY_BASE_PERCENT:number = 50;
  public static readonly EDUCATION_CESS:number = 4;

  public static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
