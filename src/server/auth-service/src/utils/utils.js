export function createResponse(status, code, data) {
    return ({
        statusCode: status,
        code: code,
        data: data
    });
}

export function validatePassword(password) {
    return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,15}$/.test(password))
}