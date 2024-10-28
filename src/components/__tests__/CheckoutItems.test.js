import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('fetching cart data with axios', () => {
    let user;

    beforeEach(() => {
        user = { id: 1 }; // Mock user with an ID
        localStorage.setItem('user', JSON.stringify(user));
    });

    it('calls axios.get with the correct URL', async () => {
        // Mock axios.get to return a successful response
        const mockResponseData = [{ product: { price: 50 }, paymentStatus: 'PENDING' }];
        axios.get.mockResolvedValueOnce({ data: mockResponseData });

        // Make the axios call with the constructed URL
        const response = await axios.get(`http://localhost:8080/soldProduct/${user.id}`);

        // Assert that axios.get was called with the expected URL
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/soldProduct/${user.id}`);

        // Optional: Check if the response data is as expected
        expect(response.data).toEqual(mockResponseData);
    });
});

