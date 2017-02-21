if lsof -i:1234
then
    kill -9 $(lsof -t -i:1234)
fi
haproxy -f localproxy.cfg & bundle exec pact-mock-service start -p 1234 -l tmp/pact.log --pact-dir tmp/pacts