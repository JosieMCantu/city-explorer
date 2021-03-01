require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');

const { getLocation, getWeather, getReviews } = require('../lib/utils.js');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    test('gets location from search params', async () => {

      const expectation =
      {
        "formatted_query": "Portland, Multnomah County, Oregon, USA",
        "latitude": "45.5202471",
        "longitude": "-122.6741949",
      };

      const actualData = [{
        "place_id": "282983083",
        "licence": "https://locationiq.com/attribution",
        "osm_type": "relation",
        "osm_id": "186579",
        "boundingbox": [
          "45.432536",
          "45.6528812",
          "-122.8367489",
          "-122.4720252"
        ],
        "lat": "45.5202471",
        "lon": "-122.6741949",
        "display_name": "Portland, Multnomah County, Oregon, USA",
        "class": "place",
        "type": "city",
        "importance": 0.75356571743377,
        "icon": "https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png"
      }];
      const data = getLocation(actualData);

      expect(data).toEqual(expectation);
    });

    test('gets weather from search params', async () => {

      const expectation = [
        {
          "forecast": "Overcast clouds",
          "time": "Sat Feb 27 2021"
        }];

      const actualData = {
        data: [
          {
            "moonrise_ts": 1614474955,
            "wind_cdir": "WSW",
            "rh": 89,
            "pres": 1014.75,
            "high_temp": 7.8,
            "sunset_ts": 1614477306,
            "ozone": 365.53125,
            "moon_phase": 0.974645,
            "wind_gust_spd": 10.8984375,
            "snow_depth": 0,
            "clouds": 78,
            "ts": 1614412860,
            "sunrise_ts": 1614437449,
            "app_min_temp": -1.1,
            "wind_spd": 2.5517251,
            "pop": 30,
            "wind_cdir_full": "west-southwest",
            "slp": 1025.4375,
            "moon_phase_lunation": 0.55,
            "valid_date": "2021-02-27",
            "app_max_temp": 7.8,
            "vis": 24.096,
            "dewpt": 3.2,
            "snow": 0,
            "uv": 1.924256,
            "weather": {
              "icon": "c04d",
              "code": 804,
              "description": "Overcast clouds"
            },
            "wind_dir": 241,
            "max_dhi": null,
            "clouds_hi": 17,
            "precip": 0.4375,
            "low_temp": 2.8,
            "max_temp": 7.8,
            "moonset_ts": 1614441402,
            "datetime": "2021-02-27",
            "temp": 5,
            "min_temp": 2.7,
            "clouds_mid": 28,
            "clouds_low": 78
          }
        ]
      };

      const data = getWeather(actualData);

      expect(data).toEqual(expectation);
    });

    test('Should bring back reviews for locations inside of restaurant', async () => {


      const expectation = [{
        name: 'Luc Lac',
        image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
        price: '$$',
        rating: 4.0,
        url: 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=W4-fw5orI81WMg21PQOASQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=W4-fw5orI81WMg21PQOASQ',
      }];

      const actualData = {
        businesses: [
          {
            "id": "Ys42wLKqrflqmtqkgqOXgA",
            "alias": "luc-lac-portland-7",
            "name": "Luc Lac",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=W4-fw5orI81WMg21PQOASQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=W4-fw5orI81WMg21PQOASQ",
            "review_count": 3205,
            "categories": [
              {
                "alias": "vietnamese",
                "title": "Vietnamese"
              },
              {
                "alias": "tapasmallplates",
                "title": "Tapas/Small Plates"
              },
              {
                "alias": "cocktailbars",
                "title": "Cocktail Bars"
              }
            ],
            "rating": 4.0,
            "coordinates": {
              "latitude": 45.516868,
              "longitude": -122.675447
            },
            "transactions": [
              "delivery",
              "pickup"
            ],
            "price": "$$",
            "location": {
              "address1": "835 SW 2nd Ave",
              "address2": null,
              "address3": "",
              "city": "Portland",
              "zip_code": "97204",
              "country": "US",
              "state": "OR",
              "display_address": [
                "835 SW 2nd Ave",
                "Portland, OR 97204"
              ]
            },
            "phone": "+15032220047",
            "display_phone": "(503) 222-0047",
            "distance": 1312.1776320869053
          }
        ]
      };

      const data = getReviews(actualData);


      expect(data).toEqual(expectation);
    });
  });
});
