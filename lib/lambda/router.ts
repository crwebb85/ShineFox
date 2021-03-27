import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import * as repository from './repository'
import { Counter } from './db/Counter'
import { Group } from './db/Group'

export const route = async (event: APIGatewayProxyEventV2) => {
    const path = event.rawPath
    const method = event.requestContext.http.method
    const routeKey = event.routeKey
    const parameters = event.queryStringParameters as any
    let counter: Counter = {} as Counter
    console.log(routeKey)
    switch (routeKey) {
        case 'POST /insertCounter':
            counter = {
                idCounter: parameters.idCounter || '',
                idGroup: parameters.idGroup,
                name: parameters.name || '',
                count: (parameters.count) ? Number.parseInt(parameters.count) : 0
            }
            return createOkStatus(await repository.insertCounter(counter))
        case 'POST /updateCounter':
            counter = await repository.getCounter(parameters.idCounter)
            if (parameters.hasOwnProperty('name')) {
                counter.name = parameters.name
            }
            if (parameters.hasOwnProperty('count')) {
                counter.count = parameters.count
            }
            return createOkStatus(await repository.updateCounter(counter))
        case 'POST /incrementCounter':
            let idCounter = parameters.idCounter
            let increment = Number.parseInt(parameters.increment)
            counter = await repository.getCounter(idCounter)
            counter.count += increment
            return createOkStatus(await repository.updateCounter(counter))
        case 'GET /getAllCounters':
            let idGroup = parameters.idGroup
            return createOkStatus(await repository.getCounter(idGroup))
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
