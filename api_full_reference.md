HR Talent Agent System
 1.0.0 
OAS 3.1
/openapi.json
AI-powered talent sourcing system using multi-agent workflows


Authorize
search


GET
/api/v1/search/test
Test Endpoint

Simple test endpoint that doesn't require external dependencies. Use this to verify the API is working.

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
{
  "additionalProp1": {}
}
No links

POST
/api/v1/search/search/simple-mock
Simple Mock Search

Simple mock search endpoint that returns basic JSON. This bypasses all complex model validation issues.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "user_id": "string",
  "session_id": "string",
  "search_mode": "database",
  "criteria": {
    "job_titles": [
      "string"
    ],
    "skills_keywords": [
      "string"
    ],
    "location_full": "string",
    "location_country": "string",
    "location_country_iso2": "string",
    "experience_years_min": 0,
    "experience_years_max": 0,
    "management_level": "Intern",
    "department": "Engineering and Technical",
    "company_type": "Startup",
    "company_size_min": 0,
    "company_size_max": 0,
    "is_currently_employed": true,
    "exclude_keywords": [
      "string"
    ]
  },
  "max_results": 50,
  "include_detailed_profiles": false,
  "save_search": true,
  "search_description": "string"
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

POST
/api/v1/search/search
Search Talents


Execute talent search using specified mode (database, live, or hybrid).

Args: search_request: Search request with criteria and configuration background_tasks: FastAPI background tasks request: FastAPI request object for session extraction db: Database session

Returns: SearchResults with results and metadata

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "user_id": "string",
  "session_id": "string",
  "search_mode": "database",
  "criteria": {
    "job_titles": [
      "string"
    ],
    "skills_keywords": [
      "string"
    ],
    "location_full": "string",
    "location_country": "string",
    "location_country_iso2": "string",
    "experience_years_min": 0,
    "experience_years_max": 0,
    "management_level": "Intern",
    "department": "Engineering and Technical",
    "company_type": "Startup",
    "company_size_min": 0,
    "company_size_max": 0,
    "is_currently_employed": true,
    "exclude_keywords": [
      "string"
    ]
  },
  "max_results": 50,
  "include_detailed_profiles": false,
  "save_search": true,
  "search_description": "string"
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
  "search_id": "string",
  "user_id": "string",
  "search_request": {
    "user_id": "string",
    "session_id": "string",
    "search_mode": "database",
    "criteria": {
      "job_titles": [
        "string"
      ],
      "skills_keywords": [
        "string"
      ],
      "location_full": "string",
      "location_country": "string",
      "location_country_iso2": "string",
      "experience_years_min": 0,
      "experience_years_max": 0,
      "management_level": "Intern",
      "department": "Engineering and Technical",
      "company_type": "Startup",
      "company_size_min": 0,
      "company_size_max": 0,
      "is_currently_employed": true,
      "exclude_keywords": [
        "string"
      ]
    },
    "max_results": 50,
    "include_detailed_profiles": false,
    "save_search": true,
    "search_description": "string"
  },
  "results": [
    {
      "id": 0,
      "full_name": "string",
      "headline": "string",
      "linkedin_url": "string",
      "picture_url": "string",
      "primary_professional_email": "string",
      "location_full": "string",
      "location_country": "string",
      "active_experience_title": "string",
      "inferred_skills": [
        "string"
      ],
      "total_experience_duration_months": 0,
      "is_working": true,
      "relevance_score": 0,
      "skill_match_score": 0,
      "experience_score": 0,
      "location_score": 0,
      "ranking_explanation": "string",
      "matched_skills": [
        "string"
      ],
      "missing_skills": [
        "string"
      ],
      "key_achievements": [
        "string"
      ],
      "relevant_experience": [
        "string"
      ],
      "certifications": [
        "string"
      ],
      "education_summary": "",
      "career_progression": "",
      "experience": [
        {
          "active_experience": true,
          "position_title": "string",
          "department": "string",
          "management_level": "string",
          "location": "string",
          "description": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "duration_months": 0,
          "company_name": "string",
          "company_id": 0,
          "company_type": "string",
          "company_size_range": "string",
          "company_employees_count": 0,
          "company_industry": "string",
          "company_website": "string",
          "company_linkedin_url": "string",
          "company_hq_country": "string",
          "company_hq_city": "string",
          "order_in_profile": 0
        }
      ],
      "education": [
        {
          "degree": "string",
          "description": "string",
          "institution_name": "string",
          "institution_url": "string",
          "institution_country_iso2": "string",
          "institution_city": "string",
          "date_from_year": 0,
          "date_to_year": 0,
          "activities_and_societies": "string",
          "order_in_profile": 0
        }
      ],
      "certification_details": [
        {
          "title": "string",
          "issuer": "string",
          "issuer_url": "string",
          "credential_id": "string",
          "certificate_url": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "order_in_profile": 0
        }
      ]
    }
  ],
  "total_results": 0,
  "search_duration": 0,
  "timestamp": "2025-12-19T02:17:53.429Z",
  "search_summary": "string",
  "recommendations": [
    "string"
  ]
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
/api/v1/search/search/{search_id}
Get Search Results

Retrieve previously executed search results.

Args: search_id: Search identifier user_id: User ID for authorization request: FastAPI request object for session validation db: Database session

Returns: SearchResults with cached results

Parameters
Try it out
Name	Description
search_id *
string
(path)
search_id
user_id *
string
(query)
User ID for authorization

