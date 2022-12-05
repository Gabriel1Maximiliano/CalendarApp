import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");

describe('tests on < AppRouter />', () => { 

    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('should show loading screen and call checkAuthToken ', () => {
        useAuthStore.mockReturnValue({
            status:'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render( <AppRouter /> );

        expect( screen.getByText( 'Cargando...') ).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();
 })
test('should ', () => {
    useAuthStore.mockReturnValue({
        status:'not-authenticated',
        checkAuthToken: mockCheckAuthToken
    });

       const { container } = render( 
        <MemoryRouter>
            <AppRouter />
        </MemoryRouter> );
expect( screen.getByText('Ingreso') ).toBeTruthy();
expect( container).toMatchSnapshot();
});




})