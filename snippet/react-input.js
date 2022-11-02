// controlled and un-controlled
import { useRef } from 'react';

const Input = (props) => {
  const isControlled = props.value !== undefined;

  const stateRef = useRef(props.value);

  if (isControlled) stateRef.current = props.value;

  const finalValue = isControlled ? props.value : stateRef.current;

  const [_, setFlag] = useState({});

  const forceUpdate = () => {
    setFlag({});
  };

  return (
    <input
      value={finalValue}
      onChange={(event) => {
        stateRef.current = event.target.value;
        forceUpdate();
        props.onChange(event.target.value);
      }}
    />
  );
};
