const user = 'al'

export const App = () => {
  return (
    <>
      <h1 className="header"></h1>
      <p>hi,{user.toLowerCase()}</p>
      {/* this is comment */}
      <input id="email" type="email" required />
      <label htmlFor="email">Email:</label>
      <p style={{ color: 'red', fontWeight: 400 }}></p>
    </>
  )
}
