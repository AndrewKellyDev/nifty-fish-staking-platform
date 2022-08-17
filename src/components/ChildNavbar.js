import { Tabs } from 'pages/Staking'
import React from 'react'
import '../index.css'


function ChildNavbar({ currentTabStatus, setCurrentTabStatus,ownerTokenCount, ownerStakedTokenCount}) {
  return (
    <div className="mt-4 flex justify-between items-center flex-wrap">
          <div className="mt-5 text-3xl font-bold">
              Staking
          </div>
      <div className="mt-5 border-purple border rounded-full text-center flex">
      <div className={`px-8 py-3 cursor-pointer hover:bg-third hover:text-fourth rounded-full transition ${currentTabStatus === Tabs.staking && "text-fourth bg-third"}`} onClick={()=>setCurrentTabStatus(Tabs.staking)} >Stake({ownerTokenCount})</div>
          <div  className={`px-8 py-3 cursor-pointer hover:bg-third hover:text-fourth rounded-full transition ${currentTabStatus === Tabs.unstaking && "text-fourth bg-third"}`}  onClick={()=>setCurrentTabStatus(Tabs.unstaking)} >Unstake({ownerStakedTokenCount})</div>
      </div>
    </div>
  )
}

export default ChildNavbar