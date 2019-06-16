import React from 'react';
import {firestore} from "../api/firebase";
import {StaticRouter} from 'react-router-dom';
import ListGames from './index';
import {mount, shallow} from 'enzyme';

jest.mock('../api/firebase');

firestore.collection = jest.fn();

describe("ListGames", () => {
   it('Should match snapshot for given props', () => {
       const dataResp = jest.fn();
       dataResp.mockReturnValue({title: 'test'});
       const response = {docs: [{id: '11', data: dataResp}]};
       const onSnapshot = jest.fn(func => func(response));
       firestore.collection.mockReturnValue({onSnapshot});
       const component = mount(<StaticRouter><ListGames /></StaticRouter>);

       expect(firestore.collection).toHaveBeenCalledTimes(1);
       expect(onSnapshot).toHaveBeenCalledTimes(1);
       expect(dataResp).toHaveBeenCalledTimes(1);
       expect(component).toMatchSnapshot();
   });

    it('Should display title in list and correct path', () => {
        const dataResp = jest.fn();
        dataResp.mockReturnValue({title: 'test'});
        const response = {docs: [{id: '11', data: dataResp}]};
        const onSnapshot = jest.fn(func => func(response));
        firestore.collection.mockReturnValue({onSnapshot});
        const component = mount(<StaticRouter><ListGames /></StaticRouter>);

        expect(component.find('a').props().href).toBe('/game/11');
        expect(component.find('div.list-group-item').text()).toBe('test');
    });
});
