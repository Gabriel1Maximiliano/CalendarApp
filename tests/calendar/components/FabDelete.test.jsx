import { render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";

jest.mock("../../../src/hooks");

describe('tests on < FabDelelte />', () => { 
    test('should display the component correctly  ', () => {
  
        useCalendarStore.mockReturnValue({
            hasEventSelected:false
        });
    render( <FabDelete /> );
    const btn = screen.getByLabelText('btn-delete');

    expect( btn.classList ).toContain('btn');
    expect( btn.classList ).toContain('btn-danger');
    expect( btn.classList ).toContain('fab-danger');
    expect( btn.style.display ).toBe('none');
}); })