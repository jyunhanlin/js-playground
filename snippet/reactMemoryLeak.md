# How to fix memory leaks in React

## Using Boolean flag

```js
const [value, setValue] = useState('checking value...');
useEffect(() => {
  let isMounted = true;
  fetchValue().then(() => {
    if (isMounted) {
      setValue('done!'); // no more error
    }
  });
  return () => {
    isMounted = false;
  };
}, []);
```

## Using AbortController

```js
useEffect(() => {
  let abortController = new AbortController();
  // your async action is here
  return () => {
    abortController.abort();
  };
}, []);
```

## Using third-party hook

```js
const [value, setValue] = useStateIfMounted('checking value...');
useEffect(() => {
  fetchValue().then(() => {
    setValue('done!'); // no more error
  });
}, []);
```
