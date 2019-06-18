import React from 'react';
import InfoModal from './modal';
import {shallow} from "enzyme";


describe('InfoModal', ()=>{

    it('should render correctly with given props', ()=>{
        const clickFn = jest.fn();
        const component = shallow(<InfoModal onClose={clickFn} title="Test" buttonText="Button">Error</InfoModal>);
        expect(component.find("ModalBody").text()).toBe("Error");
        expect(component.find("ModalTitle").text()).toBe("Test");
        expect(component.find("Button").text()).toBe("Button");
        expect(component).toMatchSnapshot();
    });

    it('should invoke clickFn when button is clicked', ()=>{
        const clickFn = jest.fn();
        const component = shallow(<InfoModal onClose={clickFn}>Error</InfoModal>);
        component.find("Button").simulate('click');

        expect(clickFn).toHaveBeenCalledTimes(1);
    });
});
