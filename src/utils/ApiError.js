class ApiError extends Error {
    constructor(
        statusCode ,
        message : "Something went wrong" , errors = [] , 
        // this is a error stack
        statck = " "
    ){
        // Now we are overwriteing these messages of the error using the constructor
        super(message)
        this.statusCode = statusCode
        // read wehat is this.data
        this.data = null
        this.message = message
        // here we are kmaking this false as we are handling the error not the response
        this.success = false
        this.errors = errors

        if(statck){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export { ApiError }