user_id
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
  "search_id": "string",
  "user_id": "string",
  "search_request": {
    "user_id": "string",
    "session_id": "string",
    "search_mode": "database",
    "criteria": {
      "job_titles": [
        "string"
      ],
      "skills_keywords": [
        "string"
      ],
      "location_full": "string",
      "location_country": "string",
      "location_country_iso2": "string",
      "experience_years_min": 0,
      "experience_years_max": 0,
      "management_level": "Intern",
      "department": "Engineering and Technical",
      "company_type": "Startup",
      "company_size_min": 0,
      "company_size_max": 0,
      "is_currently_employed": true,
      "exclude_keywords": [
        "string"
      ]
    },
    "max_results": 50,
    "include_detailed_profiles": false,
    "save_search": true,
    "search_description": "string"
  },
  "results": [
    {
      "id": 0,
      "full_name": "string",
      "headline": "string",
      "linkedin_url": "string",
      "picture_url": "string",
      "primary_professional_email": "string",
      "location_full": "string",
      "location_country": "string",
      "active_experience_title": "string",
      "inferred_skills": [
        "string"
      ],
      "total_experience_duration_months": 0,
      "is_working": true,
      "relevance_score": 0,
      "skill_match_score": 0,
      "experience_score": 0,
      "location_score": 0,
      "ranking_explanation": "string",
      "matched_skills": [
        "string"
      ],
      "missing_skills": [
        "string"
      ],
      "key_achievements": [
        "string"
      ],
      "relevant_experience": [
        "string"
      ],
      "certifications": [
        "string"
      ],
      "education_summary": "",
      "career_progression": "",
      "experience": [
        {
          "active_experience": true,
          "position_title": "string",
          "department": "string",
          "management_level": "string",
          "location": "string",
          "description": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "duration_months": 0,
          "company_name": "string",
          "company_id": 0,
          "company_type": "string",
          "company_size_range": "string",
          "company_employees_count": 0,
          "company_industry": "string",
          "company_website": "string",
          "company_linkedin_url": "string",
          "company_hq_country": "string",
          "company_hq_city": "string",
          "order_in_profile": 0
        }
      ],
      "education": [
        {
          "degree": "string",
          "description": "string",
          "institution_name": "string",
          "institution_url": "string",
          "institution_country_iso2": "string",
          "institution_city": "string",
          "date_from_year": 0,
          "date_to_year": 0,
          "activities_and_societies": "string",
          "order_in_profile": 0
        }
      ],
      "certification_details": [
        {
          "title": "string",
          "issuer": "string",
          "issuer_url": "string",
          "credential_id": "string",
          "certificate_url": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "order_in_profile": 0
        }
      ]
    }
  ],
  "total_results": 0,
  "search_duration": 0,
  "timestamp": "2025-12-19T02:17:53.441Z",
  "search_summary": "string",
  "recommendations": [
    "string"
  ]
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
/api/v1/search/search/{search_id}/refine
Refine Search

Refine an existing search with updated criteria.

Args: search_id: Original search identifier search_request: Updated search request request: FastAPI request object for session validation db: Database session

Returns: SearchResults with refined results

Parameters
Try it out
Name	Description
search_id *
string
(path)
search_id
Request body

