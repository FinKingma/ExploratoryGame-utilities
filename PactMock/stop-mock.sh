if lsof -i:1234
then
    killall -9 haproxy
    kill -9 $(lsof -t -i:1234)
fi