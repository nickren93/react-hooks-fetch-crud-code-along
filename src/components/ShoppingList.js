import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Add useEffect hook
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

   // add this function!
   function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // add this callback function
  function handleUpdateItem(newItem) {
    //console.log("In ShoppingCart:", updatedItem);
    const newItems = items.map(item =>{
      if(item.id == newItem.id){
        return newItem
      }else{
        return item
      }
    })
    setItems(newItems)
  }

  function handleDelete(itemToDelete){
    const updatedItems = items.filter(item => item.id != itemToDelete.id)
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} 
          onHandleDelete={handleDelete}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
