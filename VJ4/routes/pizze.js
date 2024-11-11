import express from 'express';
const router = express.Router();

router.get('/:id', (req, res) => {
    const id_pizza = req.params.id;
    const pizza = pizze.find(pizza => pizza.id == id_pizza);

    if (pizza) {
        res.status(200).json(pizza);
    } else {
        res.status(404).json({ poruka: 'Pizza nije pronađena' });
    }
});

router.post('/', (req, res) => {
    const { naziv, cijena } = req.body;
    if (naziv && cijena > 0) {
        const novaPizza = { id: pizze.length + 1, naziv, cijena };
        pizze.push(novaPizza);
        res.status(201).json(novaPizza); 
    } else {
        res.status(400).json({ poruka: 'Podaci o pizzi nisu ispravni' }); 
    }
});
