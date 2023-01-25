const AppError = require('../utils/AppError');
const sqlConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs');

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

    async update(request, response){
        const {name, email, password, old_password} = request.body;
        const user_id = request.user.id;

        //Conectando ao banco de dados
        const database = await sqlConnection();

        //Pegando todos os usuários que contém esse ID recebido 
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);

        //Checando se o usuário  existe
        if(!user){
            throw new AppError('Usuário não cadastrado');
        }

        //Pegando todos os uruários que contenham o email recebido
        const emailUser = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        //Se o id do usuário selecionado pelo email for diferente do id do usuário selecionado pelo id, então erro
        if(emailUser && emailUser.id !== user.id){
            throw new AppError('Este e-mail já está em uso')
        };

        //Verificações para mudança de senha
        if(password && !old_password ){
            throw new AppError('Você precisa informar a senha antiga')
        }

        if(password && old_password){
            const checkPassword = await compare(old_password, user.password);
            if(!checkPassword){
                throw new AppError ('A senha antiga não confere')
            }

            user.password = await hash(password, 8);

        }

        //Colocando as informações novas em constantes, caso elas não sejam preenchidas manter as antigas
        const updatedName = name ?? user.name;
        const updatedEmail = email ?? user.email;
        const updatedPassword = user.password

        //Passando a ordem para o banco de dados atualizar o email e nome
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [updatedName, updatedEmail, updatedPassword, user_id]
        );

        return response.json()
    };
};

module.exports = UsersController

