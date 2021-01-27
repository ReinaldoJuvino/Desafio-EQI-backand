module.exports = app => {
    const {existOrError} = app.src.api.validation

    const save = async (request, response) => {
        
        const investiment = request.body
        if(request.params.id) investiment.id = request.params.id
        
        try {
            existOrError(investiment.value,"Valor não informado")
            existOrError(investiment.investiment_time,"Tempo de investimento não informado")
            existOrError(investiment.rate_cdi_percent,"Porcentagem da CDI no fundo CDB não informada")

        } catch (msg) {
            return response.status(400).json({error: msg});
        }

        const cdi = (1.90/12)
        const rate_poupanca = (((1.40/12) * investiment.investiment_time) * investiment.rate_cdi_percent)/100
        const rate_cdb = ((cdi * investiment.investiment_time) * investiment.rate_cdi_percent)/100

        investiment.profitability_cdb = investiment.value + ((investiment.value * rate_cdb)/100) 
        investiment.profitability_poupanca = investiment.value + ((investiment.value * rate_poupanca)/100)
        
        
        if (investiment.id) {
            app.db('investiment')
                .update(investiment)
                .where({id: investiment.id})
                .then(_ => response.status(204).send())
                .catch(err => response.status(500).send(err))

        }else{
            app.db('investiment')
                .insert(investiment)
                .then(_ => response.status(204))
                .catch(err => response.status(500).send(err)) 
        }
        response.json(investiment)

        
    }
    const get = async (request,response)=>{
        id = request.params.id
        app.db('investiment')
            .select('id','value','investiment_time','rate_cdi_percent','id_user',"profitability_cdb","profitability_poupanca")
            .where({ id_user: id })
            .then(investiment => response.json(investiment))
            .catch(err => response.status(500).send(err))
    }

    return { save, get }
}