// Simpler way of implementing it, but without being able to move to the other column

// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const ItemTypes = {
//   CARD: "card",
// };

// // eslint-disable-next-line react/prop-types
// const DragItem = ({ id, text, index, moveItem }) => {
//   const ref = React.useRef(null);

//   const [, drop] = useDrop({
//     accept: ItemTypes.CARD,
//     hover(item) {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;

//       if (dragIndex === hoverIndex) {
//         return;
//       }

//       moveItem(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.CARD,
//     item: { id, index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   drag(drop(ref));

//   // React.useEffect(() => {
//   //   console.log("Is Dragging:", isDragging);
//   // }, [isDragging]);

//   return (
//     <div
//       className={`w-full py-5 px-8 flex justify-center bg-red-100 ${
//         isDragging
//           ? "opacity-50 border-2 border-red-950 border-dashed"
//           : "border-2 border-red-100"
//       }`}
//       ref={ref}
//     >
//       {text}
//     </div>
//   );
// };

// const App = () => {
//   const [items, setItems] = useState([
//     { id: 1, text: "Card 1" },
//     { id: 2, text: "Card 2" },
//     { id: 3, text: "Card 3" },
//   ]);

//   const moveItem = (dragIndex, hoverIndex) => {
//     const draggedItem = items[dragIndex];
//     const newItems = [...items];
//     newItems.splice(dragIndex, 1);
//     newItems.splice(hoverIndex, 0, draggedItem);
//     setItems(newItems);
//   };

//   return (
//     <>
//       <DndProvider backend={HTML5Backend}>
//         <div className="flex gap-5">
//           <div className="w-full bg-red-200 px-5 py-5 items-center flex flex-col gap-5">
//             <h2>Column</h2>
//             {items.map((item, index) => (
//               <DragItem
//                 key={item.id}
//                 id={item.id}
//                 text={item.text}
//                 index={index}
//                 moveItem={moveItem}
//               />
//             ))}
//           </div>
//         </div>
//       </DndProvider>
//     </>
//   );
// };

// export default App;


// Utilizing the TouchBackend instead of the HTML5Backend allows us to drag and drop in mobile, 
// and by setting enableMouseEvents: true it also works on desktop

import Container from "./Container";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

function App() {
  return (
    <div className="App">
      <DndProvider
        backend={TouchBackend}
        options={{ enableMouseEvents: true }}
      >
        <Container />
      </DndProvider>
    </div>
  );
}

export default App;
