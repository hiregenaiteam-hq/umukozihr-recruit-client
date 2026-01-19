extract-Profiles-from-LinkedIn


GET
/api/v1/core-signal/
Root

Health check endpoint

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

POST
/api/v1/core-signal/search-talents
Search Talents


Search for talents based on criteria and return their IDs. The actual talent details will be fetched and saved in the background.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "job_titles": [
    "AI ENGINEER",
    "MACHINE LEARNING",
    "AI RESEARCHER"
  ],
  "location_country": "Ghana",
  "location_full": "Accra",
  "skills_keywords": [
    "python",
    "tensorflow",
    "machine learning"
  ]
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "talent_ids": [
    0
  ],
  "total_count": 0,
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/fetch-talent-details
Fetch Talent Details


Fetch detailed information for specific talent IDs and save to database. This endpoint processes the request in the background.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
[
  0
]
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "total_ids": 0,
  "processed_count": 0,
  "successful_count": 0,
  "failed_count": 0,
  "failed_ids": [
    0
  ],
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/search-status/{search_id}
Get Search Status


Get the status of a search/fetch operation

Parameters
Try it out
Name	Description
search_id *
integer
(path)
search_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "total_ids": 0,
  "processed_count": 0,
  "successful_count": 0,
  "failed_count": 0,
  "failed_ids": [
    0
  ],
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/talents
Get Talents


Get all talent profiles with pagination

Parameters
Try it out
Name	Description
skip
integer
(query)
Number of records to skip

Default value : 0

0
minimum: 0
limit
integer
(query)
Number of records to return

Default value : 100

100
maximum: 1000
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "full_name": "string",
    "headline": "string",
    "location_full": "string",
    "active_experience_title": "string",
    "active_experience_company_id": 0,
    "linkedin_url": "string",
    "summary": "string",
    "inferred_skills": [
      "string"
    ],
    "connections_count": 0,
    "followers_count": 0,
    "total_experience_duration_months": 0,
    "is_working": true
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/talents/{talent_id}
Get Talent By Id


Get detailed information for a specific talent

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2026-01-19T16:48:44.476Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/api/v1/core-signal/talents/{talent_id}
Delete Talent


Delete a talent profile

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/search-history
Get Search History


Get search history with pagination

Parameters
Try it out
Name	Description
skip
integer
(query)
Number of records to skip

Default value : 0

0
minimum: 0
limit
integer
(query)
Number of records to return

Default value : 100

100
maximum: 1000
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/collect-by-id/{talent_id}
Collect By Id


Collect and save a talent profile by employee ID.

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2026-01-19T16:48:44.484Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/collect-by-shorthand-name
Collect By Shorthand Name


Collect and save a talent profile by LinkedIn shorthand name extracted from a URL.

Parameters
Try it out
Name	Description
linkedin_url *
string
(query)
linkedin_url
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2026-01-19T16:48:44.487Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/search-database
Search Database


Search for talents in the database based on headline keywords, skills, and location filters. Returns detailed profile information for matching talents.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "headline_keywords": "AI Engineer, Machine Learning",
  "location_country": "Ghana",
  "location_country_iso2": "GH",
  "location_full": "Accra, Greater Accra Region, Ghana",
  "skills": [
    "python",
    "tensorflow",
    "machine learning"
  ]
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "parent_id": 0,
    "full_name": "string",
    "first_name": "string",
    "last_name": "string",
    "headline": "string",
    "summary": "string",
    "picture_url": "string",
    "linkedin_url": "string",
    "location_country": "string",
    "location_full": "string",
    "location_regions": [
      "string"
    ],
    "inferred_skills": [
      "string"
    ],
    "interests": [
      "string"
    ],
    "connections_count": 0,
    "followers_count": 0,
    "active_experience_title": "string",
    "active_experience_description": "string",
    "active_experience_department": "string",
    "active_experience_management_level": "string",
    "total_experience_duration_months": 0,
    "experience": [
      {
        "additionalProp1": {}
      }
    ],
    "education": [
      {
        "additionalProp1": {}
      }
    ],
    "certifications": [
      {
        "additionalProp1": {}
      }
    ],
    "is_working": true,
    "is_decision_maker": true,
    "imported_at": "2026-01-19T16:48:44.490Z"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/search-database/by-linkedin
Get Profile By Linkedin Url


Retrieve detailed profile information by LinkedIn URL. Searches the database for a profile matching the provided LinkedIn URL.

Parameters
Try it out
Name	Description
linkedin_url *
string
(query)
LinkedIn profile URL to search for

linkedin_url
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2026-01-19T16:48:44.496Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links




