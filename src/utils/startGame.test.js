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

const gameState = {selectedChecker: {}, activePoles: {}, test: 'test'};

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
            await startGame(gameState);
            expect(seedCheckers).toBeCalledTimes(1);
            expect(set).toBeCalledWith({test: 'test', status: 'white', checkersPosition: mockedBoard});
            await prom;
        } catch(error) {
            expect(handleError).toBeCalledWith('error');
        }
    });

    it('should call firestore with given values', async () => {
            const prom = Promise.resolve("error");
            set.mockReturnValue(prom);
            expect.assertions(2);
            await startGame(gameState);
            expect(seedCheckers).toBeCalledTimes(1);
            expect(set).toBeCalledWith({test: 'test', status: 'white', checkersPosition: mockedBoard});
            await prom;
    });
});