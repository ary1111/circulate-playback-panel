type SeriesSize = 'sm' | 'md' | 'lg';
type TimeOptions = '22:00' | '23:00' | '00:00' | '1:00' | '02:00' | '03:00' | '04:00' | '05:00' | '06:00' | '07:00' | '08:00' | '09:00' |'12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00' |'19:00' | '20:00' | '21:00' | '22:00' | '23:00' 
export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  startTimeOptions: TimeOptions;
  endTimeOptions: TimeOptions;
  enableScrubber: boolean;
}
