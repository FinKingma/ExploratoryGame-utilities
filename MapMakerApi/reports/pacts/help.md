# For assistance debugging failures

* The pact files have been stored locally in the following temp directory:
    /Users/finkingma/ExploratoryGame/MapMakerApi/tmp/pacts

* The requests and responses are logged in the following log file:
    /Users/finkingma/ExploratoryGame/MapMakerApi/log/pact.log

* Add BACKTRACE=true to the `rake pact:verify` command to see the full backtrace

* If the diff output is confusing, try using another diff formatter.
  The options are :unix, :embedded and :list

    Pact.configure do | config |
      config.diff_formatter = :embedded
    end

  See https://github.com/realestate-com-au/pact/blob/master/documentation/configuration.md#diff_formatter for examples and more information.

* Check out https://github.com/realestate-com-au/pact/wiki/Troubleshooting

* Ask a question in the google users' group https://groups.google.com/forum/#!forum/pact-support


The following changes have been made since the previous distinct version of this pact, and may be responsible for verification failure:

# Diff between versions 9.0.0 and 201608051115 of the pact between ExploratoryTestingGame and MapMakerApi

The following changes were made about 20 hours ago (Thu 04 Aug 2016, 3:53pm +00:00)

@@ -5,8 +5,20 @@
         "body": {
           "posY0": {
             "posX0": {
-              "pathRight": /^(Working|Broken)$/,
-              "pathDown": /^(Working|Broken)$/
+              "pathRight": {
+                "json_class": "Pact::Term",
+                "data": {
+                  "generate": "Working",
+                  "matcher": {"json_class":"Regexp","o":0,"s":"^(Working|Broken)$"}
+                }
+              },
+              "pathDown": {
+                "json_class": "Pact::Term",
+                "data": {
+                  "generate": "Working",
+                  "matcher": {"json_class":"Regexp","o":0,"s":"^(Working|Broken)$"}
+                }
+              }
             }
           }
         }


## Links

current-pact-version:
  title: Pact
  name: Pact between ExploratoryTestingGame (v201608051115) and MapMakerApi
  href: http://rails-beanstalk-env.xqwqpz45cy.eu-central-1.elasticbeanstalk.com/pacts/provider/MapMakerApi/consumer/ExploratoryTestingGame/version/201608051115
previous-distinct-pact-version:
  title: Pact
  name: Pact between ExploratoryTestingGame (v9.0.0) and MapMakerApi
  href: http://rails-beanstalk-env.xqwqpz45cy.eu-central-1.elasticbeanstalk.com/pacts/provider/MapMakerApi/consumer/ExploratoryTestingGame/version/9.0.0
