export const DEFAULT_MENU = {
  breakfast: {
    'Classic Breakfast': [
      { name: 'Locals Favorite',      price: '$12.49', desc: '2 eggs any style, choice of bacon or sausage, hash browns & toast', active: true },
      { name: 'Country Breakfast',    price: '$13.49', desc: 'Biscuits smothered in sausage gravy with two eggs and hashbrowns', active: true },
      { name: 'Steak & Eggs',         price: '$19.99', desc: '8 oz grilled sirloin, two eggs, hashbrowns, and toast', active: true },
      { name: 'Breakfast Bowl',       price: '$11.99', desc: 'Hashbrowns loaded with scrambled eggs, sausage gravy, cheddar cheese, bacon bits, and green onions', active: true },
      { name: 'Pancake Combo',        price: '$12.49', desc: 'Three pancakes, two eggs, and a choice of bacon or sausage', active: true },
      { name: 'French Toast Platter', price: '$12.99', desc: 'Texas toast, French toast, two eggs, and a choice of bacon or sausage', active: true },
    ],
    'Omelets': [
      { name: 'Meat Lovers Omelet', price: '$12.99', desc: 'Ham, bacon, sausage, and cheese. Served with hashbrowns and toast', active: true },
      { name: 'Farmers Omelet',     price: '$12.99', desc: 'Sausage, bacon, peppers, tomato, and cheese. Served with hashbrowns and toast', active: true },
      { name: 'Country Omelet',     price: '$13.99', desc: 'Sausage, bacon, peppers, tomato, cheese, smothered in sausage gravy. Served with hashbrowns and toast', active: true },
    ],
    "Devil's Pick": [
      { name: 'Hangover Cure',        price: '$10.99', desc: 'Breakfast burrito loaded with eggs, hashbrowns, gravy, cheese, and bacon', active: true },
      { name: 'Biscuits & Gravy',     price: '$9.99',  desc: '', active: true },
      { name: 'Breakfast Sandwich',   price: '$6.49',  desc: 'Egg, cheese, and choice of bacon or sausage on an English muffin', active: true },
      { name: 'Loaded Avocado Toast', price: '$12.99', desc: 'Avocado, bacon, and eggs, served on sourdough bread', active: true },
    ],
    'Sides': [
      { name: 'Hashbrowns', price: '$3.49', desc: '', active: true },
      { name: 'Bacon',      price: '$3.49', desc: '', active: true },
      { name: 'Sausage',    price: '$3.49', desc: '', active: true },
      { name: 'Toast',      price: '$1.99', desc: '', active: true },
      { name: 'Pancake',    price: '$3.49', desc: '', active: true },
      { name: 'Egg',        price: '$1.99', desc: '', active: true },
    ],
    'Drinks': [
      { name: 'Coffee',       price: '$2.49', desc: '', active: true },
      { name: 'Orange Juice', price: '$1.99', desc: '', active: true },
      { name: 'Milk',         price: '$1.99', desc: '', active: true },
      { name: 'Iced Tea',     price: '$2.99', desc: '', active: true },
      { name: 'Fountain Pop', price: '$2.95', desc: '', active: true },
    ],
  },
  tacos: {
    'Appetizers': [
      { name: 'Queso Dip',     price: '$6.00',  desc: 'Served with fresh house made chips', active: true },
      { name: 'Salsa',         price: '$4.00',  desc: 'Mild or Hot, served with fresh house made chips', active: true },
      { name: 'Guacamole',     price: '$3.50+', desc: '4 oz $3.50 / 8 oz $5.50, served with fresh house made chips', active: true },
      { name: 'Loaded Nachos', price: '$14.00', desc: 'House made chips, refried or black beans, shredded cheese, nacho cheese, lettuce, tomato, salsa, sour cream. Choice of beef, chicken, or smoked pulled pork', active: true },
      { name: 'Quesadilla',    price: '$8+',    desc: 'Just cheese $8 / Meat & cheese $10 / Santa Fe Chicken Quesadilla $12', active: true },
    ],
    'Tacos': [
      { name: 'Beef Taco',                     price: 'From $2.00', desc: 'Seasoned beef, lettuce, tomato, shredded cheese. 1 corn $2 / 3 corn $5.50 / 1 flour $2.25 / 3 flour $6.25', active: true },
      { name: 'Chicken or Smoked Pulled Pork', price: 'From $2.50', desc: '1 corn $2.50 / 3 corn $7 / 1 flour $2.75 / 3 flour $7.75', active: true },
      { name: 'Chicken Bacon Ranch',           price: '$3.75 each', desc: 'Flour tortilla, tender chicken, thick cut bacon, shredded cheese, house made creamy ranch', active: true },
      { name: 'Double Decker Beef',            price: 'From $4.00', desc: 'Flour shell spread with refried beans, layered with a corn shell, seasoned ground beef, lettuce, tomato, shredded cheese. 1 for $4 / 3 for $10', active: true },
    ],
    'Wraps & Plates': [
      { name: 'Wet Burrito',             price: 'From $10.00', desc: 'Large flour tortilla, rice, beans, shredded cheese, onion, smothered in enchilada sauce. Beef $10 / Chicken or Pork $12', active: true },
      { name: 'Chicken or Steak Fajita', price: 'From $10.00', desc: '2 fajitas stuffed with peppers and onions, shredded cheese, served with rice and beans. Chicken $10 / Steak $13', active: true },
      { name: 'Tostada Crunch Wrap',     price: '$8.00',       desc: 'Flour shell spread with refried beans, wrapped around a hard corn shell, seasoned beef, lettuce, shredded cheese', active: true },
    ],
    'Taco Salads': [
      { name: 'Seasoned Ground Beef Taco Salad', price: '$11.00', desc: 'Fresh house made tortilla chips, lettuce, seasoned ground beef, shredded cheese, Santa Fe salsa, sour cream, guacamole', active: true },
      { name: 'Chicken Fajita Taco Salad',       price: '$13.00', desc: 'Fresh house made tortilla chips, lettuce, grilled chicken, grilled peppers & onions, tomatoes, shredded cheese, salsa, sour cream', active: true },
    ],
    'Sides': [
      { name: 'Mexican Rice',  price: '$3.00', desc: '', active: true },
      { name: 'Refried Beans', price: '$3.00', desc: '', active: true },
      { name: 'Tea or Soda',   price: '$2.99', desc: '', active: true },
    ],
    'Dessert': [
      { name: 'Churros with Chocolate Sauce', price: '$5.99', desc: '', active: true },
    ],
  },
  steaks: {
    'Steaks': [
      { name: '16 oz. Ribeye',  price: '$32', desc: 'Choose 2 sides', active: true },
      { name: '12 oz. NY Strip', price: '$22', desc: 'Choose 2 sides', active: true },
    ],
    'Sides': [
      { name: 'Broccoli',           price: '', desc: '', active: true },
      { name: 'Side Salad',         price: '', desc: '', active: true },
      { name: 'Brussel Sprouts',    price: '', desc: '', active: true },
      { name: 'Fries',              price: '', desc: '', active: true },
      { name: 'Baked Potato',       price: '', desc: '', active: true },
      { name: 'Onion Rings',        price: '', desc: '', active: true },
      { name: 'Waffle Fries',       price: '', desc: '', active: true },
      { name: 'Sweet Potato Fries', price: '', desc: '', active: true },
    ],
    'Starters & Shareables': [
      { name: 'Cowboy Caviar',              price: '$7',  desc: 'Served with chips', active: true },
      { name: 'Santa Fe Chicken Quesadilla', price: '$11', desc: '', active: true },
      { name: 'Homemade Crust Pizza',        price: '$24', desc: 'See your server for flatbread options', active: true },
    ],
    'Dessert': [
      { name: 'NY Style Cheesecake', price: '', desc: '', active: true },
      { name: 'Brownie Sunday',      price: '', desc: '', active: true },
      { name: 'Floats',              price: '', desc: '', active: true },
    ],
  },
  cocktails: {
    'Signature Cocktails': [
      { name: 'Whiskey Lemon',        price: '', desc: 'Jack Honey, fresh lemon, honey, club soda', active: true },
      { name: 'Peach Crush',          price: '', desc: 'Vodka, peach schnapps, Sprite, OJ', active: true },
      { name: 'Pink Martini',         price: '', desc: 'Vodka, strawberry puree, lemon', active: true },
      { name: 'Red Stag Half & Half', price: '', desc: 'Red Stag, iced tea, lemonade', active: true },
      { name: 'Razzberry Ice Tea',    price: '', desc: 'Jameson, Razzmatazz raspberry liqueur, iced tea', active: true },
    ],
    'Flights': [
      { name: 'Margarita Flight',       price: '', desc: 'Frozen or on the rocks - Strawberry, Mango, Raspberry, Lime', active: true },
      { name: 'Flavored Mojito Flight', price: '', desc: 'Strawberry, Mango, Raspberry, Original', active: true },
    ],
    'Bar Staples': [
      { name: 'Draft Beer',   price: '',   desc: '', active: true },
      { name: 'Bottled Beer', price: '',   desc: '', active: true },
      { name: 'Seltzers',     price: '',   desc: '', active: true },
      { name: 'Hard Cider',   price: '',   desc: '', active: true },
      { name: 'Wine',         price: '',   desc: '', active: true },
      { name: 'Jello Shots',  price: '$2', desc: '', active: true },
    ],
  },
}

