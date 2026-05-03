# Bahri Blueprint Navigator

Prototype interattivo per navigare una blueprint Bahri come un viaggio nautico: BU → capability → as-is → improvement opportunity.

## Run locally

```bash
cd /home/ubuntu/Bahri_visuals
python3 -m http.server 4173
```

Open:

- http://127.0.0.1:4173

## Features

- Rotte BU navigabili
- Capability beacons cliccabili
- Layer toggle: As-Is / Opportunities / Holograms
- Reset center
- Previous / Next capability
- Corporate maritime styling aligned with Bahri

## Notes

- No build step required
- Static app, everything is self-contained in `index.html`, `styles.css`, and `app.js`
