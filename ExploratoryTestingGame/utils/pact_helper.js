var helloProvider;

helloProvider = Pact.mockService({
    consumer: 'Hello Consumer',
    provider: 'Hello Provider',
    port: 1234,
    done: function (error) {
        expect(error).toBe(null);
    }
});

helloProvider.resetSession(done);

function done() {
    console.log('mockservice alive and kicking...');
}