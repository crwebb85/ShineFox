import { APIGatewayProxyEventV2, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
import * as repository from './repository'
import { Counter } from './db/Counter'
import { Group } from './db/Group'

export const route = async (event: APIGatewayProxyEventV2) => {
    const routeKey = event.routeKey
    const parameters = event.queryStringParameters as APIGatewayProxyEventQueryStringParameters
    switch (routeKey) {
        case 'POST /insertCounter':
            return await insertCounter(parameters);
        case 'POST /updateCounter':
            return await updateCounter(parameters);
        case 'POST /incrementCounter':
            return await incrementCounter(parameters);
        case 'GET /getAllCounters':
            return await getAllCounters(parameters);
        default:
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                }
            }
    }
}

async function getAllCounters(parameters: APIGatewayProxyEventQueryStringParameters) {
    let idGroup = parameters.idGroup;
    return createOkStatus(await repository.getCounter(idGroup!));
}

async function incrementCounter(parameters: APIGatewayProxyEventQueryStringParameters) {
    let idCounter = parameters.idCounter;
    let increment = (parameters.increment) ? Number.parseInt(parameters.increment) : 0
    let counter = await repository.getCounter(idCounter!);
    counter.count += increment;
    return createOkStatus(await repository.updateCounter(counter));
}

async function updateCounter(parameters: APIGatewayProxyEventQueryStringParameters) {
    let counter = await repository.getCounter(parameters.idCounter!);
    if (parameters.hasOwnProperty('name')) {
        counter.name = parameters.name!;
    }
    if (parameters.hasOwnProperty('count')) {
        counter.count = Number.parseInt(parameters.count!);
    }
    return createOkStatus(await repository.updateCounter(counter));
}

async function insertCounter(parameters: APIGatewayProxyEventQueryStringParameters) {
    let counter: Counter = {
        idCounter: parameters.idCounter || '',
        idGroup: parameters.idGroup!,
        name: parameters.name || '',
        count: (parameters.count) ? Number.parseInt(parameters.count) : 0
    };
    return createOkStatus(await repository.insertCounter(counter));
}

function createOkStatus(body: any) {
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
