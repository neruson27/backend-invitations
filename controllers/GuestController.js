import { Guest } from '../models';

function getAll(_req, res) {
  Guest.find({})
    .then(guests => {
      if(guests.length > 0) return res.status(200).send(guests)
      return res.status(404).send({message: 'NO CONTENT'});
    })
    .catch(err => res.status(500).send({err}))
}

function create(req, res) {
  let guest = new Guest(req.body);
  guest.save()
    .then(createGuest => 
      res.status(201).send(createGuest)
    )
    .catch(err => res.status(500).send({err}))
}

async function update(req, res) {
  const { id } = req.params;
  const { name, table, persons, accepted } = req.body;

  if (!id) {
    return res.status(400).send({message: 'NO ID'});
  }

  let guest = await Guest.findById(id);

  if (!guest) {
    return res.status(400).send({message: 'NO GUEST FOUND'});
  }

  if (name) {
    guest.name = name;
  }

  if (table) {
    guest.table = table;
  }

  if (persons) {
    guest.persons = persons;
  }

  if (accepted !== undefined) {
    guest.accepted = accepted;
    guest.acceptedDate = accepted ? new Date() : null;
  }

  const guestSaved = await guest.save();

  if (!guestSaved) {
    return res.status(400).send({message: 'ERROR SAVING GUEST'});
  }

  return res.status(200).send(guestSaved);
}

function deleted(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({message: 'NO ID'});
  }

  Guest.deleteOne({'$id': id})
    .then(result => {
      res.status(200).send(result.ok);
    })
    .catch(err => {
      return res.status(500).send({err: String(err), message: 'ERROR DELETING GUEST'});
    })
}

export default {
  getAll,
  create,
  update,
  deleted
}