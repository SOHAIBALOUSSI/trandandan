export function createResponse(code, status, data) {
    return ({
        status: status,
        code: code,
        data: data
    });
}




// const Status = Object.freeze({
//     USER_NOT_FOUND: 'Invalid username or email.',
//     INVALID_PASSWORD: 'Invalid credentials'
// });