import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, APIGatewayProxyStructuredResultV2, Context, Handler } from 'aws-lambda';

export const indexHandler: Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2> = async (event, context) => {
    return {
        statusCode: 200,
        body: 'Even though this is the index we are not routing anything yet.'
    }
}
