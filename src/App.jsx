import { useState } from 'react'
import './index.css'

// ─── DATA ────────────────────────────────────────────────────────────────────

const BREAKFAST_MENU = {
  note: 'Served Weekends 9am - 12pm',
  sections: [
    {
      title: 'Classic Breakfast',
      items: [
        { name: 'Locals Favorite',    price: '$12.49', desc: '2 eggs any style, choice of bacon or sausage, hash browns, & toast' },
        { name: 'Country Breakfast',  price: '$13.49', desc: 'Biscuits smothered in sausage gravy with two eggs and hashbrowns' },
        { name: 'Steak & Eggs',       price: '$19.99', desc: '8 oz grilled sirloin, two eggs, hashbrowns, and toast' },
        { name: 'Breakfast Bowl',     price: '$11.99', desc: 'Hashbrowns loaded with scrambled eggs, sausage gravy, cheddar cheese, bacon bits, and green onions' },
        { name: 'Pancake Combo',      price: '$12.49', desc: 'Three pancakes, two eggs, and a choice of bacon or sausage' },
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
        { name: 'Hangover Cure',         price: '$10.99', desc: 'Breakfast burrito loaded with eggs, hashbrowns, gravy, cheese, and bacon' },
        { name: 'Biscuits & Gravy',      price: '$9.99',  desc: '' },
        { name: 'Breakfast Sandwich',    price: '$6.49',  desc: 'Egg, cheese, and choice of bacon or sausage on an English muffin' },
        { name: 'Loaded Avocado Toast',  price: '$12.99', desc: 'Avocado, bacon, and eggs, served on sourdough bread' },
      ],
    },
    {
      title: 'Sides',
      columns: true,
      items: [
        { name: 'Hashbrowns', price: '$3.49', desc: '' },
        { name: 'Bacon',      price: '$3.49', desc: '' },
        { name: 'Sausage',    price: '$3.49', desc: '' },
        { name: 'Toast',      price: '$1.99', desc: '' },
        { name: 'Pancake',    price: '$3.49', desc: '' },
        { name: 'Egg',        price: '$1.99', desc: '' },
      ],
    },
    {
      title: 'Drinks',
      columns: true,
      items: [
        { name: 'Coffee',       price: '$2.49', desc: '' },
        { name: 'Orange Juice', price: '$1.99', desc: '' },
        { name: 'Milk',         price: '$1.99', desc: '' },
        { name: 'Iced Tea',     price: '$2.99', desc: '' },
        { name: 'Fountain Pop', price: '$2.95', desc: '' },
      ],
    },
  ],
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

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return `${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      className="bg-lake-dark/95 backdrop-blur border-b border-lake-navy">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="text-lake-gold font-serif font-bold text-lg tracking-wide">
          Devils Lake Bar &amp; Grill
        </span>
        <div className="flex gap-6 text-sm">
          {[['#menu','Menu'],['#music','Live Music'],['#find-us','Find Us']].map(([href, label]) => (
            <a key={href} href={href}
              className="text-lake-cream/80 hover:text-lake-gold transition-colors font-medium">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-14"
      style={{ background: 'linear-gradient(160deg, #0d1b2a 0%, #1a2d45 60%, #0f2238 100%)' }}>
      {/* Water ripple rings */}
      <div className="relative mb-8">
        {[0,1,2].map(i => (
          <div key={i} className="absolute rounded-full border border-lake-chalk/10"
            style={{
              width: 120 + i * 80, height: 120 + i * 80,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
        ))}
        <div className="relative z-10 w-24 h-24 rounded-full bg-lake-blue/20 border-2 border-lake-chalk/30
          flex items-center justify-center">
          <span className="text-4xl">🍺</span>
        </div>
      </div>

      <p className="text-lake-chalk text-sm tracking-[0.3em] uppercase mb-2">Devils Lake, Michigan</p>
      <h1 className="text-lake-cream font-serif text-5xl md:text-7xl font-bold leading-tight mb-4">
        Devils Lake<br />
        <span className="text-lake-gold">Bar &amp; Grill</span>
      </h1>
      <p className="text-lake-cream/70 text-lg md:text-xl max-w-md mb-10">
        Your lakeside spot for good food, cold drinks, and live music all summer long.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <a href="#menu"
          className="px-6 py-3 bg-lake-blue text-white rounded-lg font-semibold hover:bg-lake-blue/80 transition-colors">
          See the Menu
        </a>
        <a href="#music"
          className="px-6 py-3 border border-lake-chalk/40 text-lake-chalk rounded-lg font-semibold hover:bg-lake-navy transition-colors">
          Live Music Lineup
        </a>
      </div>

      {/* Quick info strip */}
      <div className="flex flex-wrap gap-6 justify-center text-sm text-lake-cream/60">
        <span>📍 Devils Lake, MI</span>
        <span>☕ Weekend Breakfast 9am - 12pm</span>
        <span>🎵 Live Music All Summer</span>
        <span>📞 <a href="tel:5174035953" className="hover:text-lake-gold transition-colors">517-403-5953</a></span>
      </div>

      <div className="mt-16 animate-bounce text-lake-chalk/40 text-2xl">↓</div>
    </section>
  )
}

function MenuSection({ section }) {
  if (section.columns) {
    return (
      <div>
        <h3 className="text-lake-blue font-bold text-sm tracking-[0.2em] uppercase mb-3
          pb-1 border-b border-lake-navy/30">
          {section.title}
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {section.items.map(item => (
            <div key={item.name} className="flex justify-between items-center">
              <span className="text-lake-dark font-medium text-sm">{item.name}</span>
              <span className="text-lake-blue font-bold text-sm ml-2 shrink-0">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lake-blue font-bold text-sm tracking-[0.2em] uppercase mb-1
        pb-1 border-b border-lake-navy/30">
        {section.title}
      </h3>
      {section.note && (
        <p className="text-lake-dark/50 text-xs italic mb-3">{section.note}</p>
      )}
      <div className="space-y-3">
        {section.items.map(item => (
          <div key={item.name} className="flex justify-between gap-2">
            <div className="flex-1 min-w-0">
              <span className="font-bold text-lake-dark text-sm">{item.name}</span>
              {item.desc && <p className="text-lake-dark/60 text-xs mt-0.5 leading-snug">{item.desc}</p>}
            </div>
            <span className="text-lake-blue font-bold text-sm shrink-0">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Menu() {
  return (
    <section id="menu" className="py-20 bg-lake-cream">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lake-blue text-sm tracking-[0.3em] uppercase font-semibold mb-2">Food</p>
          <h2 className="font-serif text-4xl text-lake-dark font-bold mb-3">The Menu</h2>
          <div className="inline-flex items-center gap-2 bg-lake-blue text-white text-sm px-4 py-2 rounded-full font-semibold">
            ☀️ Breakfast served weekends 9am - 12pm
          </div>
          <p className="text-lake-dark/50 text-sm mt-3 italic">
            Ask your server about daily drink &amp; food specials
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-lake-navy/10">
          {/* Menu header */}
          <div className="bg-lake-dark px-6 py-4 flex items-center justify-between">
            <span className="font-serif text-lake-cream text-xl font-bold">Breakfast Menu</span>
            <span className="text-lake-chalk/60 text-sm">Weekends 9 - 12</span>
          </div>

          <div className="p-6 md:p-8">
            {/* Two-column layout for desktop */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="space-y-8">
                <MenuSection section={BREAKFAST_MENU.sections[0]} />
                <MenuSection section={BREAKFAST_MENU.sections[3]} />
              </div>
              {/* Right column */}
              <div className="space-y-8">
                <MenuSection section={BREAKFAST_MENU.sections[1]} />
                <MenuSection section={BREAKFAST_MENU.sections[2]} />
                <MenuSection section={BREAKFAST_MENU.sections[4]} />
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-lake-dark/40 text-xs mt-6">
          Menu and pricing subject to change. More menu items coming soon.
        </p>
      </div>
    </section>
  )
}

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
          <p className="text-lake-chalk text-sm tracking-[0.3em] uppercase font-semibold mb-2">Events</p>
          <h2 className="font-serif text-4xl text-lake-cream font-bold mb-3">Live Music Lineup</h2>
          <p className="text-lake-cream/50 text-sm">Local bands, cold beer, warm nights on the lake</p>
        </div>

        {upcoming.length > 0 && (
          <div className="space-y-3 mb-10">
            {upcoming.map((show, i) => {
              const isNext = i === 0
              return (
                <div key={show.date}
                  className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-colors
                    ${isNext
                      ? 'bg-lake-blue border border-lake-chalk/20'
                      : 'bg-lake-navy/60 border border-lake-chalk/10 hover:bg-lake-navy/80'}`}>
                  {isNext && (
                    <span className="shrink-0 bg-lake-gold text-lake-dark text-xs font-bold px-2 py-0.5 rounded-full">
                      NEXT UP
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-lake-cream font-bold text-base truncate">{show.artist}</p>
                    <p className="text-lake-chalk/60 text-sm">{formatDate(show.date)}</p>
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
            <summary className="text-lake-chalk/40 text-sm text-center cursor-pointer hover:text-lake-chalk/70 transition-colors list-none mb-4">
              ↑ {past.length} past shows this season
            </summary>
            <div className="space-y-2">
              {[...past].reverse().map(show => (
                <div key={show.date}
                  className="flex items-center gap-4 rounded-xl px-5 py-3 bg-lake-navy/30 border border-lake-chalk/5 opacity-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-lake-cream font-medium text-sm truncate">{show.artist}</p>
                    <p className="text-lake-chalk/50 text-xs">{formatDate(show.date)}</p>
                  </div>
                  <span className="text-lake-chalk/40 text-xs shrink-0">{show.time}</span>
                </div>
              ))}
            </div>
          </details>
        )}

        <div className="mt-8 text-center">
          <p className="text-lake-chalk/40 text-xs">
            Follow us on{' '}
            <a href="https://www.facebook.com/Thecovedevilslake/"
              target="_blank" rel="noopener noreferrer"
              className="text-lake-chalk/70 hover:text-lake-gold transition-colors underline">
              Facebook
            </a>
            {' '}for the latest updates and show announcements.
          </p>
        </div>
      </div>
    </section>
  )
}