application/json
Example Value
Schema
{
  "user_id": "string",
  "session_id": "string",
  "search_mode": "database",
  "criteria": {
    "job_titles": [
      "string"
    ],
    "skills_keywords": [
      "string"
    ],
    "location_full": "string",
    "location_country": "string",
    "location_country_iso2": "string",
    "experience_years_min": 0,
    "experience_years_max": 0,
    "management_level": "Intern",
    "department": "Engineering and Technical",
    "company_type": "Startup",
    "company_size_min": 0,
    "company_size_max": 0,
    "is_currently_employed": true,
    "exclude_keywords": [
      "string"
    ]
  },
  "max_results": 50,
  "include_detailed_profiles": false,
  "save_search": true,
  "search_description": "string"
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
  "search_id": "string",
  "user_id": "string",
  "search_request": {
    "user_id": "string",
    "session_id": "string",
    "search_mode": "database",
    "criteria": {
      "job_titles": [
        "string"
      ],
      "skills_keywords": [
        "string"
      ],
      "location_full": "string",
      "location_country": "string",
      "location_country_iso2": "string",
      "experience_years_min": 0,
      "experience_years_max": 0,
      "management_level": "Intern",
      "department": "Engineering and Technical",
      "company_type": "Startup",
      "company_size_min": 0,
      "company_size_max": 0,
      "is_currently_employed": true,
      "exclude_keywords": [
        "string"
      ]
    },
    "max_results": 50,
    "include_detailed_profiles": false,
    "save_search": true,
    "search_description": "string"
  },
  "results": [
    {
      "id": 0,
      "full_name": "string",
      "headline": "string",
      "linkedin_url": "string",
      "picture_url": "string",
      "primary_professional_email": "string",
      "location_full": "string",
      "location_country": "string",
      "active_experience_title": "string",
      "inferred_skills": [
        "string"
      ],
      "total_experience_duration_months": 0,
      "is_working": true,
      "relevance_score": 0,
      "skill_match_score": 0,
      "experience_score": 0,
      "location_score": 0,
      "ranking_explanation": "string",
      "matched_skills": [
        "string"
      ],
      "missing_skills": [
        "string"
      ],
      "key_achievements": [
        "string"
      ],
      "relevant_experience": [
        "string"
      ],
      "certifications": [
        "string"
      ],
      "education_summary": "",
      "career_progression": "",
      "experience": [
        {
          "active_experience": true,
          "position_title": "string",
          "department": "string",
          "management_level": "string",
          "location": "string",
          "description": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "duration_months": 0,
          "company_name": "string",
          "company_id": 0,
          "company_type": "string",
          "company_size_range": "string",
          "company_employees_count": 0,
          "company_industry": "string",
          "company_website": "string",
          "company_linkedin_url": "string",
          "company_hq_country": "string",
          "company_hq_city": "string",
          "order_in_profile": 0
        }
      ],
      "education": [
        {
          "degree": "string",
          "description": "string",
          "institution_name": "string",
          "institution_url": "string",
          "institution_country_iso2": "string",
          "institution_city": "string",
          "date_from_year": 0,
          "date_to_year": 0,
          "activities_and_societies": "string",
          "order_in_profile": 0
        }
      ],
      "certification_details": [
        {
          "title": "string",
          "issuer": "string",
          "issuer_url": "string",
          "credential_id": "string",
          "certificate_url": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "order_in_profile": 0
        }
      ]
    }
  ],
  "total_results": 0,
  "search_duration": 0,
  "timestamp": "2025-12-19T02:17:53.454Z",
  "search_summary": "string",
  "recommendations": [
    "string"
  ]
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
/api/v1/search/search/{search_id}/report
Get Search Report

Generate or retrieve comprehensive search report.

Args: search_id: Search identifier user_id: User ID for authorization db: Database session

Returns: SearchReport with detailed analysis

Parameters
Try it out
Name	Description
search_id *
string
(path)
search_id
user_id *
string
(query)
User ID for authorization

user_id
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
  "report_id": "string",
  "search_id": "string",
  "user_id": "string",
  "executive_summary": "string",
  "key_findings": [
    "string"
  ],
  "aggregation_result": {
    "search_id": "string",
    "user_id": "string",
    "session_id": "string",
    "search_criteria_summary": "string",
    "total_results": 0,
    "database_results_count": 0,
    "live_search_results_count": 0,
    "ranked_profiles": [
      {
        "profile": {
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
          "active_experience_company_id": 0,
          "active_experience_description": "string",
          "active_experience_department": "string",
          "active_experience_management_level": "string",
          "total_experience_duration_months": 0,
          "experience": [
            {
              "active_experience": true,
              "position_title": "string",
              "department": "string",
              "management_level": "string",
              "location": "string",
              "description": "string",
              "date_from": "string",
              "date_from_year": 0,
              "date_from_month": 0,
              "date_to": "string",
              "date_to_year": 0,
              "date_to_month": 0,
              "duration_months": 0,
              "company_name": "string",
              "company_id": 0,
              "company_type": "string",
              "company_size_range": "string",
              "company_employees_count": 0,
              "company_industry": "string",
              "company_website": "string",
              "company_linkedin_url": "string",
              "company_hq_country": "string",
              "company_hq_city": "string",
              "order_in_profile": 0
            }
          ],
          "education": [
            {
              "degree": "string",
              "description": "string",
              "institution_name": "string",
              "institution_url": "string",
              "institution_country_iso2": "string",
              "institution_city": "string",
              "date_from_year": 0,
              "date_to_year": 0,
              "activities_and_societies": "string",
              "order_in_profile": 0
            }
          ],
          "certifications": [
            {
              "title": "string",
              "issuer": "string",
              "issuer_url": "string",
              "credential_id": "string",
              "certificate_url": "string",
              "date_from": "string",
              "date_from_year": 0,
              "date_from_month": 0,
              "date_to": "string",
              "date_to_year": 0,
              "date_to_month": 0,
              "order_in_profile": 0
            }
          ],
          "is_working": true,
          "is_decision_maker": true,
          "imported_at": "2025-12-19T02:17:53.466Z",
          "updated_at": "2025-12-19T02:17:53.466Z"
        },
        "rank_position": 1,
        "relevance_score": 100,
        "skill_match_score": 100,
        "experience_score": 100,
        "location_score": 100,
        "job_title_score": 100,
        "matched_skills": [
          {
            "searched_skill": "string",
            "matched_skill": "string",
            "match_score": 100,
            "match_type": "exact"
          }
        ],
        "missing_skills": [
          "string"
        ],
        "ranking_explanation": "string",
        "key_achievements": [
          "string"
        ],
        "relevant_experience": [
          "string"
        ],
        "certifications": [
          "string"
        ],
        "education_summary": "",
        "career_progression": "",
        "source_type": "database",
        "source_details": {
          "additionalProp1": {}
        }
      }
    ],
    "total_execution_time": 0,
    "database_search_time": 0,
    "live_search_time": 0,
    "ranking_time": 0,
    "average_relevance_score": 100,
    "top_score": 100,
    "score_distribution": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "skill_coverage_analysis": {
      "additionalProp1": {}
    },
    "location_distribution": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "recommendations": [
      "string"
    ],
    "created_at": "2025-12-19T02:17:53.466Z"
  },
  "top_candidates_analysis": "string",
  "candidate_diversity_score": 100,
  "market_insights": {
    "additionalProp1": {}
  },
  "talent_availability": "string",
  "hiring_recommendations": [
    "string"
  ],
  "search_optimization_tips": [
    "string"
  ],
  "generated_at": "2025-12-19T02:17:53.466Z",
  "report_version": "1.0"
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
/api/v1/search/search/history
Get Search History

Get user's search history.

Args: user_id: User ID limit: Number of searches to return offset: Offset for pagination db: Database session

Returns: List of search history entries

Parameters
Try it out
Name	Description
user_id *
string
(query)
User ID

user_id
limit
integer
(query)
Number of searches to return

Default value : 20

20
maximum: 100
minimum: 1
offset
integer
(query)
Offset for pagination

Default value : 0

0
minimum: 0
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

GET
/api/v1/search/search/stats/total
Get User Total Searches


Get the total number of database searches performed by the current user.

Returns: Dictionary with total searches count

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
{
  "additionalProp1": {}
}
No links

GET
/api/v1/search/test-simple
Test Simple

agents


GET
/api/v1/agents/agents/status
Get Agents Status

Get status of all AI agents.

Returns: Dictionary of agent statuses

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
{
  "additionalProp1": {
    "name": "string",
    "status": "healthy",
    "last_activity": "2025-12-19T02:17:53.489Z",
    "total_requests": 0,
    "successful_requests": 0,
    "failed_requests": 0,
    "average_response_time": 0,
    "current_load": 0,
    "max_concurrent_requests": 0,
    "version": "string"
  },
  "additionalProp2": {
    "name": "string",
    "status": "healthy",
    "last_activity": "2025-12-19T02:17:53.489Z",
    "total_requests": 0,
    "successful_requests": 0,
    "failed_requests": 0,
    "average_response_time": 0,
    "current_load": 0,
    "max_concurrent_requests": 0,
    "version": "string"
  },
  "additionalProp3": {
    "name": "string",
    "status": "healthy",
    "last_activity": "2025-12-19T02:17:53.489Z",
    "total_requests": 0,
    "successful_requests": 0,
    "failed_requests": 0,
    "average_response_time": 0,
    "current_load": 0,
    "max_concurrent_requests": 0,
    "version": "string"
  }
}
No links

GET
/api/v1/agents/agents/{agent_name}/status
Get Agent Status

Get status of a specific agent.

Args: agent_name: Name of the agent

Returns: AgentStatus for the specified agent

Parameters
Try it out
Name	Description
agent_name *
string
(path)
agent_name
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
  "name": "string",
  "status": "healthy",
  "last_activity": "2025-12-19T02:17:53.493Z",
  "total_requests": 0,
  "successful_requests": 0,
  "failed_requests": 0,
  "average_response_time": 0,
  "current_load": 0,
  "max_concurrent_requests": 0,
  "version": "string"
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
/api/v1/agents/agents/health-check
Perform Health Check

Perform comprehensive health check on all agents.

Returns: AgentHealthCheck with detailed health information

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
{
  "overall_status": "healthy",
  "timestamp": "2025-12-19T02:17:53.497Z",
  "total_agents": 0,
  "healthy_agents": 0,
  "unhealthy_agents": 0,
  "check_duration": 0,
  "agent_details": {
    "additionalProp1": {
      "additionalProp1": {}
    },
    "additionalProp2": {
      "additionalProp1": {}
    },
    "additionalProp3": {
      "additionalProp1": {}
    }
  },
  "system_info": {
    "additionalProp1": {}
  }
}
No links

GET
/api/v1/agents/agents/metrics
Get Agent Metrics

Get performance metrics for agents.

Args: agent_name: Optional specific agent name time_range: Time range for metrics

Returns: Dictionary of agent metrics

Parameters
Try it out
Name	Description
agent_name
string | (string | null)
(query)
Specific agent name

agent_name
time_range
string
(query)
Time range for metrics (1h, 24h, 7d)

Default value : 1h

1h
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
  "additionalProp1": {}
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
/api/v1/agents/agents/{agent_name}/restart
Restart Agent

Restart a specific agent.

Args: agent_name: Name of the agent to restart

Returns: Success message

Parameters
Try it out
Name	Description
agent_name *
string
(path)
agent_name
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
/api/v1/agents/agents/logs
Get Agent Logs

Get agent logs.

Args: agent_name: Optional specific agent name level: Log level filter limit: Number of log entries offset: Offset for pagination

Returns: List of log entries

Parameters
Try it out
Name	Description
agent_name
string | (string | null)
(query)
Specific agent name

agent_name
level
string
(query)
Log level filter

Default value : INFO

INFO
limit
integer
(query)
Number of log entries

Default value : 100

100
maximum: 1000
minimum: 1
offset
integer
(query)
Offset for pagination

Default value : 0

0
minimum: 0
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
/api/v1/agents/agents/config
Update Agent Config


GET
/api/v1/agents/agents/workflows
Get Active Workflows

monitoring


GET
/api/v1/monitoring/metrics
Get Metrics

Get system metrics.

Args: time_window_hours: Time window for metrics in hours session_id: Current session ID

Returns: System metrics summary

Parameters
Try it out
Name	Description
time_window_hours
integer
(query)
Default value : 1

1
maximum: 24
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
/api/v1/monitoring/metrics/performance
Get Performance Metrics

Get performance metrics for specific operations.

Args: operation: Specific operation to filter by time_window_hours: Time window for metrics in hours session_id: Current session ID

Returns: Performance metrics

Parameters
Try it out
Name	Description
operation
string | (string | null)
(query)
operation
time_window_hours
integer
(query)
Default value : 1

1
maximum: 24
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
/api/v1/monitoring/alerts
Get Alerts

Get system alerts.

Args: active_only: Whether to return only active alerts user_id: Current user ID

Returns: System alerts

Parameters
Try it out
Name	Description
active_only
boolean
(query)
Default value : true


true
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

POST
/api/v1/monitoring/alerts/{alert_name}/clear
Clear Alert

Clear a specific alert.

Args: alert_name: Name of the alert to clear user_id: Current user ID

Returns: Success status

Parameters
Try it out
Name	Description
alert_name *
string
(path)
alert_name
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
/api/v1/monitoring/system/status
Get System Status

Get comprehensive system status.

Args: session_id: Current session ID

Returns: System status information

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

GET
/api/v1/monitoring/logs
Get Logs

Get recent log entries.

Args: level: Minimum log level to retrieve limit: Maximum number of log entries component: Filter by component user_id: Current user ID

Returns: Recent log entries

Parameters
Try it out
Name	Description
level
string
(query)
Default value : INFO

INFO
pattern: ^(DEBUG|INFO|WARNING|ERROR|CRITICAL)$
limit
integer
(query)
Default value : 100

100
maximum: 1000
minimum: 1
component
string | (string | null)
(query)
component
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
users


POST
/api/v1/users/
Create User

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "string",
  "username": "string",
  "password": "stringst",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "department": "string",
  "phone": "string"
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.548Z",
  "is_admin": false,
  "admin_role": "string"
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
/api/v1/users/users/{user_id}
Get User

Parameters
Try it out
Name	Description
user_id *
string
(path)
user_id
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
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.553Z",
  "is_admin": false,
  "admin_role": "string"
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

PUT
/api/v1/users/{user_id}
Update User

Parameters
Try it out
Name	Description
user_id *
string
(path)
user_id
Request body

application/json
Example Value
Schema
{
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "department": "string"
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
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.559Z",
  "is_admin": false,
  "admin_role": "string"
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
/api/v1/users/reset-password-request
Request Password Reset

Request a password reset by sending an OTP to the user's email.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
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

POST
/api/v1/users/reset-password-verify
Verify Password Reset

Verify the password reset OTP and update the user's password.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "otp": "string",
  "current_password": "string",
  "new_password": "stringst",
  "confirm_password": "string"
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

POST
/api/v1/users/create-email-otp
Create Email Otp

Create and send an email verification OTP.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
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

POST
/api/v1/users/verify-email
Verify Email

Verify an email using OTP.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "otp": "string"
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

POST
/api/v1/users/resend-verification
Resend Verification

Resend a verification email.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
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
/api/v1/users/by-phone/{phone}
Get User By Phone

Get user and subscription details by phone number.

Parameters
Try it out
Name	Description
phone *
string
(path)
phone
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
authentications


POST
/api/v1/auths/login
Login

Parameters
Try it out
No parameters

Request body

application/x-www-form-urlencoded
grant_type
string | (string | null)
pattern: ^password$
username *
string
password *
string($password)
scope
string
client_id
string | (string | null)
client_secret
string | (string | null)($password)
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
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.600Z",
  "is_admin": false,
  "admin_role": "string",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
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
/api/v1/auths/logout
Logout


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
/api/v1/auths/refresh
Refresh Token

Parameters
Try it out
Name	Description
refresh_token *
string
(query)
refresh_token
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
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.610Z",
  "is_admin": false,
  "admin_role": "string",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
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
/api/v1/auths/me
Read Users Me


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
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.615Z",
  "is_admin": false,
  "admin_role": "string"
}
No links

DELETE
/api/v1/auths/me
Delete Account


subscriptions


POST
/api/v1/subscriptions/
Create Subscription



GET
/api/v1/subscriptions/me
Get My Subscription


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
{
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-12-19T02:17:53.619Z",
  "end_date": "2025-12-19T02:17:53.619Z",
  "last_payment_date": "2025-12-19T02:17:53.619Z",
  "next_payment_date": "2025-12-19T02:17:53.619Z",
  "created_at": "2025-12-19T02:17:53.619Z",
  "updated_at": "2025-12-19T02:17:53.619Z"
}
No links

GET
/api/v1/subscriptions/me/history
Get My Subscription History


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
[
  {
    "id": "string",
    "tier": "string",
    "is_auto_renew": true,
    "price_per_month": 0,
    "start_date": "2025-12-19T02:17:53.621Z",
    "end_date": "2025-12-19T02:17:53.621Z",
    "last_payment_date": "2025-12-19T02:17:53.621Z",
    "next_payment_date": "2025-12-19T02:17:53.621Z",
    "created_at": "2025-12-19T02:17:53.621Z",
    "updated_at": "2025-12-19T02:17:53.621Z"
  }
]
No links

PUT
/api/v1/subscriptions/{subscription_id}
Update Subscription


Parameters
Try it out
Name	Description
subscription_id *
string
(path)
subscription_id
Request body

application/json
Example Value
Schema
{
  "tier": "basic",
  "status": "active",
  "is_auto_renew": true
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
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-12-19T02:17:53.626Z",
  "end_date": "2025-12-19T02:17:53.626Z",
  "last_payment_date": "2025-12-19T02:17:53.626Z",
  "next_payment_date": "2025-12-19T02:17:53.626Z",
  "created_at": "2025-12-19T02:17:53.626Z",
  "updated_at": "2025-12-19T02:17:53.626Z"
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
/api/v1/subscriptions/{subscription_id}/cancel
Cancel Subscription


Parameters
Try it out
Name	Description
subscription_id *
string
(path)
subscription_id
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
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-12-19T02:17:53.631Z",
  "end_date": "2025-12-19T02:17:53.631Z",
  "last_payment_date": "2025-12-19T02:17:53.631Z",
  "next_payment_date": "2025-12-19T02:17:53.631Z",
  "created_at": "2025-12-19T02:17:53.631Z",
  "updated_at": "2025-12-19T02:17:53.631Z"
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
/api/v1/subscriptions/subscriptions/{subscription_id}
Get Subscription

Parameters
Try it out
Name	Description
subscription_id *
string
(path)
subscription_id
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
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-12-19T02:17:53.636Z",
  "end_date": "2025-12-19T02:17:53.636Z",
  "last_payment_date": "2025-12-19T02:17:53.636Z",
  "next_payment_date": "2025-12-19T02:17:53.636Z",
  "created_at": "2025-12-19T02:17:53.636Z",
  "updated_at": "2025-12-19T02:17:53.636Z"
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
/api/v1/subscriptions/paystack/subscribe/{tier}
Subscribe With Paystack


Initialize a Paystack subscription for the specified tier.

Args: tier: Subscription tier ('pro' or 'business') current_user: Authenticated user paystack_service: Paystack service instance db: Database session

Returns: Paystack transaction initialization data with authorization URL

Raises: HTTPException: If tier is invalid or user already has active subscription

Parameters
Try it out
Name	Description
tier *
string
(path)
tier
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
  "additionalProp1": {}
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
/api/v1/subscriptions/limits
Get Search Limits


Get current user's search limits and usage.

Returns: Dict containing tier info, limits, and current usage

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
{
  "additionalProp1": {}
}
No links

POST
/api/v1/subscriptions/paystack/manage-link
Get Subscription Management Link


Generate a link for users to manage their active subscription.

Returns: Management link data from Paystack

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
{
  "additionalProp1": {}
}
No links

GET
/api/v1/subscriptions/plans
Get Available Plans

Get information about available subscription plans.

Returns: Plan details and pricing

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
{
  "additionalProp1": {}
}
No links
search-cache


GET
/api/v1/cache/history
Get User Search History


Get user's search history

Parameters
Cancel
Name	Description
limit
integer
(query)
Number of search history items to return

20
maximum: 100
minimum: 1
Execute
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

DELETE
/api/v1/cache/history
Clear User Search History


Clear all user search history

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

GET
/api/v1/cache/history/{search_id}
Get User Search By Id


Get specific search result from user history

Parameters
Try it out
Name	Description
search_id *
string
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
  "additionalProp1": {}
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
/api/v1/cache/history/{search_id}
Delete User Search History


Delete a specific search result from user history

Parameters
Try it out
Name	Description
search_id *
string
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
/api/v1/cache/statistics
Get Cache Statistics


Get cache statistics (admin only)

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
{
  "additionalProp1": {}
}
No links

POST
/api/v1/cache/cleanup
Cleanup Expired Cache


Clean up expired cache entries (admin only)

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

GET
/api/v1/cache/cache-info
Get Cache Info


Get cache configuration and user-specific info

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
{
  "additionalProp1": {}
}
No links
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
  "imported_at": "2025-12-19T02:17:53.694Z"
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
  "imported_at": "2025-12-19T02:17:53.710Z"
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
  "imported_at": "2025-12-19T02:17:53.716Z"
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
    "imported_at": "2025-12-19T02:17:53.726Z"
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
  "imported_at": "2025-12-19T02:17:53.734Z"
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
Health


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
Talent Search


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
Talent Details


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
Status


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
Talent Management


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
  "imported_at": "2025-12-19T02:17:53.767Z"
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
Search Management


GET
/api/v1/core-signal/search-history
Get Search History


Get search history with pagination

Parameters
Cancel
Name	Description
skip
integer
(query)
Number of records to skip

0
minimum: 0
limit
integer
(query)
Number of records to return

100
maximum: 1000
minimum: 1
Execute
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
Talent Collection


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
  "imported_at": "2025-12-19T02:17:53.783Z"
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
  "imported_at": "2025-12-19T02:17:53.789Z"
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
Database Search


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
    "imported_at": "2025-12-19T02:17:53.796Z"
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
  "imported_at": "2025-12-19T02:17:53.803Z"
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
chat


POST
/api/v1/chat/chat
Chat With Agent


Send a message to the chat agent and get a response.

Args: message: User's message session_id: Optional session ID for conversation continuity temperature: Model temperature for response generation current_user: Current authenticated user

Returns: Chat response with conversation state

Parameters
Try it out
Name	Description
message *
string
(query)
message
session_id
string | (string | null)
(query)
session_id
temperature
number
(query)
Default value : 0.7

0.7
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
  "additionalProp1": {}
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
/api/v1/chat/chat/stream
Chat Stream Endpoint


Fixed streaming chat endpoint

Parameters
Try it out
Name	Description
message *
string
(query)
message
session_id
string | (string | null)
(query)
session_id
temperature
number
(query)
Default value : 0.7

0.7
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
/api/v1/chat/chat/history
Get Chat History


Get chat history for the current user.

Args: session_id: Optional specific session ID limit: Number of messages to retrieve offset: Offset for pagination current_user: Current authenticated user

Returns: List of chat messages

Parameters
Try it out
Name	Description
session_id
string | (string | null)
(query)
Specific session ID

session_id
limit
integer
(query)
Number of messages to retrieve

Default value : 50

50
maximum: 100
minimum: 1
offset
integer
(query)
Offset for pagination

Default value : 0

0
minimum: 0
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

GET
/api/v1/chat/chat/sessions
Get Chat Sessions


Get chat sessions for the current user.

Args: limit: Number of sessions to retrieve offset: Offset for pagination current_user: Current authenticated user

Returns: List of chat sessions

Parameters
Try it out
Name	Description
limit
integer
(query)
Number of sessions to retrieve

Default value : 20

20
maximum: 50
minimum: 1
offset
integer
(query)
Offset for pagination

Default value : 0

0
minimum: 0
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
/api/v1/chat/chat/analyze-search
Analyze Search History


Analyze user's search history and provide insights.

Args: analysis_type: Type of analysis to perform time_range: Time range for analysis current_user: Current authenticated user

Returns: Analysis results

Parameters
Try it out
Name	Description
analysis_type *
string
(query)
Type of analysis (patterns, insights, recommendations)

analysis_type
time_range
string
(query)
Time range for analysis

Default value : 30d

30d
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
  "additionalProp1": {}
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
/api/v1/chat/chat/status
Get Chat Agent Status

Get status of the chat agent.

Returns: AgentStatus for the chat agent

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
{
  "name": "string",
  "status": "healthy",
  "last_activity": "2025-12-19T02:17:53.844Z",
  "total_requests": 0,
  "successful_requests": 0,
  "failed_requests": 0,
  "average_response_time": 0,
  "current_load": 0,
  "max_concurrent_requests": 0,
  "version": "string"
}
No links

POST
/api/v1/chat/chat/clear-session
Clear Chat Session


Clear a specific chat session.

Args: session_id: Session ID to clear current_user: Current authenticated user

Returns: Success message

Parameters
Try it out
Name	Description
session_id *
string
(query)
session_id
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
/api/v1/chat/chat/tools
Get Available Tools

Get available MCP tools for the chat agent.

Returns: List of available tools

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
[
  {
    "additionalProp1": {}
  }
]
No links
webhooks


POST
/api/v1/webhooks/paystack
Paystack Webhook

Handle Paystack webhook events for subscription management.

Paystack sends various events related to subscriptions, charges, and invoices. This endpoint processes these events and updates the database accordingly.

Expected events:

subscription.create: New subscription created
charge.success: Successful payment/charge
charge.failed: Failed payment attempt
subscription.not_renew: Subscription won't renew
subscription.disable: Subscription cancelled/expired
invoice.create: Invoice created (3 days before billing)
invoice.payment_failed: Invoice payment failed
Security:

HMAC SHA512 signature verification using PAYSTACK_SECRET_KEY
Validates webhook authenticity
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
{
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/v1/webhooks/paystack/test
Test Paystack Webhook

Test endpoint to verify webhook URL is accessible. Paystack may call this during webhook URL validation.

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
{
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
Admin


GET
/api/v1/admin/subscriptions/overview
Get Subscription Overview


Get subscription dashboard overview. Includes MRR, churn, tier distribution, and monthly changes.

Requires: Admin access

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
{
  "total_subscribers": 0,
  "active_subscribers": 0,
  "canceled_subscribers": 0,
  "suspended_subscribers": 0,
  "expired_subscribers": 0,
  "by_tier": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "mrr": 0,
  "revenue_by_tier": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "churn_rate": 0,
  "new_this_month": 0,
  "canceled_this_month": 0,
  "upgrades_this_month": 0
}
No links

GET
/api/v1/admin/subscriptions
List Subscriptions


List all subscriptions with filtering, search, and pagination.

Requires: Admin access

Parameters
Try it out
Name	Description
tier
string | (string | null)
(query)
Filter by tier (basic, pro, business)

tier
status
string | (string | null)
(query)
Filter by status (active, canceled, suspended, expired)

status
search
string | (string | null)
(query)
Search by email, name, or subscription ID

search
page
integer
(query)
Page number

Default value : 1

1
minimum: 1
limit
integer
(query)
Items per page

Default value : 50

50
maximum: 100
minimum: 1
sort_by
string
(query)
Sort field

Default value : created_at

created_at
order
string
(query)
Sort order

Default value : desc

desc
pattern: ^(asc|desc)$
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
  "total": 0,
  "page": 0,
  "limit": 0,
  "pages": 0,
  "subscriptions": [
    {
      "id": "string",
      "user": {
        "id": "string",
        "email": "string",
        "full_name": "string"
      },
      "tier": "string",
      "status": "string",
      "price_per_month": 0,
      "currency": "string",
      "start_date": "2025-12-19T02:17:53.871Z",
      "end_date": "2025-12-19T02:17:53.871Z",
      "paid_until": "2025-12-19T02:17:53.871Z",
      "is_auto_renew": true,
      "last_payment_date": "2025-12-19T02:17:53.871Z",
      "next_payment_date": "2025-12-19T02:17:53.871Z",
      "has_valid_access": true,
      "days_remaining": 0,
      "created_at": "2025-12-19T02:17:53.871Z"
    }
  ]
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
/api/v1/admin/subscriptions/{subscription_id}
Get Subscription Detail


Get detailed subscription information including history and usage stats.

Requires: Admin access

Parameters
Try it out
Name	Description
subscription_id *
string
(path)
subscription_id
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
  "subscription": {
    "id": "string",
    "user": {
      "id": "string",
      "email": "string",
      "full_name": "string"
    },
    "tier": "string",
    "status": "string",
    "price_per_month": 0,
    "currency": "string",
    "start_date": "2025-12-19T02:17:53.877Z",
    "end_date": "2025-12-19T02:17:53.877Z",
    "paid_until": "2025-12-19T02:17:53.877Z",
    "is_auto_renew": true,
    "last_payment_date": "2025-12-19T02:17:53.877Z",
    "next_payment_date": "2025-12-19T02:17:53.877Z",
    "has_valid_access": true,
    "days_remaining": 0,
    "created_at": "2025-12-19T02:17:53.877Z"
  },
  "history": [
    {
      "id": "string",
      "action": "string",
      "from_tier": "string",
      "to_tier": "string",
      "from_status": "string",
      "to_status": "string",
      "amount": 0,
      "currency": "string",
      "reason": "string",
      "created_at": "2025-12-19T02:17:53.877Z"
    }
  ],
  "usage_stats": {
    "total_searches": 0,
    "monthly_searches": 0,
    "searches_this_week": 0,
    "last_search_date": "2025-12-19T02:17:53.877Z",
    "average_searches_per_month": 0
  }
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
/api/v1/admin/users/overview
Get User Overview


Get user dashboard overview. Includes total users, verification stats, engagement metrics.

Requires: Admin access

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
{
  "total_users": 0,
  "verified_users": 0,
  "unverified_users": 0,
  "active_last_30_days": 0,
  "new_this_month": 0,
  "by_subscription": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "top_searchers": [
    {
      "additionalProp1": {}
    }
  ],
  "low_engagement": [
    {
      "additionalProp1": {}
    }
  ]
}
No links

GET
/api/v1/admin/users
List Users


List all users with filtering, search, and pagination.

Requires: Admin access

Parameters
Try it out
Name	Description
search
string | (string | null)
(query)
Search by email, name, or ID

search
tier
string | (string | null)
(query)
Filter by subscription tier

tier
verified
boolean | (boolean | null)
(query)
Filter by verification status


--
has_subscription
boolean | (boolean | null)
(query)
Filter by subscription existence


--
min_searches
integer | (integer | null)
(query)
Minimum search count

min_searches
max_searches
integer | (integer | null)
(query)
Maximum search count

max_searches
page
integer
(query)
Page number

Default value : 1

1
minimum: 1
limit
integer
(query)
Items per page

Default value : 50

50
maximum: 100
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
{
  "total": 0,
  "page": 0,
  "limit": 0,
  "pages": 0,
  "users": [
    {
      "id": "string",
      "email": "string",
      "full_name": "string",
      "is_verified": true,
      "is_active": true,
      "total_searches": 0,
      "monthly_searches_used": 0,
      "subscription": {
        "tier": "string",
        "status": "string",
        "has_valid_access": true,
        "paid_until": "2025-12-19T02:17:53.895Z"
      },
      "created_at": "2025-12-19T02:17:53.895Z",
      "last_login": "2025-12-19T02:17:53.895Z"
    }
  ]
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
/api/v1/admin/users/{user_id}
Get User Detail


Get detailed user information including subscription and usage stats.

Requires: Admin access

Parameters
Try it out
Name	Description
user_id *
string
(path)
user_id
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
  "additionalProp1": {}
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
/api/v1/admin/analytics/quick-stats
Get Quick Stats


Get quick stats for admin dashboard. Optimized for fast loading and caching.

Requires: Admin access

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
{
  "total_users": 0,
  "active_subscriptions": 0,
  "mrr": 0,
  "total_searches_today": 0,
  "failed_payments_today": 0,
  "new_signups_today": 0
}
No links

GET
/api/v1/admin/analytics/revenue
Get Revenue Analytics


Get revenue analytics for specified period. Includes MRR, ARR, daily revenue, and payment success rate.

Requires: Admin access

Parameters
Try it out
Name	Description
start_date
string | (string | null)
(query)
Start date (ISO format)

start_date
end_date
string | (string | null)
(query)
End date (ISO format)

end_date
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
  "total_revenue": 0,
  "currency": "string",
  "period": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "mrr": 0,
  "arr": 0,
  "revenue_by_tier": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "daily_revenue": [
    {
      "additionalProp1": {}
    }
  ],
  "payment_success_rate": 0,
  "failed_payments": 0,
  "successful_payments": 0
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
/api/v1/admin/analytics/usage
Get Usage Analytics


Get platform usage analytics. Includes total searches, distribution, and engagement metrics.

Requires: Admin access

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
{
  "total_searches": 0,
  "searches_this_month": 0,
  "average_searches_per_user": 0,
  "searches_by_tier": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "search_distribution": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "peak_hours": [
    {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    }
  ],
  "popular_skills": [
    {
      "additionalProp1": {}
    }
  ]
}
No links
Admin - Subscriptions


GET
/api/v1/admin/subscriptions/overview
Get Subscription Overview


Get subscription dashboard overview. Includes MRR, churn, tier distribution, and monthly changes.

Requires: Admin access

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
{
  "total_subscribers": 0,
  "active_subscribers": 0,
  "canceled_subscribers": 0,
  "suspended_subscribers": 0,
  "expired_subscribers": 0,
  "by_tier": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "mrr": 0,
  "revenue_by_tier": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "churn_rate": 0,
  "new_this_month": 0,
  "canceled_this_month": 0,
  "upgrades_this_month": 0
}
No links

GET
/api/v1/admin/subscriptions
List Subscriptions


List all subscriptions with filtering, search, and pagination.

Requires: Admin access

Parameters
Try it out
Name	Description
tier
string | (string | null)
(query)
Filter by tier (basic, pro, business)

tier
status
string | (string | null)
(query)
Filter by status (active, canceled, suspended, expired)

status
search
string | (string | null)
(query)
Search by email, name, or subscription ID

search
page
integer
(query)
Page number

Default value : 1

1
minimum: 1
limit
integer
(query)
Items per page

Default value : 50

50
maximum: 100
minimum: 1
sort_by
string
(query)
Sort field

Default value : created_at

created_at
order
string
(query)
Sort order

Default value : desc

desc
pattern: ^(asc|desc)$
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
  "total": 0,
  "page": 0,
  "limit": 0,
  "pages": 0,
  "subscriptions": [
    {
      "id": "string",
      "user": {
        "id": "string",
        "email": "string",
        "full_name": "string"
      },
      "tier": "string",
      "status": "string",
      "price_per_month": 0,
      "currency": "string",
      "start_date": "2025-12-19T02:17:53.928Z",
      "end_date": "2025-12-19T02:17:53.928Z",
      "paid_until": "2025-12-19T02:17:53.928Z",
      "is_auto_renew": true,
      "last_payment_date": "2025-12-19T02:17:53.928Z",
      "next_payment_date": "2025-12-19T02:17:53.928Z",
      "has_valid_access": true,
      "days_remaining": 0,
      "created_at": "2025-12-19T02:17:53.928Z"
    }
  ]
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
/api/v1/admin/subscriptions/{subscription_id}
Get Subscription Detail


Get detailed subscription information including history and usage stats.

Requires: Admin access

Parameters
Try it out
Name	Description
subscription_id *
string
(path)
subscription_id
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
  "subscription": {
    "id": "string",
    "user": {
      "id": "string",
      "email": "string",
      "full_name": "string"
    },
    "tier": "string",
    "status": "string",
    "price_per_month": 0,
    "currency": "string",
    "start_date": "2025-12-19T02:17:53.934Z",
    "end_date": "2025-12-19T02:17:53.934Z",
    "paid_until": "2025-12-19T02:17:53.934Z",
    "is_auto_renew": true,
    "last_payment_date": "2025-12-19T02:17:53.934Z",
    "next_payment_date": "2025-12-19T02:17:53.934Z",
    "has_valid_access": true,
    "days_remaining": 0,
    "created_at": "2025-12-19T02:17:53.934Z"
  },
  "history": [
    {
      "id": "string",
      "action": "string",
      "from_tier": "string",
      "to_tier": "string",
      "from_status": "string",
      "to_status": "string",
      "amount": 0,
      "currency": "string",
      "reason": "string",
      "created_at": "2025-12-19T02:17:53.934Z"
    }
  ],
  "usage_stats": {
    "total_searches": 0,
    "monthly_searches": 0,
    "searches_this_week": 0,
    "last_search_date": "2025-12-19T02:17:53.934Z",
    "average_searches_per_month": 0
  }
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
Admin - Users


GET
/api/v1/admin/users/overview
Get User Overview


Get user dashboard overview. Includes total users, verification stats, engagement metrics.

Requires: Admin access

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
{
  "total_users": 0,
  "verified_users": 0,
  "unverified_users": 0,
  "active_last_30_days": 0,
  "new_this_month": 0,
  "by_subscription": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "top_searchers": [
    {
      "additionalProp1": {}
    }
  ],
  "low_engagement": [
    {
      "additionalProp1": {}
    }
  ]
}
No links

GET
/api/v1/admin/users
List Users


List all users with filtering, search, and pagination.

Requires: Admin access

Parameters
Try it out
Name	Description
search
string | (string | null)
(query)
Search by email, name, or ID

search
tier
string | (string | null)
(query)
Filter by subscription tier

tier
verified
boolean | (boolean | null)
(query)
Filter by verification status


--
has_subscription
boolean | (boolean | null)
(query)
Filter by subscription existence


--
min_searches
integer | (integer | null)
(query)
Minimum search count

min_searches
max_searches
integer | (integer | null)
(query)
Maximum search count

max_searches
page
integer
(query)
Page number

Default value : 1

1
minimum: 1
limit
integer
(query)
Items per page

Default value : 50

50
maximum: 100
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
{
  "total": 0,
  "page": 0,
  "limit": 0,
  "pages": 0,
  "users": [
    {
      "id": "string",
      "email": "string",
      "full_name": "string",
      "is_verified": true,
      "is_active": true,
      "total_searches": 0,
      "monthly_searches_used": 0,
      "subscription": {
        "tier": "string",
        "status": "string",
        "has_valid_access": true,
        "paid_until": "2025-12-19T02:17:53.955Z"
      },
      "created_at": "2025-12-19T02:17:53.955Z",
      "last_login": "2025-12-19T02:17:53.955Z"
    }
  ]
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
/api/v1/admin/users/{user_id}
Get User Detail


Get detailed user information including subscription and usage stats.

Requires: Admin access

Parameters
Try it out
Name	Description
user_id *
string
(path)
user_id
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
  "additionalProp1": {}
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
Admin - Analytics


GET
/api/v1/admin/analytics/quick-stats
Get Quick Stats


Get quick stats for admin dashboard. Optimized for fast loading and caching.

Requires: Admin access

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
{
  "total_users": 0,
  "active_subscriptions": 0,
  "mrr": 0,
  "total_searches_today": 0,
  "failed_payments_today": 0,
  "new_signups_today": 0
}
No links

GET
/api/v1/admin/analytics/revenue
Get Revenue Analytics


Get revenue analytics for specified period. Includes MRR, ARR, daily revenue, and payment success rate.

Requires: Admin access

Parameters
Try it out
Name	Description
start_date
string | (string | null)
(query)
Start date (ISO format)

start_date
end_date
string | (string | null)
(query)
End date (ISO format)

end_date
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
  "total_revenue": 0,
  "currency": "string",
  "period": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "mrr": 0,
  "arr": 0,
  "revenue_by_tier": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "daily_revenue": [
    {
      "additionalProp1": {}
    }
  ],
  "payment_success_rate": 0,
  "failed_payments": 0,
  "successful_payments": 0
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
/api/v1/admin/analytics/usage
Get Usage Analytics


Get platform usage analytics. Includes total searches, distribution, and engagement metrics.

Requires: Admin access

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
{
  "total_searches": 0,
  "searches_this_month": 0,
  "average_searches_per_user": 0,
  "searches_by_tier": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "search_distribution": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "peak_hours": [
    {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    }
  ],
  "popular_skills": [
    {
      "additionalProp1": {}
    }
  ]
}
No links
legacy-auth


POST
/v1/auth/login
Login

Parameters
Try it out
No parameters

Request body

application/x-www-form-urlencoded
grant_type
string | (string | null)
pattern: ^password$
username *
string
password *
string($password)
scope
string
client_id
string | (string | null)
client_secret
string | (string | null)($password)
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
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.983Z",
  "is_admin": false,
  "admin_role": "string",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
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
/v1/auth/logout
Logout


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
/v1/auth/refresh
Refresh Token

Parameters
Try it out
Name	Description
refresh_token *
string
(query)
refresh_token
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
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.990Z",
  "is_admin": false,
  "admin_role": "string",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
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
/v1/auth/me
Read Users Me


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
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-12-19T02:17:53.994Z",
  "is_admin": false,
  "admin_role": "string"
}
No links

DELETE
/v1/auth/me
Delete Account


Delete the current user's account and all associated data.

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
default


GET
/health
Health Check


GET
/
Root


Schemas
AgentHealthCheckExpand allobject
AgentStatusExpand allobject
AggregationResultExpand allobject
Body_login_api_v1_auths_login_postExpand allobject
Body_login_v1_auth_login_postExpand allobject
BulkProcessResponseExpand allobject
CertificationEntryExpand allobject
CompanyTypeExpand allstring
DatabaseSearchRequestExpand allobject
DepartmentExpand allstring
EducationEntryExpand allobject
EmailVerificationRequestExpand allobject
ExperienceEntryExpand allobject
HTTPValidationErrorExpand allobject
ManagementLevelExpand allstring
OTPVerificationRequestExpand allobject
PaginatedSubscriptionsExpand allobject
PaginatedUsersExpand allobject
PasswordResetRequestExpand allobject
PasswordResetVerifyExpand allobject
QuickStatsExpand allobject
RevenueAnalyticsExpand allobject
SearchModeExpand allstring
SearchQueryRequestExpand allobject
SearchReportExpand allobject
SearchRequestExpand allobject
SearchRequestExpand allobject
SearchResultsExpand allobject
SkillMatchExpand allobject
SubscriptionCreateExpand allobject
SubscriptionDetailResponseExpand allobject
SubscriptionHistoryItemExpand allobject
SubscriptionListItemExpand allobject
SubscriptionOverviewExpand allobject
SubscriptionResponseExpand allobject
SubscriptionStatusExpand allstring
SubscriptionTierExpand allstring
SubscriptionUpdateExpand allobject
SubscriptionUserSummaryExpand allobject
TalentDetailResponseExpand allobject
TalentProfileExpand allobject
TalentProfileResponseExpand allobject
TalentSearchCriteriaExpand allobject
TalentSearchResponseExpand allobject
UsageAnalyticsExpand allobject
UsageStatsExpand allobject
UserCreateExpand allobject
UserListItemExpand allobject
UserOverviewExpand allobject
UserResponseExpand allobject
UserSubscriptionSummaryExpand allobject
UserUpdateExpand allobject
UserWithTokenExpand allobject
ValidationErrorExpand allobject
RankedTalentProfileExpand allobject
RankedTalentProfileExpand allobject