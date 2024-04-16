import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from 'react-grid-layout';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";


const SingleBox: React.FC = () => {


    const [layout, setLayout] = useState<Layout[]>(
        [
          // { i: "note1", x: 2, y: 2, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
          { i: "test", x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]}
        ],
      );

      const onLayoutChange = (newLayout: any) => {
        setLayout(newLayout);
      };

      useEffect(() => {
        console.log(layout, "new layout");
      }, layout);

//   const layouts: Layouts = {
//     lg: [ 
//     //   { i: "note1", x: 2, y: 2, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
//       { i: "test", x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]}
//     ],  
//   }
//   // Layout Management
//   const onLayoutChange = (newLayout: Layout, allLayouts: Layouts) => {
//     layouts.lg = [newLayout];
//     console.log(layouts);
//   };

  const ResponsiveGridLayout = WidthProvider(Responsive);

  // Render begins here
  return (
    <Box height={600} id="box">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        compactType={null}
        onLayoutChange={onLayoutChange}
        rowHeight={20}
        isResizable={true}
        preventCollision={true}
        isDraggable={true}
        width={800}
      > 
        {/* Sticky Note Elements */}
        {/* {stickyNotesToRender} */}

        <div key="test" style={{border: '1px solid black' }}></div>
      </GridLayout>

    </Box>
  );
  
};

export default SingleBox;


