import { APIGatewayProxyEventV2, Context, Callback } from "aws-lambda";
import { indexHandler } from '../../../lib/lambda/api/index'

test('Verifies 404 response for invalid route', async () => {
    const event: APIGatewayProxyEventV2 = {
        rawPath: '/',
        queryStringParameters: {
            a: "1"
        },
        requestContext: {
            http: {
                method: "POST",
            }
        }
    } as any

    const context = undefined as any as Context
    const callback = undefined as any as Callback

    const result = await indexHandler(event, context, callback) as any

    console.log(result)
    console.log(typeof (result))

    expect(result.statusCode).toEqual(404);
});
