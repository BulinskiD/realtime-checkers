import startGame from './startGame';
import seedCheckers from './seedCheckers';
import {firestore} from "../api/firebase";
import handleError from './handleError';

jest.mock('./seedCheckers');
jest.mock('../api/firebase');
jest.mock('./handleError');

const doc = jest.fn();
const mockedBoard = {test: 'test'};

let set = jest.fn();
doc.mockReturnValue({set});

firestore.collection = jest.fn();
firestore.collection.mockReturnValue({doc});
firestore.collection.doc = doc;
firestore.collection.doc.mockReturnValue({set});
firestore.collection.doc.set = set;

seedCheckers.mockReturnValue(mockedBoard);

const gameState = {selectedChecker: {}, activePoles: {}, players: []};

describe("StartGame", ()=>{

    beforeEach(()=>{
        set.mockClear();
        seedCheckers.mockClear();
    });

    it('should call firestore with given values and call handleError on promise rejected', async () => {
        try {
            const prom = Promise.reject("error");
            set.mockReturnValue(prom);
            expect.assertions(3);
            await startGame(gameState, 'dawid');
            expect(seedCheckers).toBeCalledTimes(1);
            expect(set).toBeCalledWith({players: [], status: 'white', checkersPosition: mockedBoard});
            await prom;
        } catch(error) {
            expect(handleError).toBeCalledWith('error');
        }
    });

    it('should call firestore with given values', async () => {
            const prom = Promise.resolve("ok");
            set.mockReturnValue(prom);
            expect.assertions(2);
            await startGame(gameState);
            expect(seedCheckers).toBeCalledTimes(1);
            expect(set).toBeCalledWith({players: [], status: 'not-started', checkersPosition: mockedBoard});
            await prom;
    });

    it('should add users with proper status', async () => {
        gameState.players = [{email: 'test', started: false}];
        const prom = Promise.resolve("ok");
        set.mockReturnValue(prom);
        expect.assertions(2);
        await startGame(gameState, 'test');
        expect(seedCheckers).toBeCalledTimes(1);
        expect(set).toBeCalledWith({players: [{email: 'test', started: true}], status: 'not-started', checkersPosition: mockedBoard});
        await prom;
    });

    it('should set game status to white for given input', async () => {
        gameState.players = [{email: 'test', started: true}, {email: 'test2', started: false}];
        const prom = Promise.resolve("ok");
        set.mockReturnValue(prom);
        expect.assertions(2);
        await startGame(gameState, 'test2');
        expect(seedCheckers).toBeCalledTimes(1);
        expect(set).toBeCalledWith({players: [{email: 'test', started: true}, {email: 'test2', started: true}], status: 'white', checkersPosition: mockedBoard});
        await prom;
    });
});