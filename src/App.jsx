import { useState } from 'react'
import './index.css'

// ─── DATA ────────────────────────────────────────────────────────────────────

const WEEKLY_SPECIALS = [
  { day: 'Mon', label: 'Trivia Night',      icon: '🧠', desc: 'Test your knowledge with the crew' },
  { day: 'Tue', label: 'Taco Tuesday',      icon: '🌮', desc: '3pm - 10pm · Happy Hour 3-5pm' },
  { day: 'Wed', label: '$1 Wings',          icon: '🍗', desc: 'Best deal on the lake, all night long' },
  { day: 'Thu', label: 'Thirsty Thursday',  icon: '🍔', desc: '$1 off burger baskets · Margaritas $4.50' },
  { day: 'Fri', label: 'Steak Night',       icon: '🥩', desc: '12oz NY Strip & 16oz Ribeye, Friday only' },
  { day: 'Sat', label: 'Karaoke',           icon: '🎤', desc: 'Sing your heart out - come early for a spot' },
]

const MENUS = {
  breakfast: {
    label: 'Breakfast',
    badge: 'Weekends 9am - 12pm',
    badgeColor: 'bg-amber-500',
    icon: '☀️',
    sections: [
      {
        title: 'Classic Breakfast',
        items: [
          { name: 'Locals Favorite',      price: '$12.49', desc: '2 eggs any style, choice of bacon or sausage, hash browns & toast' },
          { name: 'Country Breakfast',    price: '$13.49', desc: 'Biscuits smothered in sausage gravy with two eggs and hashbrowns' },
          { name: 'Steak & Eggs',         price: '$19.99', desc: '8 oz grilled sirloin, two eggs, hashbrowns, and toast' },
          { name: 'Breakfast Bowl',       price: '$11.99', desc: 'Hashbrowns loaded with scrambled eggs, sausage gravy, cheddar cheese, bacon bits, and green onions' },
          { name: 'Pancake Combo',        price: '$12.49', desc: 'Three pancakes, two eggs, and a choice of bacon or sausage' },
          { name: 'French Toast Platter', price: '$12.99', desc: 'Texas toast, French toast, two eggs, and a choice of bacon or sausage' },
        ],
      },
      {
        title: 'Omelets',
        note: 'Served with hashbrowns and toast',
        items: [
          { name: 'Meat Lovers Omelet', price: '$12.99', desc: 'Ham, bacon, sausage, and cheese' },
          { name: 'Farmers Omelet',     price: '$12.99', desc: 'Sausage, bacon, peppers, tomato, and cheese' },
          { name: 'Country Omelet',     price: '$13.99', desc: 'Sausage, bacon, peppers, tomato, and cheese, smothered in sausage gravy' },
        ],
      },
      {
        title: "Devil's Pick",
        items: [
          { name: 'Hangover Cure',        price: '$10.99', desc: 'Breakfast burrito loaded with eggs, hashbrowns, gravy, cheese, and bacon' },
          { name: 'Biscuits & Gravy',     price: '$9.99',  desc: '' },
          { name: 'Breakfast Sandwich',   price: '$6.49',  desc: 'Egg, cheese, and choice of bacon or sausage on an English muffin' },
          { name: 'Loaded Avocado Toast', price: '$12.99', desc: 'Avocado, bacon, and eggs, served on sourdough bread' },
        ],
      },
      {
        title: 'Sides',
        columns: true,
        items: [
          { name: 'Hashbrowns', price: '$3.49' },
          { name: 'Bacon',      price: '$3.49' },
          { name: 'Sausage',    price: '$3.49' },
          { name: 'Toast',      price: '$1.99' },
          { name: 'Pancake',    price: '$3.49' },
          { name: 'Egg',        price: '$1.99' },
        ],
      },
      {
        title: 'Drinks',
        columns: true,
        items: [
          { name: 'Coffee',       price: '$2.49' },
          { name: 'Orange Juice', price: '$1.99' },
          { name: 'Milk',         price: '$1.99' },
          { name: 'Iced Tea',     price: '$2.99' },
          { name: 'Fountain Pop', price: '$2.95' },
        ],
      },
    ],
    footer: 'Ask your server about daily drink & food specials',
  },

  tacos: {
    label: 'Taco Tuesday',
    badge: 'Every Tuesday 3pm - 10pm',
    badgeColor: 'bg-orange-500',
    icon: '🌮',
    special: 'House Devil\'s Lake Gold Margarita $4 · 16 oz Frozen Margarita $6 (add Raspberry, Strawberry, or Mango +$1) · Happy Hour 3-5pm',
    sections: [
      {
        title: 'Appetizers',
        items: [
          { name: 'Queso Dip',      price: '$6.00',  desc: 'Served with fresh house made chips' },
          { name: 'Salsa',          price: '$4.00',  desc: 'Mild or Hot, served with fresh house made chips' },
          { name: 'Guacamole',      price: '$3.50+', desc: '4 oz $3.50 · 8 oz $5.50, served with fresh house made chips' },
          { name: 'Loaded Nachos',  price: '$14.00', desc: 'House made chips, refried or black beans, shredded cheese, nacho cheese, lettuce, tomato, salsa, sour cream. Choice of beef, chicken, or smoked pulled pork (pork drizzled w/ BBQ sauce)' },
          { name: 'Quesadilla',     price: '$8+',    desc: 'Just cheese $8 · Meat & cheese $10 · Santa Fe Chicken Quesadilla (with Santa Fe salsa) $12' },
        ],
      },
      {
        title: 'Tacos',
        note: 'Corn or flour shell',
        items: [
          { name: 'Beef Taco',                     price: 'From $2.00', desc: 'Seasoned beef, lettuce, tomato, shredded cheese · 1 corn $2 / 3 corn $5.50 / 1 flour $2.25 / 3 flour $6.25' },
          { name: 'Chicken or Smoked Pulled Pork', price: 'From $2.50', desc: 'Corn or flour shell, lettuce, tomato, shredded cheese · 1 corn $2.50 / 3 corn $7 / 1 flour $2.75 / 3 flour $7.75' },
          { name: 'Chicken Bacon Ranch',            price: '$3.75 each', desc: 'Flour tortilla, tender chicken, thick cut bacon, shredded cheese, house made creamy ranch' },
          { name: 'Double Decker Beef',             price: 'From $4.00', desc: 'Flour shell spread with refried beans, layered with a corn shell, seasoned ground beef, lettuce, tomato, shredded cheese · 1 for $4 / 3 for $10' },
        ],
      },
      {
        title: 'Wraps & Plates',
        items: [
          { name: 'Wet Burrito',              price: 'From $10.00', desc: 'Large flour tortilla, rice, beans, shredded cheese, onion, smothered in enchilada sauce · Beef $10 / Chicken or Pork $12' },
          { name: 'Chicken or Steak Fajita',  price: 'From $10.00', desc: '2 fajitas stuffed with peppers and onions on flour shells, shredded cheese, served with rice and beans · Chicken $10 / Steak $13' },
          { name: 'Tostada Crunch Wrap',      price: '$8.00',       desc: 'Flour shell spread with refried beans, wrapped around a hard corn shell, seasoned beef, lettuce, shredded cheese' },
        ],
      },
      {
        title: 'Taco Salads',
        items: [
          { name: 'Seasoned Ground Beef Taco Salad', price: '$11.00', desc: 'Fresh house made tortilla chips, lettuce, seasoned ground beef, shredded cheese, Santa Fe salsa, sour cream, guacamole' },
          { name: 'Chicken Fajita Taco Salad',       price: '$13.00', desc: 'Fresh house made tortilla chips, lettuce, grilled chicken, grilled peppers & onions, tomatoes, shredded cheese, salsa, sour cream' },
        ],
      },
      {
        title: 'Sides',
        columns: true,
        items: [
          { name: 'Mexican Rice',  price: '$3.00' },
          { name: 'Refried Beans', price: '$3.00' },
          { name: 'Tea or Soda',   price: '$2.99' },
        ],
      },
      {
        title: 'Dessert',
        columns: true,
        items: [
          { name: 'Churros with Chocolate Sauce', price: '$5.99' },
        ],
      },
    ],
    footer: 'Ask your server about mocktails and drink specials. Bottled beer, draft beer, seltzers, hard cider, wine & cocktails available.',
  },

  steaks: {
    label: 'Steak Night',
    badge: 'Every Friday',
    badgeColor: 'bg-red-700',
    icon: '🥩',
    sections: [
      {
        title: 'Steaks',
        note: 'Choose any 2 sides with your steak',
        items: [
          { name: '16 oz. Ribeye', price: '$32', desc: 'Choose 2 sides' },
          { name: '12 oz. NY Strip', price: '$22', desc: 'Choose 2 sides' },
        ],
      },
      {
        title: 'Sides',
        columns: true,
        items: [
          { name: 'Broccoli',          price: '' },
          { name: 'Side Salad',        price: '' },
          { name: 'Brussel Sprouts',   price: '' },
          { name: 'Fries',             price: '' },
          { name: 'Baked Potato',      price: '' },
          { name: 'Onion Rings',       price: '' },
          { name: 'Waffle Fries',      price: '' },
          { name: 'Sweet Potato Fries', price: '' },
        ],
      },
      {
        title: 'Starters & Shareables',
        items: [
          { name: 'Cowboy Caviar',           price: '$7',  desc: 'Served with chips' },
          { name: 'Santa Fe Chicken Quesadilla', price: '$11', desc: '' },
          { name: 'Homemade Crust Pizza',    price: '$24', desc: 'See your server for flatbread options' },
        ],
      },
      {
        title: 'Dessert',
        columns: true,
        items: [
          { name: 'NY Style Cheesecake', price: '' },
          { name: 'Brownie Sunday',      price: '' },
          { name: 'Floats',              price: '' },
        ],
      },
    ],
    footer: 'Busch Apple, Red/White/Blue Shot, Frozen Patriotic Drink & more. Ask your server for tonight\'s drink specials.',
  },

  cocktails: {
    label: 'Cocktails',
    badge: 'Spring Drink Menu',
    badgeColor: 'bg-pink-600',
    icon: '🍹',
    sections: [
      {
        title: 'Signature Cocktails',
        items: [
          { name: 'Whiskey Lemon',        price: '', desc: 'Jack Honey, fresh lemon, honey, club soda' },
          { name: 'Peach Crush',          price: '', desc: 'Vodka, peach schnapps, Sprite, OJ' },
          { name: 'Pink Martini',         price: '', desc: 'Vodka, strawberry puree, lemon' },
          { name: 'Red Stag Half & Half', price: '', desc: 'Red Stag, iced tea, lemonade' },
          { name: 'Razzberry Ice Tea',    price: '', desc: 'Jameson, Razzmatazz raspberry liqueur, iced tea' },
        ],
      },
      {
        title: 'Flights',
        items: [
          { name: 'Margarita Flight',       price: '', desc: 'Frozen or on the rocks - Strawberry, Mango, Raspberry, Lime' },
          { name: 'Flavored Mojito Flight', price: '', desc: 'Strawberry, Mango, Raspberry, Original' },
        ],
      },
      {
        title: 'Bar Staples',
        columns: true,
        items: [
          { name: 'Draft Beer',    price: '' },
          { name: 'Bottled Beer',  price: '' },
          { name: 'Seltzers',      price: '' },
          { name: 'Hard Cider',    price: '' },
          { name: 'Wine',          price: '' },
          { name: 'Jello Shots',   price: '$2' },
        ],
      },
    ],
    footer: 'Menu rotates seasonally. Ask your server about tonight\'s specials and featured shots.',
  },
}

