import express from 'express';
const router = express.Router();

let narudzbe = [
    { id: 1, pizza: 'Capricciosa', velicina: 'jumbo', kolicina: 1 },
    { id: 2, pizza: 'Vegetariana', velicina: 'srednja', kolicina: 2 }
];

router.get('/', (req, res) => {
    res.status(200).json(narudzbe);
});

router.get('/:id', (req, res) => {
    const narudzba = narudzbe.find(n => n.id == req.params.id);
    if (narudzba) {
        res.status(200).json(narudzba);
    } else {
        res.status(404).json({ poruka: 'Narudžba nije pronađena' });
    }
});

router.post('/', (req, res) => {
    const { pizza, velicina, kolicina } = req.body;
    if (pizza && velicina && kolicina) {
        const novaNarudzba = { id: narudzbe.length + 1, pizza, velicina, kolicina };
        narudzbe.push(novaNarudzba);
        res.status(201).json(novaNarudzba);
    } else {
        res.status(400).json({ poruka: 'Nedostaju podaci za kreiranje narudžbe' });
    }
});

router.delete('/:id', (req, res) => {
    const index = narudzbe.findIndex(n => n.id == req.params.id);
    if (index !== -1) {
        narudzbe.splice(index, 1);
        res.status(200).json({ poruka: 'Narudžba obrisana' });
    } else {
        res.status(404).json({ poruka: 'Narudžba nije pronađena' });
    }
});

export default router;
