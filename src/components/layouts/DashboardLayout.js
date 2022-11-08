import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export const DashboardLayout = (props) => {

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const cursorInner = document.getElementById("cursorInner");
    let e = {
      x: 0,
      y: 0,
      largeX: 0,
      largeY: 0,
      targetX: 0,
      targetY: 0
    };
    cursor.style.display = "block";
    cursorInner.style.display = "block";
    document.onmousemove = function (evnt) {
      e.targetX = evnt.pageX;
      e.targetY = evnt.pageY;
    }
    const cursorMover = () => {
      e.x += .2 * (e.targetX - e.x);
      e.y += .2 * (e.targetY - e.y);
      e.largeX += .12 * (e.targetX - e.largeX);
      e.largeY += .12 * (e.targetY - e.largeY);
      cursorInner.style.transform = `translate(${e.x - 5}px, ${e.y - 5}px) `;
      cursor.style.transform = `translate(${e.largeX - 25}px, ${e.largeY - 25}px)`;
      requestAnimationFrame(cursorMover)
    };
    cursorMover()
  })
  
  return (
    <div className='dashboard-layout'>
      <div id="cursor"></div>
      <div id="cursorInner"></div>
      <Sidebar />
      <div className='main'>
        <Navbar />
        {props.children}
      </div>
    </div>
  );
};
