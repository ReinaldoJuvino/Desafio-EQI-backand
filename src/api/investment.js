module.exports = app => {
    const {existOrError} = app.src.api.validation

    const save = async (request, response) => {
        
        const investment = request.body
        if(request.params.id) investment.id = request.params.id
        
        try {
            existOrError(investment.value,"Valor não informado")
            existOrError(investment.investment_time,"Tempo de investimento não informado")
            existOrError(investment.rate_cdi_percent,"Porcentagem da CDI no fundo CDB não informada")

        } catch (msg) {
            return response.status(400).json({error: msg});
        }

        const cdi = (1.90/12)
        const rate_poupanca = (((1.40/12) * investment.investment_time) * investment.rate_cdi_percent)/100
        const rate_cdb = ((cdi * investment.investment_time) * investment.rate_cdi_percent)/100

        investment.profitability_cdb = investment.value + ((investment.value * rate_cdb)/100) 
        investment.profitability_poupanca = investment.value + ((investment.value * rate_poupanca)/100)
        
        
        if (investment.id) {
            app.db('investment')
                .update(investment)
                .where({id: investment.id})
                .then(_ => response.status(204).send())
                .catch(err => response.status(500).send(err))

        }else{
            app.db('investment')
                .insert(investment)
                .then(_ => response.status(204))
                .catch(err => response.status(500).send(err)) 
        }
        response.json(investment)

        
    }
    const get = async (request,response)=>{
        id = request.params.id
        app.db('investment')
            .select('id','value','investment_time','rate_cdi_percent','id_user',"profitability_cdb","profitability_poupanca")
            .where({ id_user: id })
            .then(investment => response.json(investment))
            .catch(err => response.status(500).send(err))
    }

    return { save, get }
}