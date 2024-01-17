import React, { useState, useEffect, useRef } from "react";
import DockLayout, { LayoutData } from 'rc-dock'
import "rc-dock/dist/rc-dock.css";

const defaultLayout: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [
          { id: 'tab1', title: 'tab1', content: <div>Hello World</div> }
        ]
      },
      {
        tabs: [
          { id: 'tab2', title: 'tab1', content: <div>Hello World</div> }
        ]
      }
    ]
  }
};

export function RCDockExample() {

  return (
    <DockLayout
      defaultLayout={defaultLayout}
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        right: 10,
        bottom: 10,
      }}
    />
  )

}