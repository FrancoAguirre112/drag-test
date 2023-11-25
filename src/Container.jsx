import { useState } from "react";
import { Card } from "./Card";
import { CustomDragLayer } from "./CustomDragLayer";
import { v4 as uuidv4 } from "uuid";

const style = {
  width: 400,
  margin: "0px 20px",
};

// Creating the list of cards

export const Container = () => {
  const [cards, setCards] = useState({
    first: [
      {
        id: uuidv4(),
        text: "Apple",
      },
      {
        id: uuidv4(),
        text: "Orange",
      },
      {
        id: uuidv4(),
        text: "Pear",
      },
      {
        id: uuidv4(),
        text: "Banana",
      },
      {
        id: uuidv4(),
        text: "Peach",
      },
    ],
    second: [
      {
        id: uuidv4(),
        text: "Cow",
      },
      {
        id: uuidv4(),
        text: "Horse",
      },
      {
        id: uuidv4(),
        text: "Bull",
      },
      {
        id: uuidv4(),
        text: "Tiger",
      },
      {
        id: uuidv4(),
        text: "Lion",
      },
    ],
  });

  // This function is the one that allows us to keep the changes after draggin the element

  const moveCard = ({ fromIndex, toIndex, fromColumn, toColumn }) => {
    setCards((prevCards) => {
      const updatedCards = { ...prevCards };

      const movedCard = updatedCards[fromColumn].splice(fromIndex, 1)[0];
      updatedCards[toColumn].splice(toIndex, 0, movedCard);

      return updatedCards;
    });
  };

  const renderCard = (card, index, column) => {
    return (
      <Card
        key={card.id}
        index={index}
        column={column}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
      />
    );
  };

  return (
    <>
      <CustomDragLayer />
      <div className="flex h-screen justify-center">
        {Object.keys(cards).map((columnId) => (
          
          <div className="bg-red-300 px-5" key={columnId} style={style}>
            <h1 className="text-center my-2 font-bold">Column</h1>
            {cards[columnId].map((card, i) => renderCard(card, i, columnId))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Container;