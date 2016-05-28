# ExploratoryGame

## ExploratoryTestingGame
This is the game itself. Containing HTML5 webpage to play.
Unfortunately I'm refactoring the code, so it only loads the map. No player or whatever.

## MapMakerApi 
This is the api service to generate random maps for the game.
This part is furthest along development.

##  PactBroker 
Contains the config settings to run PactBroker locally. To see how generation of pact files work

## PactMock 
The mockservice used to mock the provider services, so that ExploratoryTestingGame can run its unit tests and generate PACT files


# Running Pact

To get pact up and running:

## 1. Run the PactBroker
navigate to the PactBroker directory

run:
```shell
bundle
```

run:
```shell
bundle exec rackup -p 8080
```
    
Check to see if the service is running by sending a postman request to 'http://localhost:8080/' or opening it on a website.
Note: the website fails to open if there are no pact files present.


## 2. Run the mockservice
navigate to the PactMock directory

run:
```shell
bundle exec pact-mock-service start -p 1234 -l tmp/pact.log --pact-dir tmp/pacts
```


## 3. Run haproxy
navigate to the PactMock directory again

run:
```shell
haproxy -f localproxy.cfg
```
    
  
    
## 4. Run the awesome test
navigate to ExploratoryTestingGame

run:
```shell
karma start
```
    
    
If all goes well (so far it only worked on my machine... so fingers crossed), you will now have a network graph if you visit the following link:
http://localhost:8080/groups/ExploratoryTestingGame

You can also find your pacts if you visit http://localhost:8080 in a browser.