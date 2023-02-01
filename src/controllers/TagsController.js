const knex = require('../database/knex')

class TagsController{
    async search(request, response){
        const user_id  = request.user.id;
        
        const tags = await knex("tags")
        .where({user_id})
        .groupBy('name')

        return response.json(tags)
    }
}

module.exports = TagsController