const request = require('supertest');

const API_URL = 'https://n8n.cap.random-generator.pro';

describe('n8n API Test', () => {
    jest.setTimeout(20000); // 20 seconds for this suite

    it('should return 200 for valid POST', async () => {
        const response = await request(API_URL)
            .post('/webhook/6e6ed2ed-570e-4c1f-83e2-93f442338621')
            .send({
                title: "How to login to gmail",
                dbId: "6895bbe769e085af424c7727",
                steps: "open gmail \n go to compose \n send email"
            })
            .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(200);

        // Check for text/plain header
        expect(response.headers['content-type']).toMatch(/text\/html/);

        // Ensure body is a string
        expect(typeof response.text).toBe('string');

        // Optional: make sure it's not empty
        expect(response.text.trim().length).toBeGreaterThan(0);

    });


    it('should return an error when steps is empty', async () => {
        const response = await request(API_URL)
            .post('/webhook/6e6ed2ed-570e-4c1f-83e2-93f442338621')
            .send({
                title: "How to login to gmail",
                dbId: "6895bbe769e085af424c7727",
                steps: "" // empty steps
            })
            .set('Content-Type', 'application/json');

        // Check for error status
        expect(response.statusCode).not.toBe(200); // Could be 400 or something else
        console.log(response.text);
        // Check the error message
        expect(response.text.toLowerCase()).toContain('no steps found');
    });
});
