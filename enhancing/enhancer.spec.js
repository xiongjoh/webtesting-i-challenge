const enhancer = require('./enhancer.js');
// test away!

describe('Sanity Check', () => {
    it('Sanity test', () => {
        expect(4 + 3).toBe(7)
        expect(4 + 3).not.toBe(8)
    })
})

describe('Enhancing Item', () => {
    let item
    beforeEach(() => {
        item = {name: 'sword', durability: 50, enhancement: 0}
    })
    it('repair is a function', () => {
        expect(enhancer.repair).toBeInstanceOf(Function)
    })
    it('repair returns a new item', () => {
        expect(enhancer.repair(item)).toHaveProperty('durability')
        expect(enhancer.repair(item)).toMatchObject({name:'sword', enhancement: 0})
    })
    it('repair restores durability to 100', () => {
        expect(item.durability).toBe(50)
        expect(enhancer.repair(item)).toHaveProperty('durability', 100)
    })
    it('enhancer success is a function', () => {
        expect(enhancer.success).toBeInstanceOf(Function)
    })
    it('enhancer success returns a new item', () => {
        expect(enhancer.success(item)).toHaveProperty('name')
        expect(enhancer.success(item)).toHaveProperty('durability')
        expect(enhancer.success(item)).toHaveProperty('enhancement')
    })
    it('on enhancer success item enhancement increases by 1', () => {
        expect(item).toHaveProperty('enhancement', 0)
        item = {...enhancer.success(item)}
        expect(item).toHaveProperty('enhancement', 1)
        item = {...enhancer.success(item)}
        item = {...enhancer.success(item)}
        item = {...enhancer.success(item)}
        expect(item).toHaveProperty('enhancement', 4)
    })
    it('on enhancement level 20 success does not increase enhancement level', () => {
        item = {...item, enhancement:20}
        expect(item).toHaveProperty('enhancement', 20)
        item = {...enhancer.success(item)}
        item = {...enhancer.success(item)}
        item = {...enhancer.success(item)}
        expect(item).toHaveProperty('enhancement', 20)
    })
    it('')
})