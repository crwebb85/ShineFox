import { Construct, Stack, StackProps } from 'monocdk';
import { Runtime } from 'monocdk/lib/aws-lambda';
import { NodejsFunction } from 'monocdk/lib/aws-lambda-nodejs';
import * as path from 'path';

export class ShineFoxStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Index Lambda
        const apiLambda = new NodejsFunction(this, 'ApiIndex', {
            runtime: Runtime.NODEJS_14_X,
            memorySize: 128,
            entry: path.join(__dirname, 'lambda/api/index.ts'),
            handler: 'indexHandler',
            logRetention: 90
        });
    }
}
