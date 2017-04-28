if lsof -i:3000
then
    kill -9 $(lsof -t -i:3000)
fi

if lsof -i:2000
then
    kill -9 $(lsof -t -i:2000)
fi