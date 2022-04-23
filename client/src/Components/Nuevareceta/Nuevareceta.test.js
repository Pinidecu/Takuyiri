import React from 'react';
import { render } from '@testing-library/react';
//import { mount } from 'enzyme';
import Form  from './Nuevareceta';


describe('<Form /> Mounted', () => {
  /* let wrapper;
  beforeEach(() => {
    wrapper = mount(<Form />);
  }); */
  it('El form debe tener un label que diga: "Nombre:"', () => {
      const { container } = render(<Form />)
      const element = container.querySelectorAll('label')[0]
      expect(element.innerHTML).toBe('Nombre: ');
  });

  it('El form debe tener un label que diga: "Resumen del plato: "', () => {
    const { container } = render(<Form />)
    const element = container.querySelectorAll('label')[1]
    expect(element.innerHTML).toBe('Password:');
  });

  it('El form debe tener un input con name "title" y type "text"', () => {
    const { container } = render(<Form />)
    const element = container.querySelectorAll('input')[0]
    expect(element.type).toBe('text');
    expect(element.name).toBe('title');
  });

  
  /* it('El input de spoonacularScore tiene que tener la clase danger si tiene un error',  () => {
      wrapper.find('input[name="spoonacularScore"]').simulate('change', {target: {name: 'spoonacularScore', value: 'error'}});
      const ele = wrapper.find('input[name="spoonacularScore"]');
      expect(ele.hasClass('danger')).toBeTruthy();
   });
  it('El input de spoonacularScore NO tiene que tener la clase danger si tiene una puntuacion correcta',  () => {
      wrapper.find('input[name="spoonacularScore"]').simulate('change', {target: {name: 'spoonacularScore', value: 56}});
      const ele = wrapper.find('input[name="spoonacularScore"]');
      expect(ele.hasClass('danger')).toBeFalsy();
    }); */
});
