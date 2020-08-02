const onChange = duration => {
  const { hours, minutes, seconds } = duration;
  setState({ hours, minutes, seconds });
};

return (
  <Modal open={isOpen}>
    <DurationPicker
      onChange={onChange}
      initialDuration={{ hours: 1, minutes: 2, seconds: 3 }}
      maxHours={5}
    />
    <button onClick={closeModal} />
  </Modal>
);