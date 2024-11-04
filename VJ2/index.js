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
    const { narudzba, prezime, adresa, broj_telefona } = req.body;

    if (!prezime || !adresa || !broj_telefona) {
      return res.json({ message: 'Niste poslali sve potrebne podatke za dostavu.' });
    }

    let nedostajucePizze = [];
    let ukupnaCijena = 0;

    narudzba.forEach((stavka) => {
      const pizza = pizze.find(p => p.naziv === stavka.pizza);
      if (!pizza) {
        nedostajucePizze.push(stavka.pizza);
      } else {
        ukupnaCijena += pizza.cijena * stavka.kolicina;
      }
    });
  
    if (nedostajucePizze.length > 0) {
      return res.json({ message: `Pizza ${nedostajucePizze.join(", ")} ne postoji u jelovniku.` });
    }
    
    narudzbe.push({ narudzba, prezime, adresa, broj_telefona, ukupnaCijena });
    res.json({
      message: `Narudžba za ${narudzba.map(p => `${p.pizza} (${p.velicina})`).join(" i ")} je uspješno zaprimljena!`,
      prezime,
      adresa,
      ukupnaCijena
    });
  });
  