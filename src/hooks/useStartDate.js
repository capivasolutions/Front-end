import { useLocalStorage } from "./useLocalStorage";
import { DateUtils } from "../utils/date";
import { START_DATE, START_DATE_OPTION } from "../config/localStorageKeys";
import { useEffect } from "react";

export class StartDateOptions {
  static NOW = "NOW";
  static ONE_HOUR_AGO = "ONE_HOUR_AGO";
  static ONE_DAY_AGO = "ONE_DAY_AGO";
  static ONE_MONTH_AGO = "ONE_MONTH_AGO";
  static ONE_YEAR_AGO = "ONE_YEAR_AGO";
}

export function useStartDate() {
  const [startDate, setStartDate] = useLocalStorage(
    START_DATE,
    DateUtils.hourAgo()
  );
  const [startDateOption, setStartDateOption] = useLocalStorage(
    START_DATE_OPTION,
    StartDateOptions.ONE_HOUR_AGO
  );

  useEffect(() => {
    onChangeStartDate(startDateOption);
  }, []);

  const onChangeStartDate = (option) => {
    switch (option) {
      case StartDateOptions.ONE_HOUR_AGO:
        setStartDate(DateUtils.hourAgo());
        setStartDateOption(StartDateOptions.ONE_HOUR_AGO);
        break;
      case StartDateOptions.ONE_DAY_AGO:
        setStartDate(DateUtils.dayAgo());
        setStartDateOption(StartDateOptions.ONE_DAY_AGO);
        break;
      case StartDateOptions.ONE_MONTH_AGO:
        setStartDate(DateUtils.monthAgo());
        setStartDateOption(StartDateOptions.ONE_MONTH_AGO);
        break;
      case StartDateOptions.ONE_YEAR_AGO:
        setStartDate(DateUtils.yearAgo());
        setStartDateOption(StartDateOptions.ONE_YEAR_AGO);
        break;
      case StartDateOptions.NOW:
      default:
        setStartDate(DateUtils.now());
        setStartDateOption(StartDateOptions.NOW);
        break;
    }
  }


  return { startDate, startDateOption, onChangeStartDate };
}
