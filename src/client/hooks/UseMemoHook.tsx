import { parse } from 'path';
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { TaskDelay } from '../../util/util';

export function UseMemoHook() {
  return (
    <div>
      UseMemoHook
      <br /><br />
      UseMemo01
      <UseMemo01 />
      <br /><br />
      <App />
      <br /><br />
    </div>
  )
}

/****************************************** UseMemo01 ******************************************************/

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
/****************************************** UseMemo01 END***************************************************/

/****************************************** React memo *****************************************************/
//Typing into the textbox causes the App component to rerender, which forces child components to rerender.  How de we prevent this?
const App = () => {
  console.log("App rerendered")
  const [users, setUsers] = useState([{ id: 0, name: "Alan" }, { id: 1, name: "Balan" }, { id: 2, name: "Talan" }]);
  const [text, setText] = useState("");
  const handleRemoveUser = useCallback((id: number) => setUsers(u => u.filter(x => x.id !== id)), []);

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <br />
      {text}
      <List users={users} removeUser={handleRemoveUser} />
    </div>
  );
}

//Wrapping this in React.memo prevents a rerender since users doesn't change
//But App recreates handleRemoveUser on each rerender so we use useCallback to return same reference
const List = React.memo(({ users, removeUser }: { users: { id: number, name: string }[], removeUser: (id: number) => void }) => {
  console.log("List rerendered")

  return (<div>
    {users.map(x => (<div key={x.id}>{x.name} <button onClick={() => removeUser(x.id)}>Remove</button> </div>))}
  </div>);
});

/****************************************** React memo END**************************************************/