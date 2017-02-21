if lsof -i:1234
then
    kill -9 $(lsof -t -i:1234)
fi