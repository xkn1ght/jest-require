const fs = require('fs');

describe('clear require cache failed', () => {
    afterAll(()=>{
        // reset index.js
        fs.writeFileSync('./index.js','module.exports = {a:1}');
    })
    it('require after rewrite index.js', () => {
        const start = require('./index.js');
        expect(start.a).toBe(1);
        fs.writeFileSync('./index.js','module.exports = {a:2}');
        // reset all require
        jest.resetModules('./index.js');

        // delete but useless
        // delete require.cache[require.resolve('./index.js')]

        jest.isolateModules(()=>{
            const end = require('./index.js');
            // resetModules works but still cached https://jestjs.io/docs/jest-object#jestresetmodules
            expect(start!==end).toBeTruthy()
            expect(end.a).toBe(2);
        })
    });
})
