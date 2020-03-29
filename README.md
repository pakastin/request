# request
Simple AJAX requests

## get(url, cb)
```js
get('data.json', (err, data) => {
  if (err) {
    console.error(new Error(err));
    return;
  }
  console.log(JSON.parse(data));
});
```

## post(url, data, cb)
```js
post('data.json', JSON.stringify(data), (err, data) => {
  if (err) {
    console.error(new Error(err));
    return;
  }
  console.log(JSON.parse(data));
});
```
