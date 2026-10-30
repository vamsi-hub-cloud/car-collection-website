# Apex Garage — Car Collection Website
React 18 + Vite + Tailwind CSS + Framer Motion + React Router (HashRouter, so it deploys anywhere).

    npm install
    npm run dev      # development
    npm run build    # production build in /dist

Routes: / · /collection · /car/:id · /brands · /compare · /wishlist · /test-drive · /about · /contact · /faq
Wishlist and comparison persist in localStorage.

Photos: put photos (jpg, jpeg, png or webp) in public/cars (see public/cars/README.txt for file names). Missing photos fall back to vector art automatically.
Fonts (Sora, DM Sans) load from Google Fonts with system fallbacks.
