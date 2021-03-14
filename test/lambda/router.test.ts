import { APIGatewayProxyEventV2, Context, Callback } from "aws-lambda";
import { route } from  '../../lib/lambda/router'

test('Unit test route empty insertCounter', async () => {
    const event: APIGatewayProxyEventV2 = {
        rawPath: '/insertCounter',
        queryStringParameters: {},
        requestContext: {
                http: {
                method: "POST",
            }
        }
    } as any

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);
    let counter = JSON.parse(result.body)
    expect(counter).toHaveProperty('id')
    expect(counter).toHaveProperty('count')
    expect(counter).toHaveProperty('name')
    expect(counter.id).toHaveLength //check that the id has a length
    expect(counter.name).toEqual('')//check name is empty
    expect(counter.count).toEqual(0)
});

// test('Unit test route non-empty insertCounter', async () => {
//     const event: APIGatewayProxyEventV2 = {
//         rawPath: '/insertCounter',
//         queryStringParameters: {
//             name: 'push-ups',
//             count: '5'
//         },
//         requestContext: {
//                 http: {
//                 method: "POST",
//             }
//         }
//     } as any

//     const result = await route(event) as any

//     expect(result.statusCode).toEqual(200);
//     let counter = JSON.parse(result.body)
//     expect(counter).toHaveProperty('id')
//     expect(counter).toHaveProperty('count')
//     expect(counter).toHaveProperty('name')
//     expect(counter.id).toHaveLength //check that the id has a length
//     expect(counter.name).toEqual('push-ups')
//     expect(counter.count).toEqual(5)
// });

test('Unit test route updateCounter', async () => {
    const event: APIGatewayProxyEventV2 = {
        rawPath: '/updateCounter',
        queryStringParameters: {
            id: 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0',
            name: 'push-ups',
            count: 5
        },
        requestContext: {
                http: {
                method: "POST",
            }
        }
    } as any

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);
    let counter = JSON.parse(result.body)
    expect(counter).toHaveProperty('id')
    expect(counter).toHaveProperty('count')
    expect(counter).toHaveProperty('name')
    expect(counter.id).toEqual('a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0')
    expect(counter.name).toEqual('push-ups')
    expect(counter.count).toEqual(5)
});

test('Unit test route incrementCounter', async () => {
    const counterId = 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0'
    const event: APIGatewayProxyEventV2 = {
        rawPath: '/incrementCounter',
        queryStringParameters: {
            id: counterId,
            increment: 5
        },
        requestContext: {
                http: {
                method: "POST",
            }
        }
    } as any

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);
    let counter = JSON.parse(result.body)
    expect(counter).toHaveProperty('id')
    expect(counter).toHaveProperty('count')
    expect(counter).toHaveProperty('name')
    expect(counter.id).toEqual(counterId)
    expect(counter.count).toEqual(10)
});

test('Unit test route getAllCounters', async () => {
    const groupId = 'f5c2ff57-b5d2-414c-ac1f-0db657d6dd65'
    const event: APIGatewayProxyEventV2 = {
        rawPath: '/getAllCounters',
        queryStringParameters: {
            groupId: groupId
        },
        requestContext: {
                http: {
                method: "GET",
            }
        }
    } as any

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);
    let counters = JSON.parse(result.body)
    expect(counters).toHaveLength
    let counter1 = counters[0]
    expect(counter1).toHaveProperty('id')
    expect(counter1).toHaveProperty('count')
    expect(counter1).toHaveProperty('name')
});