import { useRef, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { createPortal } from "react-dom";
import { ItemTypes } from "./itemTypes";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};
export const Card = ({ id, text, index, moveCard, column }) => {
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // This is just to make it more precise, but if you see the commented out part of the App Component, then you can see a
      // more simple implementation, i recommend understanding that first

      // Don't replace items with themselves
      if (dragIndex === hoverIndex && item.column === column) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

      if (item.column === column) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the swap
        moveCard({
          fromIndex: dragIndex,
          toIndex: hoverIndex,
          fromColumn: item.column,
          toColumn: column,
        });
        
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      } else {
        let toIndex = hoverIndex;

        if (hoverClientY > hoverMiddleY) toIndex++;

        moveCard({
          fromIndex: dragIndex,
          toIndex,
          fromColumn: item.column,
          toColumn: column,
        });

        item.index = toIndex;
        item.column = column;
      }
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index, text, column };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    isDragging: (monitor) => {
      return monitor.getItem().id === id;
    },
  });

  const opacity = isDragging ? 0 : 1;

  const dropRef = drop(ref);

  return (
    <>
      <div ref={dropRef} style={{ paddingBottom: "25px" }}></div>
      {isMounted &&
        createPortal(
          <div
          className="bg-red-400"
            ref={drag}
            style={{ ...style, opacity }}
            data-handler-id={handlerId}
          >
            {text}
          </div>,
          dropRef.current
        )}
    </>
  );
};
