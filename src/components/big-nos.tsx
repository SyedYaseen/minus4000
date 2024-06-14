import { cn } from "@/lib/utils"
const BigNos = ({num, pos}: {num: number, pos: string}) => {
    const top = ""
    const bottom = "text-end"
    const posClass = pos === "top" ? top : bottom

  return (
    <div className={cn( "text-8xl flex flex-col" , posClass) }>
      {num}
      <span className={cn("text-sm", pos === "top" ? "pl-3" : "pr-2")}>
        Weeks {pos === "top" ? "left" : "complete"}
      </span>
    </div>
  )
}

export default BigNos