export const DEFAULT_EVENTS = [
  { id: '1', date: '2026-07-11', artist: 'Greg Riordan',                         time: '6-9pm',    active: true },
  { id: '2', date: '2026-07-12', artist: 'Greg Riordan',                         time: '11am-2pm', active: true },
  { id: '3', date: '2026-07-17', artist: 'Mediocre Mixtape',                     time: '8-11pm',   active: true },
  { id: '4', date: '2026-07-24', artist: 'Dan Brickle & the Midwest Goodbye',    time: '7-10pm',   active: true },
  { id: '5', date: '2026-08-15', artist: 'Bret Maynard',                         time: '6-9pm',    active: true },
  { id: '6', date: '2026-08-22', artist: 'Johnny Lightning & the Storm Bandits', time: '7-11pm',   active: true },
  { id: '7', date: '2026-08-29', artist: 'FLYTE',                                time: '8-11pm',   active: true },
  { id: '8', date: '2026-09-05', artist: 'Joey D. & the Small Band Superstars',  time: 'TBD',      active: true },
]

export const DEFAULT_SPECIALS = [
  { day: 'Mon', label: 'Trivia Night',     icon: '🧠', desc: 'Test your knowledge with the crew' },
  { day: 'Tue', label: 'Taco Tuesday',     icon: '🌮', desc: '3pm - 10pm · Happy Hour 3-5pm' },
  { day: 'Wed', label: '$1 Wings',         icon: '🍗', desc: 'Best deal on the lake, all night long' },
  { day: 'Thu', label: 'Thirsty Thursday', icon: '🍔', desc: '$1 off burger baskets · Margaritas $4.50' },
  { day: 'Fri', label: 'Steak Night',      icon: '🥩', desc: '12oz NY Strip & 16oz Ribeye, Friday only' },
  { day: 'Sat', label: 'Karaoke',          icon: '🎤', desc: 'Sing your heart out - come early for a spot' },
]
