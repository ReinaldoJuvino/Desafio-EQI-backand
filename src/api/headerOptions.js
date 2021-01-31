module.exports = app => {
    const {existOrError} = app.src.api.validation

    const options =  async (request,response) => {

        response.status(200).send()

    }
    
    return { options }
}

