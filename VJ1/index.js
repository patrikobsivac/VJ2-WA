const express = require('express');
const app = express();
app.use(express.json());

const pizze = [
  { id: 1, naziv: 'Margherita', cijena: 6.5 },
  { id: 2, naziv: 'Capricciosa', cijena: 8.0 },
  { id: 3, naziv: 'Quattro formaggi', cijena: 10.0 },
  { id: 4, naziv: 'Šunka sir', cijena: 7.0 },
  { id: 5, naziv: 'Vegetariana', cijena: 9.0 }
];

let narudzbe = [];

app.post('/naruci', (req, res) => {
  const narudzba = req.body;
  let nedostajucePizze = [];

  narudzba.forEach((stavka) => {
    const pizza = pizze.find(p => p.naziv === stavka.pizza);
    if (!pizza) {
      nedostajucePizze.push(stavka.pizza);
    }
  });

  if (nedostajucePizze.length > 0) {
    return res.json({ message: `Pizza ${nedostajucePizze.join(", ")} ne postoji u jelovniku.` });
  }

  narudzbe.push(narudzba);
  res.json({ message: 'Narudžba je uspješno zaprimljena!' });
});

app.listen(3000, () => console.log('Server sluša na port 3000'));
