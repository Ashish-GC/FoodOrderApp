import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, Setmeals] = useState([]);
  const [isLoading, SetisLoading] = useState(true);
  const [httpError, SethttpError] = useState(null);
  useEffect(() => {
    const fetchmeal = async () => {
      const response = await fetch(
        "https://foodorderapp-84e3a-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Error detected during fetch");
      }
      const data = await response.json();
      const mealsdata = [];
      for (const key in data) {
        mealsdata.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      Setmeals(mealsdata);
      SetisLoading(false);
    };

    fetchmeal().catch((err) => {
      SetisLoading(false);
      if (err.message === "Failed to fetch") {
        SethttpError("Error detected during fetch");
      }
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      ></MealItem>
    );
  });

  return (
    <div className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </div>
  );
};
export default AvailableMeals;
