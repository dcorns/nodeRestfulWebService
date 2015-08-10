#nodeRestfulWebService
This is a simple restful web service based on node that does some conversions

###How to use
Make are rest request to the server of the form http://server.com/<conversion type>/<convert from>/<convert to>/<value>

Current conversion types:
numberbase: fromBaseNumber/ toBaseNumber/ value to convert
The following example is requesting that base10(decimal) 32 be converted to base2(binary) so the service will return 100000: 
`http://webhost/10/2/32`
Currently numberbase will only handle base conversions for base10 and below.