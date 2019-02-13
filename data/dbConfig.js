const knex = require('knex');
const knexConfig = require('../knexfile.js');

const Posts = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    insert,
    update,
    remove
};

function find(){
    return Posts('posts');
}

function findById(){
    return Posts('posts')
        .where({ id: Number(id)});
}

function insert(post){
    return Posts('posts')
        .insert(post)
        .then(ids => ({ id: ids[0] }));
}

function update(id, post){
    return Posts('posts')
        .where('id', Number(id))
        .update(post);
}

function remove(id){
    return Posts('posts')
        .where('id', Number(id))
        .del();
}