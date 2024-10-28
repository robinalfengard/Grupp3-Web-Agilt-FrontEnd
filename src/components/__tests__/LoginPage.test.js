import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginPage from '../LoginPage.vue';



describe('Signup', () => {

    it('Unfilled form return correct error message', () => {
        const email = ''; 
        const password = 'hej123';

        const wrapper = mount(LoginPage);

        wrapper.find('input#email').setValue(email);
        wrapper.find('input#password').setValue(password);

        wrapper.vm.handleSubmit();

        expect(wrapper.vm.errorMessage).toBe('Please fill in all fields');
    })

    it('Filled form return no error message', () => {
        const email = 'hej123'; 
        const password = 'hej123';

        const wrapper = mount(LoginPage);

        wrapper.find('input#email').setValue(email);
        wrapper.find('input#password').setValue(password);

        wrapper.vm.handleSubmit();

        expect(wrapper.vm.errorMessage).toBe('');
    })


})