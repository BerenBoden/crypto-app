for i in {1..3}
do 
    curl -X PUT -H "Authorization: Bearer " https://bit-coin-crypt.com/api/crypto/populate && sleep 20
done