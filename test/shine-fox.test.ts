import { haveResource } from '@monocdk-experiment/assert';
import { expect as expectCDK, matchTemplate, MatchStyle } from '@monocdk-experiment/assert';
import { App } from 'monocdk';
import { ShineFoxStack } from '../lib/shine-fox-stack';

test('Has Lambda', () => {
    const app = new App();

    const stack = new ShineFoxStack(app, 'MyTestStack');

    expectCDK(stack).to(haveResource('AWS::Lambda::Function'))
});
