import moment from 'moment';

export function addMissingTimestamps(loglength) {
  let newarray = [{ timestamp: 0 }]
  let ticks = [];
  let tickcount = 0;
  let length = moment(loglength).startOf('second') / 1000;
  for (let i = 0; i < length; i++) {
    ticks = ticks.concat(tickcount + 1000)
    tickcount = tickcount + 1000
  }
  ticks.forEach(element => newarray.push({ timestamp: element }))
  return newarray
}

export function getUniqueObjectsFromArray(arr, comp) {
  // store the comparison  values in array
  const unique = arr.map(e => e[comp])
  // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the false indexes & return unique objects
    .filter((e) => arr[e]).map(e => arr[e]);
  return unique;
}

export function reduceTimestamps(array) { 
  let timestampSum = array.reduce((acc, cur) => {
    acc[cur.timestamp] = array.reduce((x, n) => {
      for (let prop in n) {
        if (cur.timestamp === n.timestamp)
          if (x.hasOwnProperty(prop))
            x[prop] += n[prop]
          else
            x[prop] = n[prop];
      }
      x.timestamp = cur.timestamp
      return x;
    }, {})
    return acc;
  }, {})
  return timestampSum
}

export function fightDurationCalculator(time1, time2) {
  let time = (time1 - time2)
  return time
}
