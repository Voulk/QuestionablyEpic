declare module DurationPicker {
  interface Duration {
    hours?: number;
    minutes: number;
    seconds: number;
  }

  interface Props {
    maxHours?: number;
    initialDuration?: DurationPicker.Duration;
    onChange?: (duration: DurationPicker.Duration) => void;
    noHours?: boolean;
  }
}

declare const DurationPicker: React.FunctionComponent<DurationPicker.Props>;

export default DurationPicker;
