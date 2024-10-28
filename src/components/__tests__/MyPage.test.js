import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MyPage from '../MyPage.vue';

// Mocka fetch
global.fetch = vi.fn();

describe('MyPage', () => {
    let user;

    beforeEach(() => {
        user = { id: 1, firstName: 'John Doe' };
        localStorage.setItem('user', JSON.stringify(user));
    });

    afterEach(() => {
        vi.clearAllMocks(); // Återställ mockarna efter varje test
        localStorage.clear(); // Rensa localStorage
    });

    it('fetches previously bought products successfully', async () => {
        // Mocka fetch för att returnera ett framgångsrikt svar
        const mockResponse = [
            { id: 1, name: 'Product 1', price: 100 },
            { id: 2, name: 'Product 2', price: 200 },
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        });

        const wrapper = mount(MyPage);

        // Vänta tills komponenten har hämtat datan
        await wrapper.vm.$nextTick();

        // Kontrollera att de tidigare köpta produkterna har satts
        expect(wrapper.vm.previouslyBoughtProducts).toEqual(mockResponse);
        expect(wrapper.vm.infoTextPreviouslyBoughtItems).toBe(''); // Ingen info-text om produkter hittades
    });
});
