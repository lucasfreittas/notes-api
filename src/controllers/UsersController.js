const AppError = require('../utils/AppError');
const sqlConnection = require('../database/sqlite')
const { hash } = require('bcryptjs');

class UsersController{
    async create(request, response){
        const {name, email, password} = request.body;

        //Conexão com o banco de dados
        const database = await sqlConnection();

         //Checkando se o email já existe
         const checkEmailExisists = await database.get('SELECT * FROM users WHERE email = (?)', [email])
         if(checkEmailExisists){
             throw new AppError('Este e-mail já está em uso')
         };

        //Criptografando a senha
        const hashedPassword = await hash(password, 8);

        //Criação de usuário no banco
        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );
        return response.status(201).json();
        
       

        
    };
};

module.exports = UsersController