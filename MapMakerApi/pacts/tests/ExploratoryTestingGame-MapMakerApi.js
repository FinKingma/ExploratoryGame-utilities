'use strict';

provider_states_for('MapMakerApi', 'ExploratoryTestingGame', './pacts/contracts/ExploratoryTestingGame-MapMakerApi.json', 'http://localhost:3000', (done) => {
  providerState('casual', function(done) {
    it( () => {
      done();
    });
  });
});