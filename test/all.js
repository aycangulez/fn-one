const chain = require('../fn-one');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const should = chai.should();
chai.use(chaiAsPromised).should();

const validateInput = (email, password, firstName, lastName) => (email ? true : false);
const isPasswordValid = (password) => (password === 'valid-pass' ? true : false);
const userService = {
    isEmailAvailable: (email) => (email === 'available@local' ? true : false),
    hashPassword: (password) => 'hashedPassword',
    create: (email, hashedPassword, firstName, lastName) => 1,
};

async function createUser(email, password, firstName, lastName) {
    return await chain(
        () => validateInput(email, password, firstName, lastName),
        () => isPasswordValid(password),
        () => userService.isEmailAvailable(email),
        () => userService.hashPassword(password),
        (hashedPassword) => userService.create(email, hashedPassword, firstName, lastName)
    );
}

describe('fn-one', function () {
    it('should run the entire chain and return 1', function () {
        return createUser('available@local', 'valid-pass', 'Midori', 'Kobayashi').should.eventually.equal(1);
    });

    it('should exit the chain and return false', function () {
        return createUser('used@local', 'valid-pass', 'Midori', 'Kobayashi').should.eventually.equal(false);
    });

    it('should exit the chain when a promise is rejected', function () {
        return chain(
            () => Promise.reject('failed'),
            () => 1
        ).should.be.eventually.rejectedWith('failed');
    });

    it('should continue the chain when an empty value is returned', function () {
        return chain(
            () => {},
            () => 1,
            (v) => v
        ).should.eventually.equal(1);
    });

    it('should exit the chain when exception is thrown', function () {
        return chain(
            () => {
                throw new Error('failed');
            },
            () => 1
        ).should.be.eventually.rejectedWith('failed');
    });
});
