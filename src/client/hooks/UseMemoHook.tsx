import { parse } from 'path';
import React, { useEffect, useMemo, useState } from 'react'
import { TaskDelay } from '../../util/util';

export function UseMemoHook() {
  return (
    <div>
      UseMemoHook
      <br /><br />
      UseMemo01
      <UseMemo01 />
      <br /><br />
    </div>
  )
}

/*When we click the increment, slow number goes up but there is delay
  When we change theme, there is also delay bc it causes a rerender and slow function has
  to recaclulate. We can memoize the slow function so there is no delay
  SlowNum doesn't need to recalculate for a rerender unrelated to its inputs

  themeStyle gets recreated on every rerender and so it points to a different place in memory
  so useEffect will rerun everytime you change number
  We memoize themeStyle so it always references the same cached value in memory
  It will only return a new object if 'dark' changes so changing the theme reruns the effect
*/
function UseMemo01() {
  const [num, setNum] = useState(0);
  const [dark, setDark] = useState(false);
  const slowNum = useMemo(() => slowFunction(num), [num]);

  // const themeStyle = {
  //   backgroundColor: dark ? 'black' : 'white',
  //   color: dark ? 'white' : 'black'
  // }

  const themeStyle = useMemo(() => ({
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black'
  }), [dark]);

  useEffect(() => {
    console.log('Theme Changed');
  }, [themeStyle]);

  return (
    <div>
      <input type="number" value={num} onChange={(e) => setNum(parseInt(e.target.value))}></input>
      <button onClick={() => setDark(x => !x)}>ToggleDark</button>
      <div style={themeStyle}>{slowNum}</div>
    </div>
  )
}
function slowFunction(num: number) {
  for (let i = 0; i < 1000000000; i++) { }
  return num + 2;
}

