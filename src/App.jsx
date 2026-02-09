const user = 'al'
const isLoggedin = false

export const App = () => {
  let content = ''

  if (isLoggedin) {
    content = <p>`hi,${user}`</p>
  } else {
    content = <button>'log pleas'</button>
  }
  return (
    <>
      <h1 className="header"></h1>
      {isLoggedin && <p>hi,{user.toLowerCase()}</p>}
      <p>{isLoggedin ? <p>`hi,${user}`</p> : <button>'log pleas'</button>}</p>
      <p>{content}</p>
    </>
  )
}
