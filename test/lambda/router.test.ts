import { APIGatewayProxyEventV2, APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { route } from '../../lib/lambda/router'
import { Counter } from '../../lib/lambda/db/Counter'
import { Group } from '../../lib/lambda/db/Group'
import * as repository from '../../lib/lambda/repository'

jest.mock('../../lib/lambda/repository')
const mockedRepository = repository as jest.Mocked<typeof repository>

test('Unit test route empty insertCounter', async () => {
    const idGroup = 'f5c2ff57-b5d2-414c-ac1f-0db657d6dd65'
    const defaultName = ''
    const defaultCount = 0

    const event: APIGatewayProxyEventV2 = {
        rawPath: '/insertCounter',
        queryStringParameters: {
            idGroup: idGroup
        } as APIGatewayProxyEventQueryStringParameters,
        requestContext: {
            http: {
                method: "POST",
            }
        },
        routeKey: 'POST /insertCounter'
    } as APIGatewayProxyEventV2

    const insertedCounter = {
        idCounter: 'd6fb6ae2-9342-4ed1-93db-2ab6d69b49ad',
        idGroup: idGroup,
        name: defaultName,
        count: defaultCount
    } as Counter

    const insertedCounterPromise = new Promise<Counter>((resolve, reject) => { resolve(insertedCounter) });

    mockedRepository.insertCounter.mockResolvedValue(insertedCounterPromise);

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);
    let resultCounter = JSON.parse(result.body) as Counter
    expect(resultCounter.idCounter).toHaveLength
    expect(resultCounter.name).toEqual(defaultName)
    expect(resultCounter.count).toEqual(defaultCount)
});

test('Unit test route non-empty insertCounter', async () => {
    const idGroup = 'f5c2ff57-b5d2-414c-ac1f-0db657d6dd65'
    const name = 'push-ups'
    const count = 15
    const countString = count.toString()

    const event: APIGatewayProxyEventV2 = {
        rawPath: '/insertCounter',
        queryStringParameters: {
            idGroup: idGroup,
            name: name,
            count: countString
        } as APIGatewayProxyEventQueryStringParameters,
        requestContext: {
            http: {
                method: "POST",
            }
        },
        routeKey: 'POST /insertCounter'
    } as APIGatewayProxyEventV2

    const insertedCounter = {
        idCounter: 'd6fb6ae2-9342-4ed1-93db-2ab6d69b49ad',
        idGroup: idGroup,
        name: name,
        count: count
    } as Counter

    const insertedCounterPromise = new Promise<Counter>((resolve, reject) => { resolve(insertedCounter) });

    mockedRepository.insertCounter.mockResolvedValue(insertedCounterPromise);

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);
    let resultCounter = JSON.parse(result.body) as Counter
    expect(resultCounter.idCounter).toHaveLength
    expect(resultCounter.name).toEqual(name)
    expect(resultCounter.count).toEqual(count)
});

test('Unit test route updateCounter', async () => {
    const idCounter = 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0'
    const idGroup = 'f5c2ff57-b5d2-414c-ac1f-0db657d6dd65'
    const updatedName = 'push ups'
    const updatedCount = 5
    const updatedCountString = updatedCount.toString()

    const event: APIGatewayProxyEventV2 = {
        rawPath: '/updateCounter',
        queryStringParameters: {
            idCounter: idCounter,
            name: updatedName,
            count: updatedCountString
        } as APIGatewayProxyEventQueryStringParameters,
        requestContext: {
            http: {
                method: "POST",
            }
        },
        routeKey: 'POST /updateCounter'
    } as APIGatewayProxyEventV2

    const initialCounter = {
        idCounter: idCounter,
        idGroup: idGroup,
        name: 'push-ups',
        count: 0
    } as Counter

    const updatedCounter = {
        idCounter: idCounter,
        idGroup: idGroup,
        name: updatedName,
        count: updatedCount
    } as Counter

    const initialCounterPromise = new Promise<Counter>((resolve, reject) => { resolve(initialCounter) });
    const updatedCounterPromise = new Promise<Counter>((resolve, reject) => { resolve(updatedCounter) });

    mockedRepository.getCounter.mockResolvedValue(initialCounterPromise);
    mockedRepository.updateCounter.mockResolvedValue(updatedCounterPromise);

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);

    const resultCounter = JSON.parse(result.body) as Counter

    expect(resultCounter.count).toEqual(updatedCount)
    expect(resultCounter.name).toEqual(updatedName)
});

test('Unit test route incrementCounter', async () => {
    const idCounter = 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0'
    const idGroup = 'f5c2ff57-b5d2-414c-ac1f-0db657d6dd65'
    const increment = 5
    const incrementString = increment.toString()
    const initialCount = 10

    const event: APIGatewayProxyEventV2 = {
        rawPath: '/incrementCounter',
        queryStringParameters: {
            idCounter: idCounter,
            increment: incrementString
        } as APIGatewayProxyEventQueryStringParameters,
        requestContext: {
            http: {
                method: "POST",
            }
        },
        routeKey: 'POST /incrementCounter'
    } as APIGatewayProxyEventV2

    const initialCounter = {
        idCounter: idCounter,
        idGroup: idGroup,
        name: 'push-ups',
        count: initialCount
    } as Counter

    const incrementedCounter = {
        idCounter: idCounter,
        idGroup: idGroup,
        name: 'push-ups',
        count: initialCount + increment
    } as Counter

    const initialCounterPromise = new Promise<Counter>((resolve, reject) => { resolve(initialCounter) });
    const incrementedCounterPromise = new Promise<Counter>((resolve, reject) => { resolve(incrementedCounter) });

    mockedRepository.getCounter.mockResolvedValue(initialCounterPromise);
    mockedRepository.updateCounter.mockResolvedValue(incrementedCounterPromise);

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);

    const resultCounter = JSON.parse(result.body) as Counter

    expect(resultCounter.count).toEqual(initialCount + increment)
});

test('Unit test route getAllCounters', async () => {
    const idGroup = 'f5c2ff57-b5d2-414c-ac1f-0db657d6dd65'

    const event: APIGatewayProxyEventV2 = {
        rawPath: '/getAllCounters',
        queryStringParameters: {
            idGroup: idGroup
        } as APIGatewayProxyEventQueryStringParameters,
        requestContext: {
            http: {
                method: "GET",
            }
        },
        routeKey: 'GET /getAllCounters'
    } as APIGatewayProxyEventV2

    const counter1 = {
        idCounter: 'f4374b9a-fb94-4cbe-af82-1e868bbeff48',
        idGroup: idGroup,
        name: 'push-ups',
        count: 5
    } as Counter

    const counter2 = {
        idCounter: 'b7a14b9a-554a-447a-ae0a-566d605314a9',
        idGroup: idGroup,
        name: 'sit-ups',
        count: 10
    } as Counter
    const counters = [counter1, counter2]

    const countersPromise = new Promise<Counter[]>((resolve, reject) => { resolve(counters) });

    mockedRepository.getAllCountersByIdGroup.mockResolvedValue(countersPromise);

    const result = await route(event) as any

    expect(result.statusCode).toEqual(200);
});
