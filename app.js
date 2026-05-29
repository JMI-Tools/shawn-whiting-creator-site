const spots = [
  {
    name: "Two Scotts Barbecue",
    type: "BBQ",
    status: "Confirmed",
    tags: ["confirmed", "bbq"],
    address: "536 Leonard St NW, Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=85",
    order: "Burnt ends, brisket, smoked wings, ribs",
    note: "Public food-guide indexing references a @shawnsreview TikTok trying ribs, reuben, smoked wings, burnt ends, pulled pork, and brisket.",
    vibe: "Smokehouse heavyweight"
  },
  {
    name: "Two Beards Deli",
    type: "Deli",
    status: "Confirmed",
    tags: ["confirmed", "sandwich"],
    address: "38 Commerce Ave SW, Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85",
    order: "Stacked sandwiches, chips, daily soup",
    note: "Public social indexing surfaces a @shawnsreview post for Two Beards Deli, a downtown spot known for a huge sandwich lineup.",
    vibe: "Rockstar sandwich wall"
  },
  {
    name: "LongHorn Steakhouse",
    type: "Steak",
    status: "Confirmed",
    tags: ["confirmed", "heat"],
    address: "Restaurant chain listing",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85",
    order: "Steak, wings, loaded sides",
    note: "Social index pages show @shawnsreview content around LongHorn Steakhouse, giving the feed a national-chain heat check.",
    vibe: "Chain-spot verdict"
  },
  {
    name: "Sabor Mexicano",
    type: "Mexican",
    status: "Confirmed",
    tags: ["confirmed", "hitlist"],
    address: "YouTube video stop",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=85",
    order: "Tacos, saucy plates, bright salsa",
    note: "Shawn's public YouTube channel includes a video titled 'Trying Sabor Mexicano.'",
    vibe: "Color and salsa"
  },
  {
    name: "Dave's Hot Chicken",
    type: "Hot Chicken",
    status: "Confirmed",
    tags: ["confirmed", "heat"],
    address: "YouTube video stop",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=900&q=85",
    order: "Hot chicken slider and fries",
    note: "Shawn's public YouTube channel includes a video titled 'Trying Dave's Hot Chicken.'",
    vibe: "Heat-level theater"
  },
  {
    name: "Black Napkin",
    type: "Burgers",
    status: "Hit list",
    tags: ["hitlist", "sandwich"],
    address: "Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
    order: "Smash burger, fries, sauce",
    note: "A strong next-review candidate for punchy short-form visuals: stacked burger, fast bite, instant verdict.",
    vibe: "Smash burger voltage"
  },
  {
    name: "San Chez",
    type: "Tapas",
    status: "Hit list",
    tags: ["hitlist"],
    address: "Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=85",
    order: "Tapas flight and brunch plates",
    note: "A downtown Grand Rapids staple that gives a creator plenty of small-plate reactions in one shoot.",
    vibe: "Share-plate chaos"
  },
  {
    name: "Mexo",
    type: "Mexican",
    status: "Hit list",
    tags: ["hitlist"],
    address: "Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=900&q=85",
    order: "Tacos, mole, cocktails",
    note: "A polished visual target for color, plating, and creator reaction cuts.",
    vibe: "Bright plate energy"
  },
  {
    name: "Rise Bakery",
    type: "Bakery",
    status: "Hit list",
    tags: ["hitlist"],
    address: "Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85",
    order: "Pastries, cinnamon rolls, coffee",
    note: "A softer morning stop to balance the heavy food-run board with bakery closeups.",
    vibe: "Glaze and sunlight"
  },
  {
    name: "Ato Sushi",
    type: "Sushi",
    status: "Hit list",
    tags: ["hitlist"],
    address: "Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85",
    order: "Rolls, nigiri, miso",
    note: "A clean-cut review target: quick menu spread, chopstick pull, final bite rating.",
    vibe: "Sharp, clean, glossy"
  },
  {
    name: "Frosty Boy",
    type: "Dessert",
    status: "Hit list",
    tags: ["hitlist"],
    address: "Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85",
    order: "Soft serve, sundaes, shakes",
    note: "Dessert content gives the page a cold finish and a totally different visual texture.",
    vibe: "Late-night sweet stop"
  },
  {
    name: "The Old Goat",
    type: "Comfort Food",
    status: "Hit list",
    tags: ["hitlist"],
    address: "Grand Rapids, MI",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=85",
    order: "Comfort plates, brunch, burgers",
    note: "A broad-menu stop that could fit a 'what should I order?' creator format.",
    vibe: "Big table comfort"
  }
];

const bySelector = (selector, root = document) => root.querySelector(selector);
const allBySelector = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function setupCursorGlow() {
  const glow = bySelector(".cursor-glow");
  if (!glow) return;
  window.addEventListener("pointermove", (event) => {
    glow.style.setProperty("--x", `${event.clientX}px`);
    glow.style.setProperty("--y", `${event.clientY}px`);
  }, { passive: true });
}

function setupScrollMeter() {
  const meter = bySelector(".scroll-meter");
  if (!meter) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    meter.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupTiltCards() {
  allBySelector("[data-tilt], .spot-card, .video-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.setProperty("--tilt-x", `${y}deg`);
      card.style.setProperty("--tilt-y", `${x}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function setupSpotsApp() {
  const grid = bySelector("[data-spots-grid]");
  if (!grid) return;

  const buttons = allBySelector("[data-filter]");
  const search = bySelector("[data-search]");
  const count = bySelector("[data-count]");
  const modal = bySelector("[data-spot-modal]");
  const modalContent = bySelector("[data-modal-content]");
  const close = bySelector("[data-close-modal]");
  let filter = "all";

  const matches = (spot) => {
    const query = (search?.value || "").trim().toLowerCase();
    const filterMatch = filter === "all" || spot.tags.includes(filter);
    const text = `${spot.name} ${spot.type} ${spot.address} ${spot.order} ${spot.vibe}`.toLowerCase();
    return filterMatch && (!query || text.includes(query));
  };

  const render = () => {
    const visible = spots.filter(matches);
    grid.innerHTML = visible.map((spot, index) => `
      <button class="app-spot-card" data-spot="${spot.name}" data-tilt type="button" style="--delay:${index * 55}ms">
        <img src="${spot.image}" alt="${spot.name} food mood image">
        <span class="status-pill">${spot.status}</span>
        <div>
          <p class="label">${spot.type}</p>
          <h3>${spot.name}</h3>
          <p>${spot.vibe}</p>
          <small>${spot.order}</small>
        </div>
      </button>
    `).join("");
    if (count) count.textContent = String(visible.length);
    setupTiltCards();
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter || "all";
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });

  search?.addEventListener("input", render);

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-spot]");
    if (!card || !modal || !modalContent) return;
    const spot = spots.find((item) => item.name === card.dataset.spot);
    if (!spot) return;
    modalContent.innerHTML = `
      <div class="modal-grid">
        <img src="${spot.image}" alt="${spot.name} food mood image">
        <div>
          <p class="kicker">${spot.status} spot</p>
          <h2>${spot.name}</h2>
          <p>${spot.note}</p>
          <dl>
            <div><dt>Order angle</dt><dd>${spot.order}</dd></div>
            <div><dt>Address</dt><dd>${spot.address}</dd></div>
            <div><dt>Creator vibe</dt><dd>${spot.vibe}</dd></div>
          </dl>
        </div>
      </div>
    `;
    modal.showModal();
  });

  close?.addEventListener("click", () => modal?.close());
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  render();
}

setupCursorGlow();
setupScrollMeter();
setupTiltCards();
setupSpotsApp();
