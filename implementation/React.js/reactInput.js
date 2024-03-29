// controlled and un-controlled
import { useRef } from 'react';

export const Input = (props) => {
  const { value, onChange, ...otherProps } = props;

  const isControlled = value !== undefined;

  const stateRef = useRef(value);

  if (isControlled) stateRef.current = value;

  const finalValue = isControlled ? value : stateRef.current;

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
        onChange(event.target.value);
      }}
      {...otherProps}
    />
  );
};

export function usePropsValue(options) {
  const { value, defaultValue, onChange } = options;

  const [_, setFlag] = useState({});

  const update = () => {
    setFlag({});
  };

  const stateRef = useRef(value !== undefined ? value : defaultValue);
  if (value !== undefined) {
    stateRef.current = value;
  }

  const setState = (v, forceTrigger = false) => {
    // `forceTrigger` means trigger `onChange` even if `v` is the same as `stateRef.current`
    const nextValue = typeof v === 'function' ? v(stateRef.current) : v;
    if (!forceTrigger && nextValue === stateRef.current) return;
    stateRef.current = nextValue;
    update();
    onChange?.(nextValue);
  };
  return [stateRef.current, setState];
}
