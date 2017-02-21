if lsof -i:8080
then
    kill -9 $(lsof -t -i:8080)
fi
bundle && bundle exec rackup -p 8080