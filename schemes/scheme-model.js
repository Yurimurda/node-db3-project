const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first();
}

function findSteps(id) {
    return db('steps')
    .join('schemes', 'steps.scheme_id', 'schemes.id')
    .select (
        'steps.id',
        'schemes.scheme_name',
        'steps.step_number',
        'steps.instructions'
    )

    .orderBy('steps.step_number')
    .where('schemes.id', id);
}

function add(scheme) {
  return db('schemes')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del();
}
