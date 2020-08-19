import React, { useState } from "react";
import AppModal from "./AppModal";

function App() {
  const [durationDisplayedInText, setDurationDisplayedInText] = useState(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedModal, setHasOpenedModal] = useState(false);
  const onCloseModal = duration => {
    setDurationDisplayedInText(duration);
  };
  const onOpenModal = () => {
    setIsOpen(true);
    setHasOpenedModal(true);
  };
  const { hours, minutes, seconds } = durationDisplayedInText || {};
  return (
    <React.Fragment>
      <h1>React Duration Picker</h1>
      <p>
        Hook based React component for picking durations of time. Inspired by
        Android number pickers.
      </p>
      <h2>Example</h2>

      <div>
        {hasOpenedModal && durationDisplayedInText
          ? `You have selected a duration of ${hours} hour${
              hours !== 1 ? "s" : ""
            }, ${minutes} minute${
              minutes !== 1 ? "s" : ""
            }, and ${seconds} second${seconds !== 1 ? "s" : ""}.`
          : "Click the button on the right to select a duration."}
        <button style={{ marginLeft: 10 }} onClick={onOpenModal} type="button">
          Select Duration
        </button>
      </div>

      <h2>Features</h2>
      <ul>
        <li>Support for mobile devices as well as mouse and keyboard input.</li>
        <li>
          Source code and documentation available on{" "}
          <a href="https://github.com/flurmbo/react-duration-picker">Github</a>.
        </li>
      </ul>
      <AppModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCloseModal={onCloseModal}
        initialDuration={durationDisplayedInText || undefined}
      />
    </React.Fragment>
  );
}

export default App;
