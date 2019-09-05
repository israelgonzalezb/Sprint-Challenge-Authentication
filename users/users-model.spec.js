const db = require('../database/dbConfig.js');
const Users = require('./users-model.js');

describe('users model', () => {
    describe('add()', () => {
        beforeEach(async ()=> {
            await db('users').truncate();
        });

        it('should insert 2 users', async () => {
            await Users.add({username: 'izzy', password: "password1"});
            await Users.add({username: 'jimmy', password: "password1"});

            const users = await db('users');
            expect(users).toHaveLength(2);
        });
        it("should find user izzy", async () => {
            await Users.add({username: 'izzy', password: "password1"});
            const user = await Users.findBy("izzy");
            expect(user).toEqual([{id: 1, username: "izzy", password: "password1"}]);

            
        })
    })
})