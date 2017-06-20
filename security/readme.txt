curl -d @security.json -X PUT http://admin:{PASSWORD}@127.0.0.1:5984/cstt/_security
 
curl -d @security_cstt_web.json -X PUT http://admin:cordaware@127.0.0.1:5990/cstt_web/_security


curl -d @security.json -u admin -X PUT http://127.0.0.1:5984/cstt/_security

curl -d @security_cstt_web.json -u admin -X PUT http://127.0.0.1:5984/cstt_web/_security