export const getDishById = (id: number) => {
  const meals = restaurant.food.flatMap((category) => category.meals);
  return meals.find((meal) => meal.id === id);
};
export const restaurant = {
  name: 'Vapiano',
  rating: '4.5 Excellent',
  ratings: '(500+)',
 // img: require('./r1.jpeg'),
  distance: '0.85 miles away',
  delivery: '10-20 min',
  tags: ['Italian', 'Pizza', 'Pasta', 'Salads', 'Vegetarian', 'Alcohol', 'Wine', 'Vegan Friendly'],
  about: 'The home of handmade fresh pasta, thin crust pizza, protein packed salads, homemade sauces and dressings too. Choose your pasta shape and add any extras you like.',
  food: [
    {
      category: 'Meal Deals',
      meals: [
        {
          id: 1,
          name: 'Pasta Power ✊',
          price: 17,
          info: 'Includes one garlic bread, one pasta and one soft drink.',
         // img: require('./1.png'),
        },
        {
          id: 2,
          name: 'Vegetariano 💚',
          price: 17,
          info: 'Includes one garlic bread, one vegetarian pasta and one soft drink',
         // img: require('./2.png'),
        },
        {
          id: 3,
          name: 'Vaps Date 💕',
          price: 40,
          info: 'Includes one garlic bread with or without cheese, choice of two pizzas, one bottle of wine or four bottles of Moretti',
        //  img: require('./3.png'),
        },
        {
          id: 4,
          name: "Livin' your best life 😎",
          price: 80,
          info: 'Includes two garlic breads with or without cheese, four pizzas, two bottles of wine or eight bottles of beer or a mix of both',
         // img: require('@/assets/data/4.png'),
        },
      ],
    }
  ],
};
