import React from 'react';
import {mount} from 'enzyme';
import { ColorChecker, SelectedChecker, PlayerItem} from "./boardStyles";

describe("ColorChecker", () => {
   it('should render white component for given props', () => {
       const component = mount(<ColorChecker color="white" isKing={false} nextMove={false} hover={false} />);
       expect(component).toMatchSnapshot();
   });

    it('should render black component for given props', () => {
        const component = mount(<ColorChecker color="black" isKing={false} nextMove={false} hover={false} />);
        expect(component).toMatchSnapshot();
    });

    it('should add hover pseudo class for given props', () => {
        const component = mount(<ColorChecker color="black" isKing={false} nextMove={true} hover={true} />);
        expect(component).toMatchSnapshot();
    });

    it('should render component with king markup', () => {
        const component = mount(<ColorChecker color="black" isKing={true} nextMove={true} hover={true} />);
        expect(component).toMatchSnapshot();
    });
});

describe('SelectedChecker', () => {
   it('should render black selectedChecker with king markup for given props', () => {
        const component = mount(<SelectedChecker color="black" isKing={true} />);
        expect(component).toMatchSnapshot();
    });

    it('should render white selectedChecker with king markup for given props', () => {
        const component = mount(<SelectedChecker color="white" isKing={true} />);
        expect(component).toMatchSnapshot();
    });

    it('should render white selectedChecker without king markup for given props', () => {
        const component = mount(<SelectedChecker color="white" isKing={false} />);
        expect(component).toMatchSnapshot();
    });

    it('should render black selectedChecker without king markup for given props', () => {
        const component = mount(<SelectedChecker color="black" isKing={false} />);
        expect(component).toMatchSnapshot();
    });
});

describe('PlayerItem', () => {
   it('should render darker blue color for active player', () => {
       const component = mount(<PlayerItem active={true} color="black" />);
       expect(component).toMatchSnapshot();
   })

   it('should render dimmer blue color for inactive player', () => {
       const component = mount(<PlayerItem active={false} color='white' />);
       expect(component).toMatchSnapshot();
   });
});