function FindUs() {
  return (
    <section id="find-us" className="py-20 bg-lake-cream">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lake-blue text-sm tracking-[0.3em] uppercase font-semibold mb-2">Location</p>
          <h2 className="font-serif text-4xl text-lake-dark font-bold mb-3">Find Us</h2>
          <p className="text-lake-dark/50">Right on the lake, right where you want to be</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-lake-navy/10 shadow-sm">
              <h3 className="font-bold text-lake-dark text-lg mb-4 font-serif">Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lake-blue text-base mt-0.5">📍</span>
                  <div>
                    <p className="font-semibold text-lake-dark">Devils Lake, Michigan</p>
                    <p className="text-lake-dark/50">Lenawee County</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lake-blue text-base">📞</span>
                  <a href="tel:5174035953" className="text-lake-dark hover:text-lake-blue transition-colors font-semibold">
                    517-403-5953
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lake-blue text-base mt-0.5">📘</span>
                  <a href="https://www.facebook.com/Thecovedevilslake/"
                    target="_blank" rel="noopener noreferrer"
                    className="text-lake-dark hover:text-lake-blue transition-colors">
                    facebook.com/Thecovedevilslake
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-lake-navy/10 shadow-sm">
              <h3 className="font-bold text-lake-dark text-lg mb-4 font-serif">Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-lake-dark/60">Weekend Breakfast</span>
                  <span className="font-semibold text-lake-dark">Sat & Sun, 9am - 12pm</span>
                </div>
                <div className="border-t border-lake-navy/10 pt-2 mt-2">
                  <p className="text-lake-dark/40 text-xs italic">
                    Ask your server about daily specials. Bar hours vary by season.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Directions + MB link */}
          <div className="space-y-4">
            <a href="https://maps.google.com/?q=Devils+Lake+Bar+Grill+Manitou+Beach+Michigan"
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-2xl h-48
                bg-lake-navy border border-lake-chalk/10 hover:border-lake-chalk/30 transition-colors group">
              <span className="text-5xl mb-3">📍</span>
              <p className="text-lake-cream font-bold group-hover:text-lake-gold transition-colors">Get Directions</p>
              <p className="text-lake-chalk/40 text-xs mt-1">Opens Google Maps</p>
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
                  <p className="text-lake-chalk/50 text-xs mt-0.5">
                    Events, food trucks, local businesses & more around the lake
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

function Footer() {
  return (
    <footer className="bg-lake-dark py-8 border-t border-lake-navy">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="font-serif text-lake-gold font-bold text-lg mb-1">Devils Lake Bar &amp; Grill</p>
        <p className="text-lake-chalk/40 text-xs mb-4">Devils Lake, Michigan</p>
        <div className="flex justify-center gap-6 text-xs text-lake-chalk/30">
          <a href="https://www.facebook.com/Thecovedevilslake/"
            target="_blank" rel="noopener noreferrer"
            className="hover:text-lake-chalk transition-colors">Facebook</a>
          <a href="https://manitoubeachmichigan.com"
            target="_blank" rel="noopener noreferrer"
            className="hover:text-lake-chalk transition-colors">Manitou Beach Community</a>
        </div>
        <p className="text-lake-chalk/20 text-xs mt-4">
          &copy; {new Date().getFullYear()} Devils Lake Bar &amp; Grill
        </p>
      </div>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav />
      <div style={{ paddingTop: 0 }}>
        <Hero />
        <Menu />
        <LiveMusic />
        <FindUs />
        <Footer />
      </div>
    </div>
  )
}
