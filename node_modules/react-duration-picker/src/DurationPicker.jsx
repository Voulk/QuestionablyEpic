import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./DurationPicker.css";
import DurationPickerColumn from "./DurationPickerColumn";

DurationPicker.propTypes = {
  onChange: PropTypes.func,
  initialDuration: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }),
  maxHours: PropTypes.number,
  noHours: PropTypes.bool,
};

DurationPicker.defaultProps = {
  maxHours: 10,
  onChange: () => {},
  initialDuration: { hours: 0, minutes: 0, seconds: 0 },
  noHours: false,
};

function DurationPicker(props) {
  const { onChange, maxHours, initialDuration, noHours } = props;
  const [isSmallScreen, setIsSmallScreen] = useState(undefined);
  const [duration, setDuration] = useState(initialDuration);

  // column onChange handlers
  const onChangeHours = useCallback(hours => {
    setDuration(prevDuration => ({ ...prevDuration, hours }));
  }, []);
  const onChangeMinutes = useCallback(minutes => {
    setDuration(prevDuration => ({ ...prevDuration, minutes }));
  }, []);
  const onChangeSeconds = useCallback(seconds => {
    setDuration(prevDuration => ({ ...prevDuration, seconds }));
  }, []);

  // add/remove resize listener and measure screen size
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth <= 400) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // execute callback prop
  useEffect(() => {
    onChange(duration);
  }, [duration, onChange]);
  return (
    <div className="rdp-picker">
      {!noHours && (
        <DurationPickerColumn
          onChange={onChangeHours}
          unit="hours"
          maxHours={maxHours}
          isSmallScreen={isSmallScreen}
          initial={initialDuration.hours}
        />
      )}
      <DurationPickerColumn
        onChange={onChangeMinutes}
        unit="mins"
        isSmallScreen={isSmallScreen}
        initial={initialDuration.minutes}
      />
      <DurationPickerColumn
        onChange={onChangeSeconds}
        unit="secs"
        isSmallScreen={isSmallScreen}
        initial={initialDuration.seconds}
      />
    </div>
  );
}

export default DurationPicker;
