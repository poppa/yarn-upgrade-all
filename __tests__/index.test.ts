import 'jest'

import { main } from '../src'

describe('Initial dummy test', () => {
  test('We should have main()', async () => {
    expect(await main()).toBe(true)
  })
})