const LIVE_MUSIC = [
  { date: '2026-05-02', artist: 'Kevin Wolff',                          time: '6-9pm' },
  { date: '2026-05-09', artist: 'Ryan Groth',                           time: '6-9pm' },
  { date: '2026-05-29', artist: 'Jaded Soul',                           time: '8-11pm' },
  { date: '2026-06-03', artist: 'Ryan Groth',                           time: '6-9pm' },
  { date: '2026-06-12', artist: 'Braxton Garza',                        time: '8-11pm' },
  { date: '2026-06-13', artist: 'Joey D. & the Small Band Superstars',  time: 'TBD' },
  { date: '2026-07-11', artist: 'Greg Riordan',                         time: '6-9pm' },
  { date: '2026-07-12', artist: 'Greg Riordan',                         time: '11am-2pm' },
  { date: '2026-07-17', artist: 'Mediocre Mixtape',                     time: '8-11pm' },
  { date: '2026-07-24', artist: 'Dan Brickle & the Midwest Goodbye',    time: '7-10pm' },
  { date: '2026-08-15', artist: 'Bret Maynard',                         time: '6-9pm' },
  { date: '2026-08-22', artist: 'Johnny Lightning & the Storm Bandits', time: '7-11pm' },
  { date: '2026-08-29', artist: 'FLYTE',                                time: '8-11pm' },
  { date: '2026-09-05', artist: 'Joey D. & the Small Band Superstars',  time: 'TBD' },
]

