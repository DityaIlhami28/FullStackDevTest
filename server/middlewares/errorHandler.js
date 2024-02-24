module.exports = (error, req, res, next) => {
    let status = error.status || 500
    let message = error.message || "Internal Server Error"

    switch (error.name) {
        case "Bad Request" :
            status = 400
            break;
        case "Unauthorized" :
            status = 401
            break;
        case "SequelizeValidationError":
            status = 400
            message = error.errors[0].message
            break;
        case "SequelizeUniqueConstraintError" :
            status = 400
            message = error.errors[0].message
            break;
        case "Invalid Token":
            status = 401
            message = "Invalid Token"
            break;
        case "Forbidden" :
            status = 403
            message = "You are not Authorized"
            break;
        case "NotFound" : 
            status = 404
            break;
        case "EmailAlreadyRegistered" :
            status = 409
            break;
        case "Insufficient Credits":
            status = 400
            break;
        case "Already Booked":
            status = 400
            break;
        
    }
    console.log(error)
    res.status(status).json({
        message
    })
}