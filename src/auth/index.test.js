import React from 'react';
import {shallow} from 'enzyme';
import {Login} from './index';
import {act} from 'react-dom/test-utils';
const loginWithEmailAndPassword = jest.fn();
const history = {};
const preventDefault = jest.fn();
const formSubmit = {preventDefault};

describe("Auth", () => {
   it("should render correctly with given props", () => {
      const LoginComp = shallow(<Login loginWithEmailAndPassword={loginWithEmailAndPassword} history={history} />);
      expect(LoginComp).toMatchSnapshot();
   });

   it("should handle login correctly", () => {
      const email = {target: {value: null}};
      email.target.value = "email";

      const password = {target: {value: null}};
      password.target.value = "password";

      const LoginComp = shallow(<Login loginWithEmailAndPassword={loginWithEmailAndPassword} history={history} />);

      act(() => {
         LoginComp.find('.email').props().onChange(email);
      });

      act(() => {
         LoginComp.find('.password').props().onChange(password);
      });

      act(() => {
         LoginComp.find('Form').props().onSubmit(formSubmit);
      });

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(loginWithEmailAndPassword).toHaveBeenCalledWith('email', 'password', history);
   });
});