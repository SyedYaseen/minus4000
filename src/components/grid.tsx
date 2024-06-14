import Dialog from "./dialog"
import Notes from "./notes"

const Grid = ({maxWeek}: {maxWeek: number}) => {

  const size = 300
  const ar =[]
  for (let index = maxWeek; index > size; index--) {
    ar.push(index)
  }

  return (
    <>
    <Dialog/>
      {/* <div className="h-[5px] blur-sm bg-white w-full relative top-5 z-50 opacity-75 px-4" /> */}
      <div className="grid grid-cols-8 gap-4 scroll-smooth shadow-inner self-center w-full h-[60%] scroll-m-0 bg-black overflow-scroll px-4">
        {
          ar.map(a => <Notes key={a} num={a}/>)
        }
      </div>
      {/* <div className="h-[5px] blur-sm bg-white w-full relative bottom-6 z-50 opacity-75 px-4" /> */}
    </>
  )
}

export default Grid