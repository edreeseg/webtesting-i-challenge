const enhancer = require('./enhancer.js');
const { repair, succeed, fail, get } = enhancer;

describe('Item modification functions.', () => {
  describe('Repair function', () => {
    const testWeapon = {
      name: 'Iron Sword',
      durability: 40,
      enhancement: 1,
    };
    it('Should return undefined if passed an argument that is not a JS object', () => {
      expect(repair(3)).toBe(undefined);
      expect(repair('Hello')).toBe(undefined);
      expect(repair(true)).toBe(undefined);
      expect(repair(NaN)).toBe(undefined);
      expect(repair(null)).toBe(undefined);
      expect(repair([1, 2, 3])).toBe(undefined);
    });
    it('Should return an object', () => {
      expect(typeof repair(testWeapon)).toBe('object');
    });
    it('Should return a new object', () => {
      expect(repair(testWeapon) === testWeapon).toBe(false);
    });
    it('Should repair item to full durability', () => {
      expect(repair(testWeapon).durability).toBe(100);
    });
  });
  describe('Succeed function', () => {
    const midLevelWeapon = {
      name: 'Iron Sword',
      durability: 90,
      enhancement: 14,
    };
    const highLevelWeapon = {
      name: 'Diamond Sword',
      durability: 90,
      enhancement: 20,
    };
    it('Should return undefined if passed an argument that is not a JS object', () => {
      expect(succeed(3)).toBe(undefined);
      expect(succeed('Hello')).toBe(undefined);
      expect(succeed(true)).toBe(undefined);
      expect(succeed(NaN)).toBe(undefined);
      expect(succeed(null)).toBe(undefined);
      expect(succeed([1, 2, 3])).toBe(undefined);
    });
    it('Should return an object', () => {
      expect(typeof succeed(highLevelWeapon)).toBe('object');
    });
    it('Should return a new object', () => {
      expect(succeed(midLevelWeapon) === midLevelWeapon).toBe(false);
    });
    it('Should increase enhancement by one when below 20', () => {
      expect(succeed(midLevelWeapon).enhancement).toBe(15);
    });
    it('Should not increase enhancement when 20', () => {
      expect(succeed(highLevelWeapon).enhancement).toBe(20);
    });
    it('Should not modify durability', () => {
      expect(succeed(midLevelWeapon).durability).toBe(90);
    });
  });
  describe('Fail function', () => {
    const midLevelWeapon = {
      name: 'Iron Sword',
      durability: 90,
      enhancement: 14,
    };
    const highLevelWeapon = {
      name: 'Diamond Sword',
      durability: 90,
      enhancement: 20,
    };
    it('Should return undefined if passed an argument that is not a JS object', () => {
      expect(fail(3)).toBe(undefined);
      expect(fail('Hello')).toBe(undefined);
      expect(fail(true)).toBe(undefined);
      expect(fail(NaN)).toBe(undefined);
      expect(fail(null)).toBe(undefined);
      expect(fail([1, 2, 3])).toBe(undefined);
    });
    it('Should return an object', () => {
      expect(typeof fail(highLevelWeapon)).toBe('object');
    });
    it('Should return a new object', () => {
      expect(fail(midLevelWeapon) === midLevelWeapon).toBe(false);
    });
    it('Should decrease durability by 5 when enhancement is under 15', () => {
      expect(fail(midLevelWeapon).durability).toBe(85);
    });
    it('Should decrease durability by 10 when enhancement is 15 or more', () => {
      expect(fail(highLevelWeapon).durability).toBe(80);
    });
    it('Should decrease enhancement by 1 when enhancement is greater than 16', () => {
      expect(fail(highLevelWeapon).enhancement).toBe(19);
    });
    it('Should not decrease enhancement when enhancement is 16 or less', () => {
      expect(fail(midLevelWeapon).enhancement).toBe(14);
    });
  });
  describe('Get function', () => {
    const lowLevelWeapon = {
      name: 'Iron Sword',
      durability: 90,
      enhancement: 0,
    };
    const midLevelWeapon = {
      name: 'Iron Sword',
      durability: 90,
      enhancement: 14,
    };
    it('Should return undefined if passed an argument that is not a JS object', () => {
      expect(get(3)).toBe(undefined);
      expect(get('Hello')).toBe(undefined);
      expect(get(true)).toBe(undefined);
      expect(get(NaN)).toBe(undefined);
      expect(get(null)).toBe(undefined);
      expect(get([1, 2, 3])).toBe(undefined);
    });
    it('Should return an object', () => {
      expect(typeof get(lowLevelWeapon)).toBe('object');
    });
    it('Should return a new object', () => {
      expect(get(lowLevelWeapon) === lowLevelWeapon).toBe(false);
    });
    it('Should not modify object name if enhancement is 0', () => {
      expect(get(lowLevelWeapon).name).toBe('Iron Sword');
    });
    it('Should change object name to include enhancement level if over 0', () => {
      expect(get(midLevelWeapon).name).toBe('[+14] Iron Sword');
    });
  });
});
