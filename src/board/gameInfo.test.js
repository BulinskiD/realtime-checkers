import React from 'react';
import GameInfo from './gameInfo';
import {shallow} from 'enzyme';

describe("GameInfo", () => {

    it('should match snapshot for given props', () => {
        expect(shallow(<GameInfo message={"Grają białe"} />)).toMatchSnapshot();
    });

});