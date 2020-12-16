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
    it('enhancer fail is a function', () => {
        expect(enhancer.fail).toBeInstanceOf(Function)
    })
    it('enhancer fail returns a new item', () => {
        expect(enhancer.fail(item)).toHaveProperty('name')
        expect(enhancer.fail(item)).toHaveProperty('durability')
        expect(enhancer.fail(item)).toHaveProperty('enhancement')
    })
    it('on fail below enhancement level 15, durability decreases by 5', () => {
        expect(item).toHaveProperty('durability', 50)
        item = {...enhancer.fail(item)}
        expect(item).toHaveProperty('durability', 45)
        item = {...enhancer.fail(item)}
        item = {...enhancer.fail(item)}
        expect(item).toHaveProperty('durability', 35)
    })
    it('on fail on enhancement level 15 or above, durability decreases by 10', () => {
        item = {...item, enhancement:15}
        expect(item).toMatchObject({enhancement: 15, durability: 50})
        item = {...enhancer.fail(item)}
        expect(item).toMatchObject({enhancement: 15, durability: 40})
        item = {...enhancer.fail(item)}
        item = {...enhancer.fail(item)}
        expect(item).toMatchObject({enhancement: 15, durability: 20})
    })
    it('on fail when enhancement level is greater than 16, enhancement level decreases by 1', () =>{
        item = {...item, enhancement: 18}
        expect(item).toMatchObject({enhancement: 18})
        item = {...enhancer.fail(item)}
        expect(item).toMatchObject({enhancement: 17})
        item = {...enhancer.fail(item)}
        item = {...enhancer.fail(item)}
        item = {...enhancer.fail(item)}
        expect(item).toMatchObject({enhancement: 16})
    })
})