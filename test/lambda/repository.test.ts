import { Counter } from '../../lib/lambda/db/Counter'
import { Group } from '../../lib/lambda/db/Group'
import * as repository from '../../lib/lambda/repository'

test('Unit test insertCounter', async () => {
    const counter = {
        idCounter: 'a24f6c86-f4f5-4d55-9d7e-9d2a7f7cffc0',
        idGroup: 'd25d786c-c81c-456d-9e3a-5a6a0d95773c',
        name: 'push-ups',
        count: 0
    } as Counter

    await repository.insertCounter(counter)

    let insertedCounter = await repository.getCounter(counter.idCounter)

    expect(counter).toEqual(insertedCounter)
});