const DAYS_SHORT  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmtDate(str) {
  const d = new Date(str + 'T12:00:00')
  return `${DAYS_SHORT[d.getDay()]} ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`
}

// ─── LOGO ────────────────────────────────────────────────────────────────────

function BrandLogo({ size = 80, className = '' }) {
  return (
    <img
      src="/dl_bargrill_logo.png"
      alt="Devils Lake Bar and Grill"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      className="bg-lake-dark/96 backdrop-blur border-b border-lake-navy">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <BrandLogo size={36} />
          <span className="text-lake-gold font-serif font-bold text-base tracking-wide hidden sm:block">
            Devils Lake Bar &amp; Grill
          </span>
        </div>
        <div className="flex gap-5 text-sm">
          {[['#specials','Specials'],['#menu','Menu'],['#music','Live Music'],['#find-us','Find Us']].map(([href, label]) => (
            <a key={href} href={href}
              className="text-lake-cream/70 hover:text-lake-gold transition-colors font-medium">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}>
      {/* Looping video background */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }}
        src="/devils-lake-bar-and-grill-hero.mp4"
      />

      {/* Dark gradient overlay so text pops */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(10,20,35,0.55) 0%, rgba(10,20,35,0.75) 60%, rgba(10,20,35,0.92) 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}
        className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 min-h-screen">

        <div className="mb-6 drop-shadow-2xl">
          <BrandLogo size={180} />
        </div>

        <p className="text-lake-chalk text-xs tracking-[0.4em] uppercase mb-3 opacity-70">
          Addison, Michigan · Devils Lake
        </p>
        <h1 className="text-lake-cream font-serif text-4xl md:text-6xl font-bold leading-tight mb-3 drop-shadow-lg">
          Living your <span className="text-lake-gold">best life</span>
        </h1>
        <p className="text-lake-cream/70 text-base md:text-lg max-w-sm mb-10">
          Great food, cold drinks, live music, and the best view in Lenawee County.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <a href="#menu"
            className="px-6 py-3 bg-lake-blue text-white rounded-lg font-semibold
              hover:bg-blue-600 transition-colors shadow-lg">
            See the Menu
          </a>
          <a href="#music"
            className="px-6 py-3 border border-white/30 text-white rounded-lg font-semibold
              hover:bg-white/10 transition-colors backdrop-blur-sm">
            Live Music Lineup
          </a>
        </div>

        <div className="flex flex-wrap gap-5 justify-center text-xs text-lake-cream/55">
          <span>📍 6365 US-223, Addison, MI</span>
          <span>📞 <a href="tel:5172525568" className="hover:text-lake-gold transition-colors">(517) 252-5568</a></span>
          <span>☀️ Weekend Breakfast 9am - 12pm</span>
          <span>21+ in bar &amp; patio after 11pm</span>
        </div>

        <div className="mt-14 text-white/30 text-xl animate-bounce">↓</div>
      </div>
    </section>
  )
}

// ─── WEEKLY SPECIALS ──────────────────────────────────────────────────────────

function WeeklySpecials() {
  const today = new Date().getDay() // 0=Sun
  const dayMap = { Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 }

  return (
    <section id="specials"
      style={{ background: '#111820' }}
      className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-lake-chalk text-xs tracking-[0.3em] uppercase font-semibold mb-2 opacity-60">Every Week</p>
          <h2 className="font-serif text-3xl text-lake-cream font-bold">Weekly Specials</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {WEEKLY_SPECIALS.map(({ day, label, icon, desc }) => {
            const isToday = dayMap[day] === today
            return (
              <div key={day}
                className={`rounded-xl p-4 text-center border transition-colors
                  ${isToday
                    ? 'bg-lake-blue border-lake-chalk/30 ring-1 ring-lake-gold'
                    : 'bg-lake-navy/40 border-lake-chalk/10 hover:bg-lake-navy/70'}`}>
                <div className="text-2xl mb-2">{icon}</div>
                <p className={`text-xs font-bold tracking-widest uppercase mb-1
                  ${isToday ? 'text-lake-gold' : 'text-lake-chalk/50'}`}>
                  {day}{isToday && ' · Today'}
                </p>
                <p className="text-lake-cream font-bold text-sm mb-1">{label}</p>
                <p className="text-lake-chalk/50 text-xs leading-snug">{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── MENU ─────────────────────────────────────────────────────────────────────

function MenuItem({ item }) {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex-1 min-w-0">
        <span className="font-bold text-lake-dark text-sm">{item.name}</span>
        {item.desc && <p className="text-lake-dark/55 text-xs mt-0.5 leading-snug">{item.desc}</p>}
      </div>
      {item.price && (
        <span className="text-lake-blue font-bold text-sm shrink-0">{item.price}</span>
      )}
    </div>
  )
}

function MenuSection({ section }) {
  if (section.columns) {
    return (
      <div>
        <h3 className="text-lake-blue font-bold text-xs tracking-[0.2em] uppercase mb-2
          pb-1 border-b border-lake-navy/20">{section.title}</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {section.items.map(item => (
            <div key={item.name} className="flex justify-between items-center">
              <span className="text-lake-dark font-medium text-sm">{item.name}</span>
              {item.price && <span className="text-lake-blue font-bold text-xs ml-1 shrink-0">{item.price}</span>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lake-blue font-bold text-xs tracking-[0.2em] uppercase mb-1
        pb-1 border-b border-lake-navy/20">{section.title}</h3>
      {section.note && <p className="text-lake-dark/45 text-xs italic mb-2">{section.note}</p>}
      <div className="space-y-3">
        {section.items.map(item => <MenuItem key={item.name} item={item} />)}
      </div>
    </div>
  )
}

const TAB_ORDER = ['breakfast', 'tacos', 'steaks', 'cocktails']

function Menu() {
  const [active, setActive] = useState('breakfast')
  const menu = MENUS[active]

  return (
    <section id="menu" className="py-20 bg-lake-cream">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-lake-blue text-xs tracking-[0.3em] uppercase font-semibold mb-2">Food &amp; Drinks</p>
          <h2 className="font-serif text-4xl text-lake-dark font-bold mb-2">The Menu</h2>
          <p className="text-lake-dark/50 text-sm">Ask your server about tonight's specials - the board changes often.</p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {TAB_ORDER.map(key => {
            const m = MENUS[key]
            const isActive = active === key
            return (
              <button key={key} onClick={() => setActive(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                  border transition-all
                  ${isActive
                    ? 'bg-lake-dark text-lake-cream border-lake-dark shadow-md'
                    : 'bg-white text-lake-dark/70 border-lake-navy/20 hover:border-lake-navy/50'}`}>
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            )
          })}
        </div>

        {/* Menu card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-lake-navy/10">
          {/* Card header */}
          <div className="bg-lake-dark px-6 py-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{menu.icon}</span>
              <span className="font-serif text-lake-cream text-xl font-bold">{menu.label}</span>
            </div>
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${menu.badgeColor}`}>
              {menu.badge}
            </span>
          </div>

          {/* Special callout */}
          {menu.special && (
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
              <p className="text-amber-800 text-xs font-semibold">
                ⭐ {menu.special}
              </p>
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Split sections between two columns */}
              {[
                menu.sections.slice(0, Math.ceil(menu.sections.length / 2)),
                menu.sections.slice(Math.ceil(menu.sections.length / 2)),
              ].map((col, ci) => (
                <div key={ci} className="space-y-7">
                  {col.map(s => <MenuSection key={s.title} section={s} />)}
                </div>
              ))}
            </div>
          </div>

          {menu.footer && (
            <div className="bg-lake-cream/60 border-t border-lake-navy/10 px-6 py-3">
              <p className="text-lake-dark/45 text-xs italic text-center">{menu.footer}</p>
            </div>
          )}
        </div>

        <p className="text-center text-lake-dark/35 text-xs mt-5">
          Menu items and pricing subject to change. More coming soon - full bar menu, burgers, and more.
        </p>
      </div>
    </section>
  )
}

// ─── LIVE MUSIC ───────────────────────────────────────────────────────────────

function LiveMusic() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = LIVE_MUSIC.filter(e => new Date(e.date + 'T12:00:00') >= today)
  const past     = LIVE_MUSIC.filter(e => new Date(e.date + 'T12:00:00') <  today)

  return (
    <section id="music"
      style={{ background: 'linear-gradient(180deg, #1a2d45 0%, #0d1b2a 100%)' }}
      className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lake-chalk text-xs tracking-[0.3em] uppercase font-semibold mb-2 opacity-60">Live Entertainment</p>
          <h2 className="font-serif text-4xl text-lake-cream font-bold mb-2">Live Music</h2>
          <p className="text-lake-cream/45 text-sm">Local bands, cold beer, warm Michigan nights</p>
        </div>

        {upcoming.length > 0 && (
          <div className="space-y-2.5 mb-10">
            {upcoming.map((show, i) => {
              const isNext = i === 0
              return (
                <div key={show.date}
                  className={`flex items-center gap-4 rounded-xl px-5 py-4 border transition-colors
                    ${isNext
                      ? 'bg-lake-blue border-lake-chalk/20'
                      : 'bg-lake-navy/50 border-lake-chalk/10 hover:bg-lake-navy/80'}`}>
                  {isNext && (
                    <span className="shrink-0 bg-lake-gold text-lake-dark text-xs font-bold px-2 py-0.5 rounded-full">
                      NEXT UP
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-lake-cream font-bold text-base truncate">{show.artist}</p>
                    <p className="text-lake-chalk/55 text-sm">{fmtDate(show.date)}</p>
                  </div>
                  <span className={`text-sm font-semibold shrink-0
                    ${show.time === 'TBD' ? 'text-lake-gold' : 'text-lake-chalk'}`}>
                    {show.time}
                  </span>
                  <span className="text-xl shrink-0">🎸</span>
                </div>
              )
            })}
          </div>
        )}

        {past.length > 0 && (
          <details className="group">
            <summary className="text-lake-chalk/35 text-sm text-center cursor-pointer
              hover:text-lake-chalk/60 transition-colors list-none mb-4">
              ↑ {past.length} past shows this season
            </summary>
            <div className="space-y-2">
              {[...past].reverse().map(show => (
                <div key={show.date}
                  className="flex items-center gap-4 rounded-xl px-5 py-3
                    bg-lake-navy/25 border border-lake-chalk/5 opacity-40">
                  <div className="flex-1 min-w-0">
                    <p className="text-lake-cream font-medium text-sm truncate">{show.artist}</p>
                    <p className="text-lake-chalk/50 text-xs">{fmtDate(show.date)}</p>
                  </div>
                  <span className="text-lake-chalk/40 text-xs shrink-0">{show.time}</span>
                </div>
              ))}
            </div>
          </details>
        )}

        <div className="mt-8 text-center">
          <p className="text-lake-chalk/35 text-xs">
            Follow us on{' '}
            <a href="https://www.facebook.com/Thecovedevilslake/"
              target="_blank" rel="noopener noreferrer"
              className="text-lake-chalk/60 hover:text-lake-gold transition-colors underline">
              Facebook
            </a>
            {' '}for the latest show updates and announcements.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── FIND US ──────────────────────────────────────────────────────────────────

function FindUs() {
  return (
    <section id="find-us" className="py-20 bg-lake-cream">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lake-blue text-xs tracking-[0.3em] uppercase font-semibold mb-2">Location</p>
          <h2 className="font-serif text-4xl text-lake-dark font-bold mb-2">Find Us</h2>
          <p className="text-lake-dark/45">Right on the water, right where you want to be</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-lake-navy/10 shadow-sm">
              <h3 className="font-bold text-lake-dark text-lg mb-4 font-serif">Contact &amp; Location</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lake-blue mt-0.5">📍</span>
                  <div>
                    <p className="font-semibold text-lake-dark">6365 US-223</p>
                    <p className="text-lake-dark/55">Addison, MI 49220</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lake-blue">📞</span>
                  <a href="tel:5172525568" className="text-lake-dark hover:text-lake-blue transition-colors font-semibold">
                    (517) 252-5568
                  </a>
                  <span className="text-lake-dark/40 text-xs">· Reservations welcome</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lake-blue mt-0.5">📘</span>
                  <a href="https://www.facebook.com/Thecovedevilslake/"
                    target="_blank" rel="noopener noreferrer"
                    className="text-lake-dark hover:text-lake-blue transition-colors text-sm">
                    facebook.com/Thecovedevilslake
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-lake-navy/10 shadow-sm">
              <h3 className="font-bold text-lake-dark text-lg mb-4 font-serif">Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-lake-dark/55">Weekend Breakfast</span>
                  <span className="font-semibold text-lake-dark">Sat &amp; Sun, 9am - 12pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lake-dark/55">Taco Tuesday</span>
                  <span className="font-semibold text-lake-dark">3pm - 10pm</span>
                </div>
                <div className="border-t border-lake-navy/10 pt-2 mt-2">
                  <p className="text-lake-dark/35 text-xs italic">
                    21+ in bar &amp; patio after 11pm. We check ID. Bar hours vary - call ahead to confirm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Drone photo with directions overlay */}
            <a href="https://maps.google.com/?q=6365+US-223+Addison+MI+49220"
              target="_blank" rel="noopener noreferrer"
              className="relative block rounded-2xl overflow-hidden group h-52">
              <img
                src="/Devils-lake-bar-grill.jpg"
                alt="Devils Lake Bar and Grill aerial view"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-lake-dark/50 group-hover:bg-lake-dark/40 transition-colors
                flex flex-col items-center justify-center">
                <span className="text-4xl mb-2 drop-shadow">📍</span>
                <p className="text-white font-bold text-base drop-shadow">Get Directions</p>
                <p className="text-white/60 text-xs mt-1">6365 US-223, Addison MI</p>
              </div>
            </a>

            <a href="https://manitoubeachmichigan.com"
              target="_blank" rel="noopener noreferrer"
              className="block bg-lake-dark rounded-2xl p-5 border border-lake-chalk/10
                hover:border-lake-gold/40 transition-colors group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏖️</span>
                <div className="flex-1">
                  <p className="text-lake-cream font-bold text-sm group-hover:text-lake-gold transition-colors">
                    Explore Manitou Beach
                  </p>
                  <p className="text-lake-chalk/45 text-xs mt-0.5">
                    Events, food trucks, businesses &amp; more around Devils Lake
                  </p>
                </div>
                <span className="text-lake-chalk/30 group-hover:text-lake-gold transition-colors">→</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-lake-dark py-10 border-t border-lake-navy">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <BrandLogo size={64} />
        </div>
        <p className="font-serif text-lake-gold font-bold text-lg mb-1">Devils Lake Bar &amp; Grill</p>
        <p className="text-lake-chalk/35 text-xs mb-1">6365 US-223, Addison, MI 49220</p>
        <p className="text-lake-chalk/35 text-xs mb-5">
          <a href="tel:5172525568" className="hover:text-lake-chalk transition-colors">(517) 252-5568</a>
        </p>
        <div className="flex justify-center gap-6 text-xs text-lake-chalk/30">
          <a href="https://www.facebook.com/Thecovedevilslake/"
            target="_blank" rel="noopener noreferrer"
            className="hover:text-lake-chalk transition-colors">Facebook</a>
          <a href="https://manitoubeachmichigan.com"
            target="_blank" rel="noopener noreferrer"
            className="hover:text-lake-chalk transition-colors">Manitou Beach Community</a>
        </div>
        <p className="text-lake-chalk/20 text-xs mt-5">
          &copy; {new Date().getFullYear()} Devils Lake Bar &amp; Grill &middot; Living your best life
        </p>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <WeeklySpecials />
      <Menu />
      <LiveMusic />
      <FindUs />
      <Footer />
    </div>
  )
}
