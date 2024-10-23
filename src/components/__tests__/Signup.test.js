import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Signup from '../Signup.vue';
import axios from 'axios';

describe('Signup', () => {
  it('Unfilled form return false', () => {
    const firstName = 'Robin';
    const lastName = 'Alfen'; 
    const email = 'hej@hj.com'; 
    const password = 'hej123'; 
    const address = 'Gata 23';
    const city = '';

    const wrapper = mount(Signup);

    wrapper.find('input#firstname').setValue(firstName);
    wrapper.find('input#lastname').setValue(lastName);
    wrapper.find('input#email').setValue(email);
    wrapper.find('input#password').setValue(password);
    wrapper.find('input#address').setValue(address);
    wrapper.find('input#city').setValue(city);

    expect(wrapper.vm.validateForm()).toBe(false);
  });

  it('Infotext should inform which field is unfilled', () => {
    const firstName = 'Robin';
    const lastName = 'Alfen'; 
    const email = 'hej@hj.com'; 
    const password = 'hej123'; 
    const address = 'Gata 23';
    const city = '';
    const infoText = '';

    const wrapper = mount(Signup);

    wrapper.find('input#firstname').setValue(firstName);
    wrapper.find('input#lastname').setValue(lastName);
    wrapper.find('input#email').setValue(email);
    wrapper.find('input#password').setValue(password);
    wrapper.find('input#address').setValue(address);
    wrapper.find('input#city').setValue(city);
    wrapper.vm.validateForm();

    expect(wrapper.vm.infoText.valueOf()).toBe('Please enter your city');
  });

  it('Filled form return true', () => {
    const firstName = 'Robin';
    const lastName = 'Alfen'; 
    const email = 'hej@hj.com'; 
    const password = 'hej123'; 
    const address = 'Gata 23';
    const city = 'Göteborg';

    const wrapper = mount(Signup);

    wrapper.find('input#firstname').setValue(firstName);
    wrapper.find('input#lastname').setValue(lastName);
    wrapper.find('input#email').setValue(email);
    wrapper.find('input#password').setValue(password);
    wrapper.find('input#address').setValue(address);
    wrapper.find('input#city').setValue(city);

    expect(wrapper.vm.validateForm()).toBe(true);
  });



});