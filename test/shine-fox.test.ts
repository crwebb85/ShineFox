import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ShineFox from '../lib/shine-fox-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ShineFox.ShineFoxStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
