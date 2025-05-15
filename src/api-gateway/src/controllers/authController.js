

async function loginHandler(request, reply) {
    reply.hijack();
    const message = {
        type: 'LOGIN',
        data: request.body
    }
    

}

async function registerHandler(request, reply) {

}

async function logoutHandler(request, reply) {

}

async function meHandler(request, reply) {

}

async function refreshHandler(request, reply) {

}
