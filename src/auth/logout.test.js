import React from 'react';
import {shallow} from 'enzyme';
import {Logout} from './logout';

describe("Logout", () => {

    const userLogout = jest.fn();

    it('Should render button with event listener', () => {
       const component = shallow(<Logout userLogout={userLogout} />);
       component.find('Button').simulate('click');
       expect(userLogout).toHaveBeenCalledTimes(1);
       expect(component).toMatchSnapshot();
    });
});