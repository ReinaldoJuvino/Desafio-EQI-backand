module.exports = app => {
    const {existOrError, notExistOrError} = app.src.api.validation

    const save = async (request, response) => {
        
        const user = request.body
        console.log(request.params.id)
        if(request.params.id) user.id = request.params.id
        
        try {
            existOrError(user.name,"Nome não informado")
            existOrError(user.email,"E-mail não informado")
            existOrError(user.phone,"Telefone não informada")

            const  userFromEmailDB  = await app.db('users')
                .where({ email: user.email} ).first()
            
            if(!user.id){
                notExistOrError(userFromEmailDB, "Email já vinculado a um usuário")
            }

        } catch (msg) {
            return response.status(400).json({error: msg});
        }

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => response.status(204).send())
                .catch(err => response.status(500).send(err))
        } else {
            app.db('users')
                    .insert(user)
                    .then(_ => response.status(204).send())
                    .catch(err => response.status(500).send(err))
        }
    }
    const get = async (request,response)=>{
        app.db('users')
            .select('id','name','email','phone')
            .then(users => response.json(users))
            .catch(err => response.status(500).send(err))
    }

    return { save, get }
}