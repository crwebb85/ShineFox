import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';

const status404 = {
    statusCode: 404,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
}

const status405 = {
    statusCode: 405,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
}

export const route = async (event:APIGatewayProxyEventV2) => {
    const path = event.rawPath
    const method = event.requestContext.http.method
    
    switch (path){
        case '/insertCounter':
            if(method === 'POST'){
                let counter = {id: 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0', name:'', count: 0}
                return createOkStatus(counter)
            } else {
                return status405;
            }
        case '/updateCounter':
            if(method === 'POST'){
                let counter = {id: 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0', name:'push-ups', count: 5}
                return createOkStatus(counter) 
            } else {
                return status405;
            }
        case '/incrementCounter':
            if(method === 'POST'){
                let counter = {id: 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0', name:'push-ups', count: 10}
                return createOkStatus(counter)
            } else {
                return status405;
            }
        case '/getAllCounters':
            if(method === 'GET'){
                let counter1 = {id: 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0', name:'push-ups', count: 10}
                let counter2 = {id: '8a01eaac-7855-460a-8137-84f50c6608bd', name:'sqauts', count: 5}
                let counters = [counter1,counter2]
                return createOkStatus(counters)
            } else {
                return status405;
            }
        default:
            return status404; 
    }
}

function createOkStatus(body:any) {
    return {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    };
}
