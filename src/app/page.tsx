import BigNos from "@/components/big-nos";
import Grid from "@/components/grid";

export default function Home() {
  let birthDate = new Date(1994, 1, 10)
  let currentDate = new Date()
  let weeksPassed = (currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  weeksPassed = Math.ceil(weeksPassed)
  let weeksLeft = 4000 - weeksPassed
  
  return (
    <main className="flex h-screen flex-col justify-between py-8 px-6">
      <BigNos num={weeksLeft} pos="top" />
      <Grid maxWeek={weeksLeft}/>
      <BigNos num={weeksPassed} pos="bottom" />
    </main>
  );
}
