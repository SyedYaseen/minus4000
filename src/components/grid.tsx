import { DateTime } from "next-auth/providers/kakao"

const Sqr = ({num}: {num: number}) => {
  return <div className="h-[34px] flex justify-center items-center w-[34px] border border-white text-xs">{num}</div>
}

const Grid = ({maxWeek}: {maxWeek: number}) => {

  const size = 300
  const ar =[]
  for (let index = maxWeek; index > size; index--) {
    ar.push(index)
    
  }

  return (
    <>
      <div className="h-[4px] blur-sm bg-white w-full relative top-5 z-50" />
      <div className="grid grid-cols-8 gap-3 scroll-smooth self-center w-full h-[60%] overflow-scroll px-1">
        {
          ar.map(a => <Sqr key={a} num={a}/>)
        }
      </div>
      <div className="h-[4px] blur-sm bg-white w-full relative bottom-6 z-50" />
    </>
  )
}

export default Grid