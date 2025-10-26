import './App.css'

function Square (){
  return (
      <button className='square'>
      1
      </button>
  )
}

function App() {
  return (
    <>
    <div className='board_row'>
      <Square/>
      <Square/>
      <Square/>
    </div >
    <div className='board_row'>
      <Square/>
      <Square/>
      <Square/>
    </div>
    <div className='board_row'>
      <Square/>
      <Square/>
      <Square/>
    </div>
    </>
  )
}

export default App
