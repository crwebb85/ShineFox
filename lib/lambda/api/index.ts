import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, APIGatewayProxyStructuredResultV2, Context, Handler } from 'aws-lambda';
import { route } from '../router'

export const indexHandler: Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2> = async (event, context) => {
    try {
        return route(event)
    } catch (e) {
        console.error(`${e.message}: ${e.stack}`);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
        };
    }
}
