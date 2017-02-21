# ExploratoryGame

## ExploratoryTestingGame
This is the game itself. Containing HTML5 webpage to play.
Test tools:
- Technical Unit Tests. Karma "npm run karma" (also used for generating pact contracts). Requires PactBroker and PactMock to be running.
- Technical UI Tests. Cypress "npm run cypress".
- Functional Tests. TBD.

## MapMakerApi 
This is the api service to generate random maps for the game.
Test tools:
- Technical Unit Tests. Mocha "npm run mocha".
- Consumer driven contract tests. Pact "npm run pact".
- Functional Tests. fitnesse "npm run fitnesse".

## PactBroker 
Contains the config settings to run PactBroker locally. To see how generation of pact files work

## PactMock 
The mockservice used to mock the provider services, so that ExploratoryTestingGame can run its unit tests and generate PACT files


# Running Pact Tests
To run pact for a consumer you will need:
PactBroker to capture new PACTs
Pact Mockservice to mock the provider
haproxy to redirect your calls to the provider to your mockservice

To get pact up and running:

## 1. Launch the PactBroker
navigate to the PactBroker directory

run:
```shell
./start-broker.sh
```
    
Open http://localhost:8080 to check if PactBroker is up and running.


## 2. Launch the pact mockservice
navigate to the PactMock directory

run:
```shell
./start-mock.sh
```

Open http://localhost:1234 to check if you receive an OK (200) response.
  
    
## 3. Generate pact contracts from consumer
navigate to ExploratoryTestingGame

run:
```shell
npm run karma
```

You can find your pacts if you visit http://localhost:8080 in a browser.


## 4. Test your pact contracts with your provider service
navigate to the MapMakerApi directory

run:
```shell
npm run pact
```