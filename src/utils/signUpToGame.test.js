import signUpToGame from './signUpToGame';
import {firestore} from '../api/firebase';
import handleError from './handleError';

jest.mock('../api/firebase');
jest.mock('./handleError');
firestore.collection = jest.fn();
const doc = jest.fn();
firestore.collection.mockReturnValue({doc});
const update = jest.fn();
doc.mockReturnValue({update});

describe('signUpToGame', () => {

    beforeEach(() => {
        update.mockClear();
    });

    it('Should call firestore update with proper objects', async () => {
        const players = [];
        players.push("test");
        const prom = Promise.resolve("test");
        const promGameID = Promise.resolve("gameID");
        update.mockReturnValueOnce(prom).mockReturnValueOnce(promGameID);
        await signUpToGame("test", "id", players);

        await prom;
        expect(update).toHaveBeenCalledTimes(2);
        expect(update).toHaveBeenCalledWith({players});
    });

    it('Should call handleError when response is error', async () => {
        const players = [];
        players.push("test");
        const prom = Promise.reject("test");
        update.mockReturnValue(prom);

        try {
            await signUpToGame("test", "id", players);
        } catch(error) {
            expect(handleError).toHaveBeenCalledWith("test");
        }
    });

});
