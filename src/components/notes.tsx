'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"


const Notes = ({num}: {num: number}) => {
  const [dialogState, setDialogState] = useState(false)
  const launchDialog = () => {
    setDialogState(true)
  }

  return (
    <div className="h-[34px] flex justify-center items-center w-[34px] border border-white text-xs" onClick={launchDialog}>
          {num}
    </div>
  )
}

export default Notes



