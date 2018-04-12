# NL_API
Run ``npm install`` to download node_module dependencies 
the run ``npm start``
Assignment of News Laundry

Month Query = Jan, Feb, Mar, April.(One Month at a request)

http://localhost:8080/?month=Mar

or 

http://thepratik.com/?month=Mar

You will get the response like 
``  {
    "status": "OK",
    "message": "Data found.",
    "subscription": {
        "gain": 109,
        "lost": 93,
        "activeDisruptor": 0,
        "activeLiberator": 0,
        "activeGameChanger": 0
    }
}``


http://localhost:8080/?month=Feb

or 

http://thepratik.com/?month=Feb

``
{
    "status": "OK",
    "message": "Data found.",
    "subscription": {
        "gain": 120,
        "lost": 49,
        "activeDisruptor": 29,
        "activeLiberator": 36,
        "activeGameChanger": 28
    }
}
``
